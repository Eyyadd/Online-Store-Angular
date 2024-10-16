import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductServiceService } from '../../../core/services/product-service.service';
import { NavBarComponent } from "../../../shared/components/nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';
import { IProduct } from '../../../core/Models/iproduct';
import { CartComponent } from "../cart/cart/cart.component";
import { ProductCardComponent } from "../../../shared/components/product-card/product-card.component";
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, NavBarComponent, RouterModule, CartComponent, ProductCardComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Seller: string[] = [];
  BestSellerProducts: IProduct[] = [];
  NewArrivalProducts: IProduct[] = [];

  // Stepper-related properties for Seller
  currentSellerIndex = 0;
  sellersPerPage = 4; // Number of sellers to show at a time

  constructor(private _ProuductService: ProductServiceService) {}

  ngOnInit(): void {
    this._ProuductService.getSeller().subscribe((Seller: string[]) => {
      this.Seller = Seller;
      console.log(this.Seller);
    });

    this._ProuductService.getBestSellerProducts().subscribe((BestSellerProducts: IProduct[]) => {
      this.BestSellerProducts = BestSellerProducts;
      console.log(this.BestSellerProducts);
    });

    this._ProuductService.getNewArrivalProducts().subscribe((NewArrivalProducts: IProduct[]) => {
      this.NewArrivalProducts = NewArrivalProducts;
      console.log(this.NewArrivalProducts);
    });
  }

  // Getter for current sellers displayed
  get currentSellers(): string[] {
    return this.Seller.slice(this.currentSellerIndex * this.sellersPerPage, (this.currentSellerIndex + 1) * this.sellersPerPage);
  }

  // Stepper methods for navigating sellers
  nextSellers(): void {
    if ((this.currentSellerIndex + 1) * this.sellersPerPage < this.Seller.length) {
      this.currentSellerIndex++;
    }
  }

  previousSellers(): void {
    if (this.currentSellerIndex > 0) {
      this.currentSellerIndex--;
    }
  }
}
