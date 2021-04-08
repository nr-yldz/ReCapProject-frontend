import { Component, Input, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  paymentForm: FormGroup;
  @Input() rental: Rental;

  constructor(private paymentService: PaymentService,  private toastrService: ToastrService,
    private formBuilder: FormBuilder,  private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,  private router: Router) { }

  ngOnInit(): void {

    this.createPaymentForm();
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardCvv: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      lastNameOnCard:['', Validators.required],
      expirationDateMonth: ['', Validators.required],
      expirationDateYear: ['', Validators.required],
    });
  }

  paymentCheck() {
    let paymentModel = Object.assign({}, this.paymentForm.value);

    console.log(paymentModel);

    this.paymentService.isCardExist(paymentModel).subscribe(
      (response) => {
        this.toastrService.success(
          'Ödeme Bilgileri Onaylandı',
          'İşlem Başarılı'
        );
        
      },
      (responseError) => {
        this.toastrService.error(
          'Ödeme Bilgileri Onaylanmadı,Ana sayfaya yönlendiriliyorsunuz',
          'İşlem Başarısız'
        );

        this.router.navigate(['/cars']);
      }
    );

    }
}
