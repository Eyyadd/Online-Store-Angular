import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators , ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , FormsModule , RouterModule , CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

Error:string  = ``;
  constructor(private _authService:AuthServiceService ,  private _router: Router) {}
  RegisterForm:FormGroup = new FormGroup ({
    firstName:new FormControl('' , [Validators.required , Validators.minLength(3)]),
    lastName:new FormControl('' , [Validators.required , Validators.minLength(3)]),
    userName:new FormControl('' , [Validators.required , Validators.minLength(3)]),
    email:new FormControl('' , [Validators.required , Validators.email]),
    password:new FormControl('' , [Validators.required , Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$")]),
    phoneNumber:new FormControl('' , [Validators.required])
  })

  Register()
  {
    console.log(this.RegisterForm.value);
     this._authService.Register(this.RegisterForm.value).subscribe((res)=>{
         if(res.success)
         {
             this._router.navigate(['/Login'])
         }
         else
         {
           this.Error = res.message
         }
     })
  }

}
