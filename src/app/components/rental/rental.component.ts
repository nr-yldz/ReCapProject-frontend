import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

rentals:Rental[]=[];
rentaldetails:RentalDetail[]=[];

  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data
      
    });
  }
  getRentalDetails() {
    this.rentalService.getRentalDetails().subscribe(response => {
      this.rentaldetails = response.data
      
    });
  }

  }
