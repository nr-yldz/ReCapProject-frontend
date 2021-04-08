import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44328/api/'

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath= this.apiUrl + "cars/getall";
    return  this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath= this.apiUrl + "cars/getcardetails";
    return  this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsById(id:number): Observable<ListResponseModel<CarDetail>> {
    let newPath= this.apiUrl + "cars/getcardetails?id="+id;
    return  this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  
  getCarDetailsByBrandId(brandId:number): Observable<ListResponseModel<CarDetail>> {
    let newPath= this.apiUrl + "cars/getcardetailsbybrandid?brandId="+brandId
    return  this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByColorId(colorId:number): Observable<ListResponseModel<CarDetail>> {
    let newPath= this.apiUrl + "cars/getcardetailsbycolorid?colorId="+colorId
    return  this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailsByBrandAndColor(brandId:number, colorId:number): Observable<ListResponseModel<CarDetail>> {
    let newPath= this.apiUrl + "cars/getcardetailsbybrandandcolorid?brandId="+ brandId +"&colorId=" + colorId
    return  this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

}
