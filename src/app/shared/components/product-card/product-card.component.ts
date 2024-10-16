import { Component, Input, input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../core/Models/iproduct';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.development';



@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule , RouterModule ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit{
  @Input() Proudct:IProduct = {} as IProduct;

  constructor() { }
  ngOnInit(): void {
    this.Proudct.imageCover =`https://localhost:44322${this.Proudct.imageCover}`
    console.log(this.Proudct)
  }

}
