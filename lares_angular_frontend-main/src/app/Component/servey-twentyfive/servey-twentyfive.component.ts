import { Component, Output, Input, OnInit, EventEmitter } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  UntypedFormBuilder,
} from "@angular/forms";
@Component({
  selector: "app-servey-twentyfive",
  templateUrl: "./servey-twentyfive.component.html",
  styleUrls: ["./servey-twentyfive.component.css"],
})
export class ServeyTwentyfiveComponent implements OnInit {
  laresIntegrationForm: UntypedFormGroup;
  private formSumitAttempt: any;
  submitingForm: any;

  @Output() changeServeyStep = new EventEmitter<any>();

  constructor(private formBuilder: UntypedFormBuilder) {
    const formValue = localStorage.getItem("laresIntegrationForm");
    this.formSumitAttempt = false;
    this.submitingForm = false;
    if (formValue) {
      this.laresIntegrationForm = this.formBuilder.group({
        integration: new UntypedFormControl(
          JSON.parse(formValue)?.integration,
          Validators.required
        ),
      });
    } else {
      this.laresIntegrationForm = this.formBuilder.group({
        integration: new UntypedFormControl("", Validators.required),
      });
      this.laresIntegrationForm.get("integration")?.setValue("2N");
    }
  }
  isFieldValid(field: string) {
    return (
      (!this.laresIntegrationForm?.get(field)?.valid &&
        this.laresIntegrationForm?.get(field)?.touched) ||
      (this.laresIntegrationForm?.get(field)?.untouched &&
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
    if (this.laresIntegrationForm.invalid) {
      return;
    }
    this.submitingForm = true;
    const formValue = this.laresIntegrationForm.value;
    console.log(formValue);
    localStorage.setItem("laresIntegrationForm", JSON.stringify(formValue));
    this.changeServeyStep.emit("serveyeleven");
  }

  ngOnInit(): void {}
  goBack() {
    this.changeServeyStep.emit("serveynine");
  }

  get f() {
    return this.laresIntegrationForm.controls;
  }
}
