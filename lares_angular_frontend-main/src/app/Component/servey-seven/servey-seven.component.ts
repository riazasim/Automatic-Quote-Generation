import { Component, Output, Input, OnInit, EventEmitter } from "@angular/core";
import {
  UntypedFormGroup,
  FormControl,
  Validators,
  UntypedFormBuilder,
  UntypedFormArray,
} from "@angular/forms";

@Component({
  selector: "app-servey-seven",
  templateUrl: "./servey-seven.component.html",
  styleUrls: ["./servey-seven.component.css"],
})
export class ServeySevenComponent implements OnInit {
  radioValue: any;
  accesspointArrayForm: UntypedFormGroup;
  accesspoints: UntypedFormArray;
  private formSumitAttempt: boolean;
  formValues: any;
  @Output() changeServeyStep = new EventEmitter<any>();

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formSumitAttempt = false;

    const formValues = localStorage.getItem("accesspointArrayForm");
    if (formValues) {
      this.formValues = JSON.parse(formValues);
      this.accesspointArrayForm = this.formBuilder.group({
        accesspoints: this.formBuilder.array([]),
      });
      this.accesspoints = this.accesspointArrayForm.get(
        "accesspoints"
      ) as UntypedFormArray;
      this.pushValue(JSON.parse(formValues)?.accesspoints);
    } else {
      this.accesspointArrayForm = this.formBuilder.group({
        accesspoints: this.formBuilder.array([this.createItem()]),
      });
      this.accesspoints = this.accesspointArrayForm.get(
        "accesspoints"
      ) as UntypedFormArray;
    }
  }

  createItem() {
    return this.formBuilder.group({
      access_point: ["", Validators.required],
      access_type1: [""],
      access_type2: [""],
    });
  }

  addItem(): void {
    this.accesspoints.push(this.createItem());
  }

  pushValue(value: any) {
    for (let i of value) {
      this.accesspoints?.push(
        this.formBuilder.group({
          access_point: [i.access_point, Validators.required],
          access_type1: [i.access_type1],
          access_type2: [i.access_type2],
        })
      );
    }
  }

  removeRow(index: any) {
    console.log(index);
    const formValues = this.formValues.accesspoints.splice(0, index);
    console.log(formValues);

    if (index > 0) {
      (<UntypedFormArray>this.accesspointArrayForm.get("accesspoints")).removeAt(
        index
      );
      localStorage.setItem(
        "accesspointArrayForm",
        JSON.stringify({ accesspoints: formValues })
      );
    }
  }
  isFieldValid(field: any) {
    return (
      (!field.controls.access_point.valid && this.formSumitAttempt) ||
      (field.controls.access_point?.untouched && this.formSumitAttempt)
    );
  }

  checkedRadio = (value: any) => {
    this.radioValue = value;
  };
  formSubmit() {
    this.formSumitAttempt = true;
    console.log(this.accesspointArrayForm.valid);
    if (this.accesspointArrayForm.valid) {
      console.log(this.accesspointArrayForm.value);
      localStorage.setItem(
        "accesspointArrayForm",
        JSON.stringify(this.accesspointArrayForm.value)
      );
      this.changeServeyStep.emit("serveyeight");
    }
  }
  goBack() {
    this.changeServeyStep.emit("serveysix");
  }
  getControls() {
    return (this.accesspointArrayForm.get("accesspoints") as UntypedFormArray)
      .controls;
  }
  ngOnInit(): void {}
  get access_point() {
    return this.accesspointArrayForm.get("access_point");
  }
}
