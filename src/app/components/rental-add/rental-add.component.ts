import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FindexService } from 'src/app/services/findex.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {

  rentalAddForm: FormGroup;
  customers: CustomerDetail[] = [];
  currentCar: CarDetail;
  cardetails:CarDetail[]=[];
  rentDate = new Date;
  totalPrice: number = 0;
  dataLoaded = false;

  constructor(private carService: CarService,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private cartService : CartService,
    private findexService: FindexService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.id) {
        this.getCarDetailsById(params.id)
      }
    })
  
    this.getCustomerDetails()
    this.createRentalAddForm()
    this.calcTotalPrice()
  }

  getCarDetailsById(id: number) {
    this.carService.getCarDetailsById(id).subscribe((response) => {
      this.cardetails = response.data
    })
  }
createRentalAddForm() {
  this.rentalAddForm = this.formBuilder.group({
    customerId: ['', Validators.required],
    rentDate:['', Validators.required],
    id: [''],
    numberOfDate: [''],
  })
  this.rentalAddForm.controls["rentDate"].setValue(formatDate(this.rentDate,'yyyy-MM-dd','en'))
  this.rentalAddForm.controls["numberOfDate"].setValue(0)
}

// kirala
addToCart() {
  if (this.rentalAddForm.valid) {
    let rentalModel = Object.assign({}, this.rentalAddForm.value)
    rentalModel.id = this.currentCar.id;
    rentalModel.brandName = this.currentCar.brandName
    rentalModel.colorName = this.currentCar.colorName
    rentalModel.descriptions = this.currentCar.descriptions
    rentalModel.modelYear = this.currentCar.modelYear
    rentalModel.dailyPrice = this.currentCar.dailyPrice
    rentalModel.totalPrice =  this.totalPrice
    
    // findex puanlarını al
    let customerPoint = this.findexService.getPointByCustomerId(rentalModel.customerId)
    let carPoint = this.findexService.getPointByCarId(rentalModel.carId)

    if(customerPoint >= carPoint){
      this.cartService.addToCart(rentalModel)
      this.toastrService.success("Sepete eklendi", this.currentCar.brandName)
    } else {
      this.toastrService.error('Findex puanınız yetersiz', 'Hata')
    }

  } else {
    this.toastrService.error('Formunuz eksik', 'Hata')
  }
}

getCustomerDetails() {
  this.customerService.getCustomerDetails().subscribe((response) => {
    this.customers = response.data
    
  });
}

calcTotalPrice(): void {
  this.rentalAddForm.valueChanges.subscribe(val=>{
    this.totalPrice =  this.currentCar.dailyPrice * val.numberOfDate
  })
}
}

