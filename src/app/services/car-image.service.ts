import { Injectable } from '@angular/core';
import { CarImage } from '../models/carImage';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = 'https://localhost:44328/api/'

  constructor(private httpClient: HttpClient) { }


 
  getImagesByCarId(carId:number): Observable<ListResponseModel<CarImage>> {
    let newPath= this.apiUrl + "carImages/getimagesbycarid?carId="+carId;
        return  this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
