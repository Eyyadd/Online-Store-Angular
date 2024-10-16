import { CommonModule, formatDate } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ApiServiceService } from '../../core/services/api-service.service';
import { CategoryService } from '../../core/services/category.service';
import { IProductCreate } from '../../core/Models/IProductCreate';
import { ProductServiceService } from '../../core/services/product-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IProduct } from '../../core/Models/iproduct';
import { CategoryAdmin } from '../../core/Models/category-admin';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule , FormsModule ,ReactiveFormsModule , RouterModule , RouterLink],

templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
Categories:CategoryAdmin[] = [];
UploadSuccess:boolean = false;
uploaded:boolean = false
uploadForm: FormGroup;
selectedFile: File = {} as File;
  constructor(private _router : Router ,private fb: FormBuilder,private _CategoryService : CategoryService , private _productService:ProductServiceService , private _http:HttpClient) {


    this.uploadForm = this.fb.group({
      file: [null]
    });




  }
ngOnInit(): void {
  console.log(this.ProductName);
  console.log(this.SelectedCategory);
  this._CategoryService.getAllCategory().subscribe((data)=>
  {
       this.Categories = data;
       console.log(this.Categories)
  })

}
SelectedCategory:string|null = null;
ProductName:string|null = null;
ForOneAccepted:boolean = false;
ProductPrice:number=0;
CategoryId:number=0;
ImageCover:File = {} as File;
ImagePath:string = ``
Seller:string = ``;
ProductToCreate:IProductCreate = {} as IProductCreate;
// selectedFile: File | null = null;
ProductForm:FormGroup = new FormGroup({
name:new FormControl('',[Validators.required , Validators.minLength(3)]),
seller:new FormControl('',[Validators.required , Validators.minLength(3)]),
price:new FormControl('',[Validators.required , Validators.min(150)]),
categoryId:new FormControl('',[Validators.required]),
imageCover:new FormControl(''),

})

StepOneForm:FormGroup = new FormGroup({
  Name:new FormControl('',[Validators.required , Validators.minLength(3)]),
  CategoryType:new FormControl('',[Validators.required])

})

FormTow:FormGroup = new FormGroup({
  price:new FormControl('',[Validators.required , Validators.min(100)]),
  Seller:new FormControl('' , [Validators.required , Validators.minLength(3)]),
  CategoryId:new FormControl('',[Validators.required]),
  ImageCover:new FormControl('' , [Validators.required])
})



GetValue(event:Event)
{
   this.SelectedCategory = (event.target as HTMLInputElement).value
   console.log(this.SelectedCategory)
}

VerificationStepOne()
{
   this.ForOneAccepted =true;
   console.log(this.ForOneAccepted)
}
category:number =0
getCategoryValue(event:Event)
{
  console.log(event.target)
  let input  = (event.target as HTMLInputElement)
  this.category = Number.parseInt(input.value)
}
AddProduct() {

  // console.log(this.ImageCover)
  // this.UploadImage(this.ImageCover).subscribe((res)=>
  // {
  //      this.ImagePath = res.filePath
  // })

  // this.ProductToCreate.name = this.ProductName as string;
  // this.ProductToCreate.categoryId = 3;
  // // this.ProductToCreate.imageCover = this.ImagePath;
  // // this.ProductToCreate.ImageCover = (this.FormTow.controls['ImageCover'].value as File).arrayBuffer;
  // this.ProductToCreate.price = this.ProductPrice;
  // this.ProductToCreate.seller = this.Seller;
  // console.log(this.ImageCover)

  // console.log(this.ProductToCreate)

  // // Call the AddProduct service
  // // this._productService.AddProduct(this.ProductToCreate).subscribe({
  // //   next: (res) => {
  // //     console.log('Product added successfully:', res);
  // //   },
  // //   error: (err) => {
  // //     console.error('Error adding product:', err);
  // //   }
  // // });

this.ProductToCreate.imageCover = this.ImagePath
this.ProductToCreate.name = this.ProductForm.controls['name'].value
this.ProductToCreate.price = this.ProductForm.controls['price'].value
this.ProductToCreate.seller = this.ProductForm.controls['seller'].value
this.ProductToCreate.categoryId = this.category

console.log(this.ProductToCreate)

this._http.post<{data:IProduct ,success:boolean , message:string}>(`https://localhost:44322/api/Product/Create` ,this.ProductToCreate ,
  {
    headers : new HttpHeaders({
     'Content-Type': 'application/json',     // Specify content type (if needed)
     Authorization: `${localStorage.getItem('token')}`,       // Add the token in the Authorization header
   })
 }
).subscribe((res)=>
{
  console.log(res)
  this._router.navigate([`Admin/StepTwo/${res.data.id}`])

})





}



BackToFirst()
{
  this.ForOneAccepted = false;
}


GetChanges(event:Event)
{
  console.log(event)
  console.log(event.target)
  let test  = (event.target) as HTMLInputElement
  // this.ImageCover = test.files?[0]
  console.log(test.files?[0]:()=>{console.log()})
}
UploadImage(file:File):Observable<any>
{
   const FormDat = new FormData()
   FormDat.append('file' , file)
   return this._http.post(`https://localhost:44322/api/Product/upload` ,FormDat ,


    {
      headers : new HttpHeaders({
       'Content-Type': 'application/json',     // Specify content type (if needed)
       Authorization: `${localStorage.getItem('token')}`,       // Add the token in the Authorization header
     })
   }
   )
}

// getImagePath(event:Event)
// {

//   const Input = event.target as HTMLInputElement
//   if(Input.files && Input.files.length > 0)
//   {
//     console.log(Input.files[0])
//     return this.UploadImage(Input.files[0]).subscribe((res)=>
//     {
//        console.log(res)
//     })
//   }
//   return 0
// }


getImagePath()
{

  this.UploadImage(this.ImageCover).subscribe((res)=>
  {
    console.log(res)
  })
}


onFileSelect(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
  this.uploaded = true
}


onSubmit() {
  const formData = new FormData();
  formData.append('file', this.selectedFile); // 'file' should match the parameter name in the backend

  // Make HTTP request to your backend endpoint
  this._http.post<{message:string , filePath:string}>('https://localhost:44322/api/Product/upload', formData ,
    {
      headers : new HttpHeaders({    // Specify content type (if needed)
       Authorization: `${localStorage.getItem('token')}`,       // Add the token in the Authorization header
     })
   }
  )
    .subscribe(response => {
      this.ImagePath = response.filePath
      this.UploadSuccess = true;
      console.log('Upload successful', response);
    }, error => {
      console.error('Upload error', error);
    });
}


}








