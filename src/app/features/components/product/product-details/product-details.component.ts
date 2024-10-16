import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProudctDetails } from '../../../../core/Models/IProudctDetails';
import { ProductServiceService } from '../../../../core/services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProductVariant, ISizeQuantity } from '../../../../core/Models/ProducVariants';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../core/services/cart-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule , FormsModule],
templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnChanges{

  ProductDetails:IProudctDetails = {} as IProudctDetails
  BaseUrl = `https://localhost:44322`;
  ProductColors : Set<string> = new Set<string>();
  ProudctVariants:IProductVariant[] = [];
  ChoosenColor:string =``;
  SelectedButtun:number = 0;
  quantity:number = 0;
  ChossenProductOriginalQuantity = 0;
  ChoosenProduct ={
    productVariantId: 0,
    cartQuantity: 0
  }


  constructor(private _ProductService :ProductServiceService , private _route :ActivatedRoute , private _CartService:CartService,private _router:Router) {}
  ngOnInit(): void {
    this._ProductService.getProudctDetails(this._route.snapshot.params['id']).subscribe((Proudct:IProudctDetails)=>
    {
        this.ProductDetails = Proudct;

        this.ProductDetails.coverImage = `https://localhost:44322${this.ProductDetails.coverImage}`
        this.ProductDetails.variants.forEach(element => {
          element.image =`${this.BaseUrl}${element.image}`
          this.ProductColors.add(element.color);
        });

        this.ProductColors.forEach(color => {
             let newProductVariant:IProductVariant = {} as IProductVariant;
             newProductVariant.color = color;
             this.ProudctVariants.push(newProductVariant);
        });

        console.log(this.ProudctVariants)

        this.ProudctVariants.forEach(vari => {
          vari.Sizes = []
           this.ProductDetails.variants.forEach(pv => {
              if(pv.color == vari.color)
              {
                 let VariantSize:ISizeQuantity = {} as ISizeQuantity
                 VariantSize.id = pv.id;
                 VariantSize.quantity = pv.quantity;
                 VariantSize.size = pv.size

                 vari.Sizes.push(VariantSize)
              }
           });
        });

        this.ChoosenColor = this.ProudctVariants[0].color;


        console.log(this.ProudctVariants)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.ChoosenColor)
  }

  ChangeChoosenValue(event :Event)
  {
    this.SelectedButtun =0;
    let value = (event.target as HTMLInputElement).value
      this.ChoosenColor = value;
      this.quantity =0
  }

  GetValue(event :Event)
  {
    let value =(event.target as HTMLInputElement).id;
    this.SelectedButtun = Number.parseInt(value);
    this.quantity =0
  }

  ReduceQuantity()
  {
    if(this.quantity >0)
    {
      this.quantity --;
    }
  }
  IncreaseQuantity()
  {

   this.getChossenProdctQuantity()
   if(this.quantity > this.ChossenProductOriginalQuantity)
   {
      this.quantity == this.ChossenProductOriginalQuantity
   }
   if(this.quantity < this.ChossenProductOriginalQuantity)
   {
    this.quantity ++;
   }
  }

  AddToCart() {
    this._CartService.AddToCart(this.ChoosenProduct).subscribe({
      next: (res) => {
        // Success alert
        Swal.fire({
          title: 'Success!',
          text: 'Product added to cart successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        if (error.status === 401) {
          Swal.fire({
            title: 'Unauthorized!',
            text: 'Please log in to add items to the cart.',
            icon: 'error',
            confirmButtonText: 'Login'
          }).then(() => {
            // Redirect to login page
            this._router.navigate(['/login']);
          });
        } else {
          console.error('Error adding to cart:', error);
        }
      }
    });
    
  }
  


  getChossenProdctQuantity()
  {
    this.ProudctVariants.forEach(pv => {
      if(pv.color == this.ChoosenColor)
      {
        pv.Sizes.forEach(element => {
           if(element.id == this.SelectedButtun)
           {
              this.ChossenProductOriginalQuantity = element.quantity
           }
        });
      }
   });
}



}
