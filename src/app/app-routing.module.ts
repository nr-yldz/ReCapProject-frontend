import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path:"", pathMatch:"full",component:CardetailComponent},
  {path:"cars",component:CardetailComponent},
  {path:"cars/brand/:brandId", component:CardetailComponent},
  {path:"cars/color/:colorId", component:CardetailComponent},

  {path:"cars/:id", component:CarComponent},
  {path:"cars/details/:id", component:CarComponent},
  {path:"car/rental", component:CarComponent},
  
  {path:"rental/:id",component:RentalComponent},
  {path:"cars/rental/:id",component:RentalComponent},
  {path:"rentals", component: RentalComponent},

  {path:"payments/:id",component: PaymentComponent},
  {path:"payment",component:PaymentComponent},
  
  {path:"car/add", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"colors/add", component:ColorAddComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"rentals/add", component:RentalAddComponent},

  {path:"car/update", component:CarUpdateComponent},
  {path:"colors/update", component:ColorUpdateComponent},
  {path:"brands/update", component:BrandUpdateComponent},

  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"users/update", component:UserUpdateComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
