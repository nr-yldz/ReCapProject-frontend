import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Rental } from 'src/app/models/rental'
import { RentalDetail } from 'src/app/models/rentalDetail'
import { RentalService } from 'src/app/services/rental.service'

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: RentalDetail;
  rentaldetails:RentalDetail[]=[];
  id: number
  addRentCarForm: FormGroup
  currentDate: Date = new Date()
  rentDate: string | number | Date
  returnDate: string | number | Date

  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.createAddRentCarForm()
  }

  getRentalDetails() {
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentaldetails = response.data
    })
  }
  createAddRentCarForm() {
    this.addRentCarForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      customerId: [0, Validators.required],
      rentDate: ['', [Validators.required]],
      returnDate: ['', Validators.required],
    })
  }

  setRentingCar() {
    if (this.addRentCarForm.invalid) {
      this.toastrService.warning('Alanları kontrol ediniz', 'Dikkat')
      return false
    }

    this.rentaldetails = this.addRentCarForm.value
    let rentDate = new Date(this.rentDate)
    let returnDate = new Date(this.returnDate)

    if (rentDate < this.currentDate) {
      this.toastrService.warning(
        'Kiralama Tarihi, bu günden sonraki günler olmalıdır',
        'Dikkat',
      )
      return false
    }

    if (returnDate < rentDate || returnDate.getDate() == rentDate.getDate()) {
      this.toastrService.warning(
        'Dönüş Tarihi, kiralama tarihinden sonraki günler olmalıdır',
        'Dikkat',
      )
      return false
    }

    this.rentalService.setRentingCar(this.rentals)

    this.toastrService.success('Ödeme sayfasına yönlendiriliyorsunuz')
    return this.router.navigate(['payment'])
  }

  checkCarRentable() {
    this.rentalService
      .getRentalDetailByCarId(this.id)
      .subscribe((responseSuccess) => {
        if (responseSuccess.data[0] == null) {
          this.setRentingCar()
          return true
        }

        let lastItem = responseSuccess.data[responseSuccess.data.length - 1]

        if (lastItem.returnDate == null) {
          return this.toastrService.error('Bu araç henüz teslim edilmemiş')
        }

        let returnDate = new Date(lastItem.returnDate)
        this.setRentingCar()

        if (new Date(this.rentals.rentDate) < returnDate) {
          this.rentalService.removeRentingCar()
          return this.toastrService.warning(
            'Bu aracı bu tarihler arasında kiralayamazsınız',
            'Dikkat',
          )
        }

        return true
      })
  }
}
