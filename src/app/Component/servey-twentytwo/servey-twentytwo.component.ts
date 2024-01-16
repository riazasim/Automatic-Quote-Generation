import { Component, Output, Input, OnInit, EventEmitter } from "@angular/core";
import {
  UntypedFormGroup,
  FormControl,
  Validators,
  UntypedFormBuilder,
  FormArray,
} from "@angular/forms";
@Component({
  selector: "app-servey-twentytwo",
  templateUrl: "./servey-twentytwo.component.html",
  styleUrls: ["./servey-twentytwo.component.css"],
})
export class ServeyTwentytwoComponent implements OnInit {
  radioValue: any;
  @Output() changeServeyStep = new EventEmitter<any>();
  applyVehicleProfile: UntypedFormGroup;
  private formSumitAttempt: boolean;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.radioValue = "car";
    this.formSumitAttempt = false;
    const formValues = localStorage.getItem("applyVehicleProfile");
    if (formValues) {
      this.applyVehicleProfile = this.formBuilder.group({
        access_point: [
          JSON.parse(formValues)?.access_point,
          Validators.required,
        ],
        access_type: [JSON.parse(formValues)?.access_type, Validators.required],
        access_type_1: [
          JSON.parse(formValues)?.access_type_1,
          Validators.required,
        ],
      });
      this.radioValue = JSON.parse(formValues)?.access_point;
    } else {
      this.applyVehicleProfile = this.formBuilder.group({
        access_point: [null, Validators.required],
        access_type: ["car", Validators.required],
        access_type_1: ["car", Validators.required],
      });
    }
  }
  isFieldValid(field: string) {
    return (
      (!this.applyVehicleProfile?.get(field)?.valid &&
        this.applyVehicleProfile?.get(field)?.touched) ||
      (this.applyVehicleProfile?.get(field)?.untouched && this.formSumitAttempt)
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
    this.applyVehicleProfile.patchValue({ access_type: value });
  };
  formSubmit() {
    this.formSumitAttempt = true;

    if (this.applyVehicleProfile.valid) {
      console.log(this.applyVehicleProfile.value);
      localStorage.setItem(
        "applyVehicleProfile",
        JSON.stringify(this.applyVehicleProfile.value)
      );
      this.changeServeyStep.emit("serveytwentythree");
    }
    console.log(this.applyVehicleProfile.value);
  }

  goBack() {
    this.changeServeyStep.emit("serveytwentyone");
  }
  ngOnInit(): void {}

  get access_point() {
    return this.applyVehicleProfile.get("access_point");
  }

  get access_point2() {
    return this.applyVehicleProfile.get("access_point2");
  }
}
