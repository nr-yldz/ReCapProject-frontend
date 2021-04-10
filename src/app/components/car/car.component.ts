import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Car } from 'src/app/models/car'
import { CarDetail } from 'src/app/models/carDetail'
import { CarService } from 'src/app/services/car.service'
import { CartService } from 'src/app/services/cart.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  cardetails: CarDetail[]=[];
  dataLoaded = true;
  imageBasePath="https://localhost:44328"


  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,private toastrService:ToastrService, 
    private cartService:CartService, private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
          this.getCarDetailsById(params["id"])
        }
        else{
          this.getCarDetails()
        }
      })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data
      this.dataLoaded = true
    })
  }
  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.cardetails = response.data
     
    })
  }

  getCarDetailsById(id:number) {
    this.carService.getCarDetailsById(id).subscribe((response) => {
      this.cardetails = response.data
    
    })
  }
  rentTest(cardetail:CarDetail){
    this.toastrService.success("Kiralandı",cardetail.brandName)
    this.router.navigate(["rentals"])
    this.cartService.addToCart(cardetail)
  }
  }

