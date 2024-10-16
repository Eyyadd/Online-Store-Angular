import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-assign-role',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule , CommonModule],
  templateUrl: './assign-role.component.html',
  styleUrl: './assign-role.component.css'
})
export class AssignRoleComponent {


  constructor(private _http:HttpClient) {


  }
  AssignRoleForm:FormGroup = new FormGroup({
    userEmail:new FormControl('',[Validators.required , Validators.email]),
    roleName:new FormControl('',[Validators.required , Validators.minLength(3)]),})

AssignRole()
{
  let userEmail = this.AssignRoleForm.controls['userEmail'].value;
  let roleName = this.AssignRoleForm.controls['roleName'].value;
  console.log(userEmail , roleName)
  this._http.post<{success:boolean, data:any,message:string}>(
    `https://localhost:44322/api/Role/Assign?userEmail=${userEmail}&roleName=${roleName}`,
    {
      headers : new HttpHeaders({
      //  'Content-Type': 'application/json',     // Specify content type (if needed)
       Authorization: `${localStorage.getItem('token')}`,       // Add the token in the Authorization header
     })
   }).subscribe((res)=>
  {
    console.log(res)
  })

  }


}
