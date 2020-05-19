import { Component, OnInit } from '@angular/core';
import { CustomValidation } from '../validation/custom.validation';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  basicInfo: FormGroup;
  contactInfo: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.basicInfo = this.fb.group({
      firstName: [
        null,
        Validators.required
      ],
      lastName: [
        null,
        Validators.required
      ],
      birthDate: [
        null, 
        [
          Validators.required,
          Validators.pattern(CustomValidation.dateRegex),
          CustomValidation.dateBeforeValidator(new Date(Date.parse(this.basicInfo?.controls.birthDate?.value)), new Date(), 'dateBefore')
        ]
      ]
    });

    this.contactInfo = this.fb.group({
      email: [
        null, 
        [
          Validators.required,
          Validators.pattern(CustomValidation.emailRegex)
        ]
      ],
      phone: [
        null, 
        [
          Validators.required,
          Validators.pattern(CustomValidation.phoneRegex)
        ]
      ],
    });
  }

  dateBlur(){
    this.basicInfo?.controls.birthDate?.setValidators([
      Validators.required,
      Validators.pattern(CustomValidation.dateRegex),
      CustomValidation.dateBeforeValidator(new Date(Date.parse(this.basicInfo?.controls.birthDate?.value)), new Date(), 'dateBefore')
    ]);
  }

  submit(){
    console.log('Basic Info', this.basicInfo);
    console.log('Contact Info', this.contactInfo);
    alert('Submitted');
  }

}
