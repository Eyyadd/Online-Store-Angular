import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';



@Component({
  selector: 'app-admin-dash-board',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule,RouterLink ,RouterModule],

templateUrl: './admin-dash-board.component.html',
  styleUrl: './admin-dash-board.component.css'
})
export class AdminDashBoardComponent {

}
