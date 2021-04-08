import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Payment} from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44328/api/'

  constructor(private httpClient: HttpClient) { }

  isCardExist(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl+"payments/iscardexist";
    return this.httpClient.post<ResponseModel>(newPath,payment)
  }
}
