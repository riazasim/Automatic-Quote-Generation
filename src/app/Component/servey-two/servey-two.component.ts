import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-servey-two',
  templateUrl: './servey-two.component.html',
  styleUrls: ['./servey-two.component.css'],
})
export class ServeyTwoComponent implements OnInit {
  reCaptchaFrom: UntypedFormGroup;
  @Output() changeServeyStep = new EventEmitter<any>();

  constructor() {
    this.reCaptchaFrom = new UntypedFormGroup({
      recaptcha: new UntypedFormControl(null, Validators.required),
    });
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.reCaptchaFrom?.get('recaptcha')?.setValue(captchaResponse);
    }
  }

  formSubmit() {
    if (this.reCaptchaFrom.valid) {
      this.changeServeyStep.emit('serveythree');
    }
  }

  goBack() {
    this.changeServeyStep.emit('serveyone');
  }

  ngOnInit(): void {}
}
