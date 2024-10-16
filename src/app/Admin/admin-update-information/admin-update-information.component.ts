import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IUpdatePassword } from '../../core/Models/iupdate-password';

@Component({
  selector: 'app-admin-update-information',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule , CommonModule , RouterModule , RouterLink],
  templateUrl: './admin-update-information.component.html',
  styleUrl: './admin-update-information.component.css'
})
export class AdminUpdateInformationComponent {


  constructor(private _http:HttpClient , private _router:Router) {}
UpdatePasswordDate:IUpdatePassword = {} as IUpdatePassword
  UpdatePasswordForm:FormGroup = new FormGroup({
    userName:new FormControl('',[Validators.required , Validators.minLength(3)]),
    currentPassword:new FormControl('',[Validators.required]),
    newPassword:new FormControl('',[Validators.required , Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$")]),})


    updatePassword()
    {
      this.UpdatePasswordDate.currentPassword= this.UpdatePasswordForm.controls['currentPassword'].value
      this.UpdatePasswordDate.userName= this.UpdatePasswordForm.controls['userName'].value
      this.UpdatePasswordDate.newPassword= this.UpdatePasswordForm.controls['newPassword'].value
      console.log(this.UpdatePasswordDate)
       this._http.post<{success:boolean, data:any,message:string}>(
        `https://localhost:44322/api/Account/UpdatePassword`,
        this.UpdatePasswordDate,
        {
          headers : new HttpHeaders({
          //  'Content-Type': 'application/json',     // Specify content type (if needed)
           Authorization: `${localStorage.getItem('token')}`,       // Add the token in the Authorization header
         })
       }).subscribe((res)=>
      {
        console.log(res)
        this._router.navigate(['/Admin/Wellcome'])

      })
    }



}
