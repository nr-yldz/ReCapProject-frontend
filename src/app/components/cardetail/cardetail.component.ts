import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

cardetails: CarDetail[]=[];
carimages: CarImage[]=[];
imageBasePath="https://localhost:44328"

  constructor(private carService: CarService, private carImageService: CarImageService) { }

  ngOnInit(): void {
  this.getCarDetails();

  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe(response => {
      this.cardetails = response.data
     
    });
   
  }

  getCarDetailsById(id: number) {
    this.carService.getCarDetailsById(id).subscribe(response => {
      this.cardetails = response.data
     
    });
   
  }
  
  getImagesByCarId(carId:number) {
    this.carImageService.getImagesByCarId(carId).subscribe(response => {
      this.carimages = response.data
     
    });
   
  }

}
