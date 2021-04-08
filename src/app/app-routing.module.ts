import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full",component:CardetailComponent},
  {path:"cars",component:CardetailComponent},
  {path:"cars/brand/:brandId", component:CardetailComponent},
  {path:"cars/color/:colorId", component:CardetailComponent},

  {path:"cars/:id", component:CarComponent},
  {path:"cars/details/:id", component:CarComponent},
  
  {path:"rental/:id",component:RentalComponent},
  {path:"cars/rental/:id",component:RentalComponent},

  {path:"payments/:id",component: PaymentComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
