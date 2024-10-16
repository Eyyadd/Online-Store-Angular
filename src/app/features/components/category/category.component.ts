import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { IProduct } from '../../../core/Models/iproduct';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'] // Corrected property
})
export class CategoryComponent implements OnInit {
  MenProducts: IProduct[] = [];
  WomenProducts: IProduct[] = [];
  ChildrenProducts: IProduct[] = [];

  constructor(private _categoryService: CategoryService,private _router:Router) {}

  ngOnInit(): void {
    // Fetch Men's Products and slice the first 3 products
    this._categoryService.getAllProductsByCategoryType('Men').subscribe(
      (menProducts: IProduct[]) => {
        this.MenProducts = menProducts.slice(0, 3); // First 3 products
        console.log('Men Products:', this.MenProducts);
      }
    );

    // Fetch Women's Products and slice the first 3 products
    this._categoryService.getAllProductsByCategoryType('Women').subscribe(
      (womenProducts: IProduct[]) => {
        this.WomenProducts = womenProducts.slice(0, 3); // First 3 products
        console.log('Women Products:', this.WomenProducts);
      }
    );

    // Fetch Children's Products and slice the first 3 products
    this._categoryService.getAllProductsByCategoryType('Children').subscribe(
      (childrenProducts: IProduct[]) => {
        this.ChildrenProducts = childrenProducts.slice(0, 3); // First 3 products
        console.log('Children Products:', this.ChildrenProducts);
      }
    );
  }

  navigateToListing(category: string): void {
    this._router.navigate([`/Products/${category}`], { queryParams: { category: category } });
  }
}
