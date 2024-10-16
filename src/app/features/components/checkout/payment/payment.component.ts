import { Component } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { PaymentServiceService } from '../../../../core/services/payment-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  stripe: Stripe | null = null;
  paymentIntentClientSecret!: string;
  cardElement!: any;

  constructor(
    private paymentService: PaymentServiceService,
    private router: Router,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.createPaymentIntent();

    // Load Stripe.js and initialize Stripe instance with your public key
    this.stripe = await loadStripe('pk_test_51Q4uwjEan46aPcLp3qsdNHpzjdwHMMYGSPxxyNOLEosPJk35OusV8qoqGeCUsSzrUFHJ4Lbv2uvZrlpD5jB0E7bp00pw7PS2wA');

    // Mount Stripe Elements here (e.g., card input form)
    const elements = this.stripe!.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  createPaymentIntent() {
    this.paymentService.createOrUpdatePaymentIntent().subscribe(
      (response:{success:boolean,message:string,data:string}) => {
        console.log(response);
        console.log(response.data);
        if (response.success) {
          this.paymentIntentClientSecret = response.data; // Use the client secret from the backend response
        } else {
          console.error('Failed to create payment intent:', response.message);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  async handlePayment() {
    if (!this.stripe || !this.paymentIntentClientSecret) {
      console.error('Stripe.js has not been initialized or Payment Intent is missing.');
      return;
    }

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(
      this.paymentIntentClientSecret,
      {
        payment_method: {
          card: this.cardElement,
          billing_details: {
            name: 'Your Customer Name' // You can pass real customer data
          }
        }
      }
    );

    if (error) {
      console.error('Payment failed:', error.message);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment successful:', paymentIntent);
      // Proceed to create an order
      this.createOrder(paymentIntent);
    }
  }

  createOrder(paymentIntent: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
    });

    this.http.post('https://localhost:44322/api/Orders', {}, { headers }).subscribe(
      (res) => {
        console.log('Order placed successfully:', res);
        // Show SweetAlert2 success message
        Swal.fire({
          title: 'Payment Successful!',
          text: 'Your order has been placed successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redirect to order history after the alert is closed
          this.router.navigate(['/OrderHistory']);
        });
      },
      (error) => {
        console.error('Order creation failed:', error);
      }
    );
  }
}
