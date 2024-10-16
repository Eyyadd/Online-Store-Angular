import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../core/services/owner.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-retrieve-owners',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './retrieve-owners.component.html',
  styleUrl: './retrieve-owners.component.css'
})
export class RetrieveOwnersComponent implements OnInit{
  owners: any[] = [];
  success: boolean = false;
  message: string = '';

  constructor(private ownerService:OwnerService){

  }
  ngOnInit(): void {
    this.fetchOwners();
  }

  fetchOwners(): void {
    this.ownerService.getOwners().subscribe(
      (response) => {
        if (response.success) {
          this.owners = response.data;
          this.success = response.success;
          this.message = response.message;
        }
      },
      (error) => {
        console.error('Error fetching owners data', error);
      }
    );
  }

}
