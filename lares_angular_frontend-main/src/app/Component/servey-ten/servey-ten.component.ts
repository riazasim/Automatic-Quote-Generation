import { Component, Output, Input, OnInit, EventEmitter } from "@angular/core";

@Component({
  selector: "app-servey-ten",
  templateUrl: "./servey-ten.component.html",
  styleUrls: ["./servey-ten.component.css"],
})
export class ServeyTenComponent implements OnInit {
  radioValue: any;
  turnstileOne: any;
  turnstileTwo: any;
  turnstileThree: any;

  @Output() changeServeyStep = new EventEmitter<any>();
  constructor() {
    const formValue = localStorage.getItem("turnstileTypeFrom");
    if (formValue) {
      this.radioValue = JSON.parse(formValue).text;
      if (this.radioValue === "One side Turnstile") {
        this.turnstileOne = JSON.parse(formValue).count;
        this.turnstileTwo = 0;
        this.turnstileThree = 0;
      } else if (this.radioValue === "Two side Turnstile") {
        this.turnstileTwo = JSON.parse(formValue).count;
        this.turnstileOne = 0;
        this.turnstileThree = 0;
      } else if (this.radioValue === "Swing Turnstile") {
        this.turnstileThree = JSON.parse(formValue).count;
        this.turnstileOne = 0;
        this.turnstileTwo = 0;
      }
    } else {
      this.radioValue = "One side Turnstile";
      this.turnstileOne = 0;
      this.turnstileTwo = 0;
      this.turnstileThree = 0;
    }
  }

  checkedRadio = (value: any) => {
    this.radioValue = value;
  };

  increaseTurnstile(value: any) {
    if (value === "One side Turnstile") {
      this.turnstileOne++;
    } else if (value === "Two side Turnstile") {
      this.turnstileTwo++;
    } else if (value === "Swing Turnstile") {
      this.turnstileThree++;
    }
  }

  decreaseTurnstile(value: any) {
    if (value === "One side Turnstile") {
      if (this.turnstileOne <= 0) {
        this.turnstileOne = 0;
      } else {
        this.turnstileOne--;
      }
    } else if (value === "Two side Turnstile") {
      if (this.turnstileTwo <= 0) {
        this.turnstileTwo = 0;
      } else {
        this.turnstileTwo--;
      }
    } else if (value === "Swing Turnstile") {
      if (this.turnstileThree <= 0) {
        this.turnstileThree = 0;
      } else {
        this.turnstileThree--;
      }
    }
  }

  nextButtonClick() {
    localStorage.setItem(
      "turnstileTypeFrom",
      JSON.stringify({ text: this.radioValue, count: 1 })
    );

    if (this.radioValue === "One side Turnstile") {
      localStorage.setItem(
        "turnstileTypeFrom",
        JSON.stringify({ text: this.radioValue, count: this.turnstileOne })
      );
    } else if (this.radioValue === "Two side Turnstile") {
      localStorage.setItem(
        "turnstileTypeFrom",
        JSON.stringify({ text: this.radioValue, count: this.turnstileTwo })
      );
    } else if (this.radioValue === "Swing Turnstile") {
      localStorage.setItem(
        "turnstileTypeFrom",
        JSON.stringify({ text: this.radioValue, count: this.turnstileThree })
      );
    }

    this.changeServeyStep.emit("serveytwelve");
  }
  goBack() {
    this.changeServeyStep.emit("serveyeleven");
  }
  ngOnInit(): void {}
}
