import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CarDetail } from 'src/app/models/carDetail'
import { CarImage } from 'src/app/models/carImage'
import { CarImageService } from 'src/app/services/car-image.service'
import { CarService } from 'src/app/services/car.service'

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  cardetails: CarDetail[] = []
  carimages: CarImage[] = []
  imageBasePath = 'https://localhost:44328'

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarDetailsByBrandId(params['brandId'])
      } else if (params['colorId']) {
        this.getCarDetailsByColorId(params['colorId'])
      } else {
        this.getCarDetails()
      }
    })
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.cardetails = response.data
    })
  }

  getCarDetailsById(id: number) {
    this.carService.getCarDetailsById(id).subscribe((response) => {
      this.cardetails = response.data
    })
  }

  getImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carimages = response.data
    })
  }
  getCarDetailsByBrandId(brandId: number) {
    this.carService.getCarDetailsByBrandId(brandId).subscribe((response) => {
      this.cardetails = response.data
    })
  }

  getCarDetailsByColorId(colorId: number) {
    this.carService.getCarDetailsByColorId(colorId).subscribe((response) => {
      this.cardetails = response.data
    })
  }
}
