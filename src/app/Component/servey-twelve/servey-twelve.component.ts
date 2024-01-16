import { Component, Output, Input, OnInit, EventEmitter } from "@angular/core";
import {
  UntypedFormGroup,
  FormControl,
  Validators,
  UntypedFormBuilder,
  FormArray,
} from "@angular/forms";

@Component({
  selector: "app-servey-twelve",
  templateUrl: "./servey-twelve.component.html",
  styleUrls: ["./servey-twelve.component.css"],
})
export class ServeyTwelveComponent implements OnInit {
  radioValue: any;
  @Output() changeServeyStep = new EventEmitter<any>();
  applyPedestrianProfile: UntypedFormGroup;
  private formSumitAttempt: boolean;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.radioValue = "car";
    this.formSumitAttempt = false;
    const formValues = localStorage.getItem("applyPedestrianProfile");
    if (formValues) {
      this.applyPedestrianProfile = this.formBuilder.group({
        access_point: [
          JSON.parse(formValues)?.access_point,
          Validators.required,
        ],
        access_type: [JSON.parse(formValues)?.access_type, Validators.required],
      });
      this.radioValue = JSON.parse(formValues)?.access_point;
    } else {
      this.applyPedestrianProfile = this.formBuilder.group({
        access_point: [null, Validators.required],
        access_type: ["car", Validators.required],
      });
    }
  }
  isFieldValid(field: string) {
    return (
      (!this.applyPedestrianProfile?.get(field)?.valid &&
        this.applyPedestrianProfile?.get(field)?.touched) ||
      (this.applyPedestrianProfile?.get(field)?.untouched &&
        this.formSumitAttempt)
    );
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field),
    };
  }
  checkedRadio = (value: any) => {
    this.radioValue = value;
    this.applyPedestrianProfile.patchValue({ access_type: value });
  };
  formSubmit() {
    this.formSumitAttempt = true;

    if (this.applyPedestrianProfile.valid) {
      console.log(this.applyPedestrianProfile.value);
      localStorage.setItem(
        "applyPedestrianProfile",
        JSON.stringify(this.applyPedestrianProfile.value)
      );
      this.changeServeyStep.emit("serveythirteen");
    }
    console.log(this.applyPedestrianProfile.value);
  }
  goBack() {
    this.changeServeyStep.emit("serveyten");
  }
  ngOnInit(): void {}
}
