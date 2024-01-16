import { Component, Output, Input, OnInit, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  UntypedFormGroup,
  FormControl,
  Validators,
  UntypedFormBuilder,
} from "@angular/forms";
@Component({
  selector: "app-servey-six",
  templateUrl: "./servey-six.component.html",
  styleUrls: ["./servey-six.component.css"],
})
export class ServeySixComponent implements OnInit {
  radioValue: any;
  qouteForm: UntypedFormGroup;
  formSumitAttempt: any;

  @Output() changeServeyStep = new EventEmitter<any>();
  myData: any;
  locationTypes: any;
  errorMessage: any;
  constructor(private formBuilder: UntypedFormBuilder, private http: HttpClient) {
    this.radioValue = "residential";
    this.locationTypes = [];
    const formValues = localStorage.getItem("qouteForm");
    if (formValues) {
      this.formSumitAttempt = false;
      this.qouteForm = this.formBuilder.group({
        locationName: [
          JSON.parse(formValues)?.locationName,
          Validators.required,
        ],
        country: [JSON.parse(formValues)?.country, Validators.required],
        city: [JSON.parse(formValues)?.city, Validators.required],
        residential: [JSON.parse(formValues)?.residential],
        commercial: [JSON.parse(formValues)?.commercial],
        office: [JSON.parse(formValues)?.office],
        factory: [JSON.parse(formValues)?.factory],
      });
    } else {
      this.formSumitAttempt = false;

      this.qouteForm = this.formBuilder.group({
        locationName: [null, Validators.required],
        country: ["", Validators.required],
        city: [null, Validators.required],
        residential: [false],
        commercial: [false],
        office: [false],
        factory: [false],
      });
    }
  }
  isFieldValid(field: string) {
    return (
      (!this.qouteForm.get(field)?.valid &&
        this.qouteForm.get(field)?.touched) ||
      (this.qouteForm.get(field)?.untouched && this.formSumitAttempt)
    );
  }
  checkLocationType() {
    return Object.keys(this.qouteForm.value).filter((key) => {
      return this.qouteForm.value[key] === true;
    })?.length === 0
      ? true
      : false;
  }
  checkedRadio = (value: any) => {
    console.log(this.qouteForm.value);
  };

  formSubmit() {
    this.formSumitAttempt = true;
    console.log(this.checkLocationType());

    if (this.qouteForm.valid && this.checkLocationType() === false) {
      const values = { ...this.qouteForm.value };
      values.type = Object.keys(this.qouteForm.value)
        .filter((key) => {
          return this.qouteForm.value[key] === true;
        })
        .toString();
      console.log(values);

      localStorage.setItem("qouteForm", JSON.stringify(values));
      this.changeServeyStep.emit("serveyseven");
    }
  }

  goBack() {
    this.changeServeyStep.emit("serveythree");
  }

  get locationName() {
    return this.qouteForm.get("locationName");
  }

  get country() {
    return this.qouteForm.get("country");
  }
  get city() {
    return this.qouteForm.get("city");
  }
  get type() {
    return this.qouteForm.get("type");
  }

  ngOnInit(): void {
    this.http
      .get("https://trial.mobiscroll.com/content/countries.json")
      .subscribe((resp: any) => {
        const countries = [];
        for (let i = 0; i < resp.length; ++i) {
          const country = resp[i];
          countries.push({ text: country.text, value: country.value });
        }
        this.myData = countries;
        console.log((this.myData = countries));
      });
  }
}
