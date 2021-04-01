import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:Customer[]=[];
  customerdetails:CustomerDetail[]=[];

  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomerDetails();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data
      
    });
  }

  getCustomerDetails() {
    this.customerService.getCustomerDetails().subscribe(response => {
      this.customerdetails = response.data
      
    });
  }

}
