import { Component, Output, Input, OnInit, EventEmitter } from "@angular/core";
import {
  UntypedFormGroup,
  FormControl,
  Validators,
  UntypedFormBuilder,
} from "@angular/forms";
import { ServeyService } from "src/app/services/servey.service";

@Component({
  selector: "app-servey-four",
  templateUrl: "./servey-four.component.html",
  styleUrls: ["./servey-four.component.css"],
})
export class ServeyFourComponent implements OnInit {
  contactForm: UntypedFormGroup;
  private formSumitAttempt: any;
  submitingForm: any;

  @Output() changeServeyStep = new EventEmitter<any>();

  constructor(
    private serveyService: ServeyService,
    private formBuilder: UntypedFormBuilder
  ) {
    const formValue = localStorage.getItem("contactForm");
    this.formSumitAttempt = false;
    this.submitingForm = false;
    if (formValue) {
      this.contactForm = this.formBuilder.group({
        first_name: [JSON.parse(formValue).first_name, Validators.required],
        last_name: [JSON.parse(formValue).last_name, Validators.required],
        email: [JSON.parse(formValue).email, Validators.email],
        mobile: [JSON.parse(formValue).mobile, Validators.required],
        country: [JSON.parse(formValue).country, Validators.required],
        interested1: [JSON.parse(formValue).interested1],
        interested2: [JSON.parse(formValue).interested2],
        interested3: [JSON.parse(formValue).interested3],
      });
    } else {
      this.contactForm = this.formBuilder.group({
        first_name: [null, Validators.required],
        last_name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        mobile: [null, Validators.required],
        country: [null, Validators.required],
        interested1: [null],
        interested2: [null],
        interested3: [null],
      });
    }
  }
  isFieldValid(field: string) {
    return (
      (!this.contactForm?.get(field)?.valid &&
        this.contactForm?.get(field)?.touched) ||
      (this.contactForm?.get(field)?.untouched && this.formSumitAttempt)
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
    if (this.contactForm.valid) {
      this.submitingForm = true;
      localStorage.setItem(
        "contactForm",
        JSON.stringify(this.contactForm.value)
      );
      const Data = {
        servey_type: "contact",
        first_name: this.contactForm.value.first_name,
        last_name: this.contactForm.value.last_name,
        email: this.contactForm.value.email,
        mobile: this.contactForm.value.mobile,
        country: this.contactForm.value.country,
        interested: [
          {
            user_interest: this.contactForm.value
              ? "I want to know more about your solutions"
              : "",
          },
          {
            user_interest: this.contactForm.value
              ? "I need to understand requirements and capabilities"
              : "",
          },
          {
            user_interest: this.contactForm.value
              ? "I have a very specific need I need to discuss"
              : "",
          },
        ],
      };
      this.serveyService.contactApi(Data).subscribe((res) => {
        this.submitingForm = false;

        this.changeServeyStep.emit("serveyfive");
      });
    }
  }

  goBack() {
    this.changeServeyStep.emit("serveythree");
  }

  ngOnInit(): void {}

  get first_name() {
    return this.contactForm.get("first_name");
  }

  get last_name() {
    return this.contactForm.get("last_name");
  }
  get email() {
    return this.contactForm.get("email");
  }
  get mobile() {
    return this.contactForm.get("mobile");
  }
  get country() {
    return this.contactForm.get("country");
  }
}
