import { Routes } from '@angular/router';
import { ProductsListingComponent } from './features/components/product/products-listing/products-listing.component';
import { HomeComponent } from './features/components/home/home.component';
import { ProductDetailsComponent } from './features/components/product/product-details/product-details.component';
import { LoginComponent } from './features/components/account/login/login.component';
import { RegisterComponent } from './features/components/account/register/register.component';
import { CartComponent } from './features/components/cart/cart/cart.component';
import { CategoryComponent } from './features/components/category/category.component';
import { AboutUsComponent } from './features/components/about-us/about-us.component';
import { ContactUsComponent } from './features/components/contact-us/contact-us.component';
import { OrderHistoryComponent } from './features/components/orders/order-history/order-history.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { PaymentComponent } from './features/components/checkout/payment/payment.component';
import { AdminDashBoardComponent } from './Admin/admin-dash-board/admin-dash-board.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { AdminProductsComponent } from './Admin/admin-products/admin-products.component';
import { StepTwoComponent } from './Admin/step-two/step-two.component';
import { RetrieveOwnersComponent } from './Super-Admin/retrieve-owners/retrieve-owners.component';
import { AdminWellcomComponent } from './Admin/admin-wellcom/admin-wellcom.component';
import { AdminProfileComponent } from './Admin/admin-profile/admin-profile.component';
import { AdminUpdateInformationComponent } from './Admin/admin-update-information/admin-update-information.component';
import { AssignRoleComponent } from './Super-Admin/assign-role/assign-role.component';

export const routes: Routes = [
  {path:"" , component:HomeComponent},
  {path:"Admin" , component:AdminDashBoardComponent , children:
    [
      {path:"" , component:AdminWellcomComponent},
      {path:"Wellcome" , component:AdminWellcomComponent},
      {path:"Home" , component:AdminHomeComponent ,pathMatch:'full'},
      {path:"Products" , component:AdminProductsComponent},
      {path:'StepTwo/:id' , component:StepTwoComponent},
      {path:'Profile' , component:AdminProfileComponent},
      {path:"UpdateInformation", component:AdminUpdateInformationComponent}
]
  },
  {path:"Home" , component:HomeComponent},
  {path:"Proudcts" , component:ProductsListingComponent},
  {path:"Products/:search",component:ProductsListingComponent},
  {path:"ProudctDetails/:id" , component:ProductDetailsComponent},
  {path:"Login" , component:LoginComponent},
  {path:"Register" , component:RegisterComponent},
  {path:"Cart" , component:CartComponent},
  {path:"Category" , component:CategoryComponent},
  {path:"AboutUs" , component:AboutUsComponent},
  {path:"ContactUs" , component:ContactUsComponent},
  {path:"OrderHistory", component:OrderHistoryComponent},
  {path:"Payment",component:PaymentComponent},
  {path:"RetrieveOwners",component:RetrieveOwnersComponent},
  {path:"AssignRole",component:AssignRoleComponent},
  {path: '**',component:NotFoundComponent}
];
