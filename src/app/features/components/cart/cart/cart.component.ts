import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart-service.service';
import { CartItems } from '../../../../core/Models/icart-items';
import { IUpdateCartItem } from '../../../../core/Models/iupdate-cart-item';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItems[] = [];
  shippingCost: number = 5; // Assuming a flat shipping cost
  taxAmount: number = 0; // Assuming no tax for simplicity
  totalPrice: number = 0; // To be calculated based on cart items

  constructor(private _cartService: CartService,private _router:Router,private http:HttpClient) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this._cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems);
      this.calculateTotalPrice(); // Calculate total price whenever cart items are loaded
    });
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    if (quantity < 1) return; // Prevents quantity from going below 1
    const updateDto: IUpdateCartItem = { cartItemId, quantity };

    const cartItem = this.cartItems.find(item => item.cartItemId === cartItemId);
    if (cartItem) {
      cartItem.cartProductQuantity = quantity;
      this.calculateTotalPrice(); // Update the total price based on new quantity
    }

    this._cartService.updateCartItem(updateDto).subscribe(
      () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Quantity updated successfully!',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
      },
      (error) => {
        console.error('Error updating quantity', error);
        this.loadCartItems();
      }
    );
  }

  increaseQuantity(item: CartItems): void {
    const newQuantity = item.cartProductQuantity + 1;
    this.updateQuantity(item.cartItemId, newQuantity);
  }

  decreaseQuantity(item: CartItems): void {
    if (item.cartProductQuantity > 1) {
      const newQuantity = item.cartProductQuantity - 1;
      this.updateQuantity(item.cartItemId, newQuantity);
    }
  }

  removeFromCart(item: CartItems): void {
    this._cartService.removeCartItem(item.cartItemId).subscribe(() => {
      // Remove the item from the cart UI
      this.cartItems = this.cartItems.filter(i => i.cartItemId !== item.cartItemId);
      this.calculateTotalPrice(); // Recalculate total price after removing the item
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item removed successfully!',
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    });
  }

  startNewCart(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will clear all items from your cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, keep my cart'
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear all items by removing them one by one
        this.cartItems.forEach(item => {
          this._cartService.removeCartItem(item.cartItemId).subscribe(() => {
            this.cartItems = [];
            this.calculateTotalPrice(); // Reset total price after clearing cart
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'All items cleared!',
              showConfirmButton: false,
              timer: 1500,
              toast: true
            });
          });
        });
      }
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + (item.price * item.cartProductQuantity),
      0
    );
  }

  navigateToHome(): void {
    this._router.navigate(['/Home']);
  }
  
  navigateToPayment():void{
    this.http.get('https://localhost:44322/api/Payment',{headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
    })}).subscribe((res)=>console.log(res));
    this._router.navigate(['/Payment']);
    // {
    //   "success": true,
    //   "data": null,
    //   "message": "Successfully"
    // }
  }
}
