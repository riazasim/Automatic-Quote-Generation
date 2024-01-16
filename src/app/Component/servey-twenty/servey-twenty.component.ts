import { Component, Output, Input, OnInit, EventEmitter } from "@angular/core";
import {
  UntypedFormGroup,
  FormControl,
  Validators,
  UntypedFormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-servey-twenty",
  templateUrl: "./servey-twenty.component.html",
  styleUrls: ["./servey-twenty.component.css"],
})
export class ServeyTwentyComponent implements OnInit {
  radioValue: any;
  checkinLPRSetupForm: UntypedFormGroup;
  @Output() changeServeyStep = new EventEmitter<any>();
  // constructor() {
  //   const formValues = localStorage.getItem('checkinLPRSetupForm');
  //   if (formValues) {
  //     this.checkinLPRSetupForm = new FormGroup({
  //       AllowedCameras1: new FormControl(
  //         JSON.parse(formValues).AllowedCameras2,
  //         Validators.required
  //       ),
  //       AllowedCameras2: new FormControl(
  //         JSON.parse(formValues).AllowedCameras2,
  //         Validators.required
  //       ),
  //     });
  //   } else {
  //     this.checkinLPRSetupForm = new FormGroup({
  //       AllowedCameras1: new FormControl(null, Validators.required),
  //       AllowedCameras2: new FormControl(null, Validators.required),
  //     });
  //   }
  // }
  private formSumitAttempt: boolean;
  constructor(private formBuilder: UntypedFormBuilder) {
    this.formSumitAttempt = false;
    const formValues = localStorage.getItem("checkinLPRSetupForm");
    if (formValues) {
      this.checkinLPRSetupForm = this.formBuilder.group({
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
      this.checkinLPRSetupForm = this.formBuilder.group({
        AllowedCameras1: ["", Validators.required],
        AllowedCameras2: ["", Validators.required],
      });
    }
  }
  isFieldValid(field: string) {
    return (
      (!this.checkinLPRSetupForm?.get(field)?.valid &&
        this.checkinLPRSetupForm?.get(field)?.touched) ||
      (this.checkinLPRSetupForm?.get(field)?.untouched && this.formSumitAttempt)
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
    if (this.checkinLPRSetupForm.valid) {
      console.log(this.checkinLPRSetupForm.value);
      localStorage.setItem(
        "checkinLPRSetupForm",
        JSON.stringify(this.checkinLPRSetupForm.value)
      );
      this.changeServeyStep.emit("serveytwentyone");
    }
  }
  goBack() {
    this.changeServeyStep.emit("serveynineteen");
  }
  ngOnInit(): void {}
  get AllowedCameras1() {
    return this.checkinLPRSetupForm.get("AllowedCameras1");
  }

  get AllowedCameras2() {
    return this.checkinLPRSetupForm.get("AllowedCameras2");
  }
}
