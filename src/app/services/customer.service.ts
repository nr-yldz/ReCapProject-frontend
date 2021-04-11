import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customerDetail';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:44328/api/'

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath= this.apiUrl + "customers/getall";
    return  this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerDetails(): Observable<ListResponseModel<CustomerDetail>> {
    let newPath= this.apiUrl + "customers/getcustomerdetails";
    return  this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }
  getByCustomerId(id:number): Observable<ListResponseModel<Customer>> {
    let newPath= this.apiUrl + "customers/getbyid?colorId="+id
    return  this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomersByMail(email:string): Observable<ListResponseModel<CustomerDetail>> {
    let newPath= this.apiUrl + "customers/getcustomersbymail?email="+email
    return  this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }

}
