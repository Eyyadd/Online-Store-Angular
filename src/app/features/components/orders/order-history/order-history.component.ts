import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../../../../core/services/order-service.service';
import { IOrder } from '../../../../core/Models/iorder';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit{
  orders:IOrder[]=[];
  constructor(private _orderService:OrderServiceService){ }
  ngOnInit(): void {
    this._orderService.getOrders().subscribe((orders:IOrder[])=>{
      this.orders = orders;
      console.log(this.orders);
    })
  }



}
