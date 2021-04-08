import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  rentingCar:RentalDetail;

  apiUrl = 'https://localhost:44328/api/'

  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath= this.apiUrl + "rentals/getall";
    return  this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath= this.apiUrl + "rentals/getrentaldetails";
    return  this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalDetailByCarId(id:number): Observable<ListResponseModel<Rental>> {
    let newPath= this.apiUrl + "rentals/getrentalbycarid?id="+id;
    return  this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  
  setRentingCar(rental: RentalDetail) {
    this.rentingCar = rental;
 }

 getRentingCar() {
    return this.rentingCar;
 }

 removeRentingCar() {
    this.rentingCar == null
 }

 add(rental: RentalDetail): Observable<ResponseModel> {
   let newPath = this.apiUrl + "rentals/add"
    return this.httpClient.post<ResponseModel>(newPath, rental);
 }

}
