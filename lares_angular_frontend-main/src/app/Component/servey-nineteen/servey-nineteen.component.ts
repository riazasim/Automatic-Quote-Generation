import { Component, Output, Input, OnInit, EventEmitter } from "@angular/core";
import {
  UntypedFormGroup,
  FormControl,
  Validators,
  UntypedFormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-servey-nineteen",
  templateUrl: "./servey-nineteen.component.html",
  styleUrls: ["./servey-nineteen.component.css"],
})
export class ServeyNineteenComponent implements OnInit {
  radioValue: any;
  checkOutLPRSetupForm: UntypedFormGroup;
  private formSumitAttempt: boolean;

  @Output() changeServeyStep = new EventEmitter<any>();

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formSumitAttempt = false;
    const formValues = localStorage.getItem("checkOutLPRSetupForm");
    if (formValues) {
      this.checkOutLPRSetupForm = this.formBuilder.group({
        AllowedCameras1: [
          JSON.parse(formValues)?.AllowedCameras1,
          Validators.required,
        ],
        AllowedCameras2: [
          JSON.parse(formValues)?.AllowedCameras2,
          Validators.required,
        ],
      });
    } else {
      this.checkOutLPRSetupForm = this.formBuilder.group({
        AllowedCameras1: ["", Validators.required],
        AllowedCameras2: ["", Validators.required],
      });
    }
  }
  isFieldValid(field: string) {
    return (
      (!this.checkOutLPRSetupForm?.get(field)?.valid &&
        this.checkOutLPRSetupForm?.get(field)?.touched) ||
      (this.checkOutLPRSetupForm?.get(field)?.untouched &&
        this.formSumitAttempt)
    );
  }

  // displayFieldCss(field: string) {
  //   return {
  //     "has-error": this.isFieldValid(field),
  //     "has-feedback": this.isFieldValid(field),
  //   };
  // }

  formSubmit() {
    this.formSumitAttempt = true;
    if (this.checkOutLPRSetupForm.valid) {
      console.log(this.checkOutLPRSetupForm.value);
      localStorage.setItem(
        "checkOutLPRSetupForm",
        JSON.stringify(this.checkOutLPRSetupForm.value)
      );
      this.changeServeyStep.emit("serveytwenty");
    }
  }
  goBack() {
    this.changeServeyStep.emit("serveyeighteen");
  }

  ngOnInit(): void {}
  get AllowedCameras1() {
    return this.checkOutLPRSetupForm.get("AllowedCameras1");
  }

  get AllowedCameras2() {
    return this.checkOutLPRSetupForm.get("AllowedCameras2");
  }
}
