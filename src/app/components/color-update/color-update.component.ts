import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  
  colorUpdateForm: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorUpdateForm();
  }
  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      colorName: ['', Validators.required],
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let brandModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(brandModel).subscribe(
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
