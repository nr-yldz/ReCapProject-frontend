import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  
  carUpdateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      brandId: ['', Validators.required],
      brandName: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      descriptions: ['', Validators.required],
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      let brandModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          } else {
            this.toastrService.error('Form eksik', 'Dikkat');
          }
        }
      );
    }
  }

}
