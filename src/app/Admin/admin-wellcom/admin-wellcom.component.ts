import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-wellcom',
  standalone: true,
  imports: [RouterLink , RouterModule],
  templateUrl: './admin-wellcom.component.html',
  styleUrl: './admin-wellcom.component.css'
})
export class AdminWellcomComponent {

}
