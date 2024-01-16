import { Component, Output, Input, OnInit, EventEmitter } from "@angular/core";
import {
  UntypedFormGroup,
  FormControl,
  Validators,
  UntypedFormBuilder,
} from "@angular/forms";
import { ServeyService } from "src/app/services/servey.service";

@Component({
  selector: "app-servey-twentythree",
  templateUrl: "./servey-twentythree.component.html",
  styleUrls: ["./servey-twentythree.component.css"],
})
export class ServeyTwentythreeComponent implements OnInit {
  radioValue: any;
  allFormsData: any;
  qouteForm: any;
  access_pointArray: any;
  AvailableHardware: any;
  turnstileTypeFrom: any;
  pedestrianAccess2: any;
  VehicleAccessForm: any;
  TriggerServeyForm: any;
  ReadingdeviceForm: any;
  CheckinLPRCamera: any;
  CheckOutLPRCamera: any;
  LPRLicenseForm: any;
  applyPedestrianProfile: any;
  applyVehicleProfile: any;
  laresIntegrationForm: any;
  QouteDeliveryForm: UntypedFormGroup;
  private formSumitAttempt: boolean;
  submitingForm: any;
  errorMessage: any;
  showErrorMessage: any;
  @Output() changeServeyStep = new EventEmitter<any>();
  constructor(
    private serveyService: ServeyService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.showErrorMessage = false;
    this.submitingForm = false;
    const qouteForm = localStorage.getItem("qouteForm");
    const access_pointArray = localStorage.getItem("accesspointArrayForm");
    const AvailableHardware = localStorage.getItem("AvailableHardware");
    const turnstileTypeFrom = localStorage.getItem("turnstileTypeFrom");
    const applyPedestrianProfile = localStorage.getItem(
      "applyPedestrianProfile"
    );
    const VehicleAccessForm = localStorage.getItem("VehicleAccessForm");
    const TriggerServeyForm = localStorage.getItem("TriggerServeyForm");
    const ReadingdeviceForm = localStorage.getItem("ReadingdeviceForm");
    const CheckinLPRCamera = localStorage.getItem("CheckinLPRCamera");
    const CheckOutLPRCamera = localStorage.getItem("CheckOutLPRCamera");
    const LPRLicenseForm = localStorage.getItem("LPRLicenseForm");
    const applyVehicleProfile = localStorage.getItem("applyVehicleProfile");
    const laresIntegrationForm = localStorage.getItem("laresIntegrationForm");
    if (applyVehicleProfile) {
      console.log("applyVehicleProfile", JSON.parse(applyVehicleProfile));
      this.applyVehicleProfile = JSON.parse(applyVehicleProfile);
    }
    if (LPRLicenseForm) {
      this.LPRLicenseForm = LPRLicenseForm;
    }
    if (CheckOutLPRCamera) {
      this.CheckOutLPRCamera = CheckOutLPRCamera;
    }
    if (CheckinLPRCamera) {
      this.CheckinLPRCamera = CheckinLPRCamera;
    }
    if (ReadingdeviceForm) {
      this.ReadingdeviceForm = JSON.parse(ReadingdeviceForm);
    }
    if (TriggerServeyForm) {
      this.TriggerServeyForm = JSON.parse(TriggerServeyForm);
    }
    if (VehicleAccessForm) {
      this.VehicleAccessForm = JSON.parse(VehicleAccessForm);
    }
    if (applyPedestrianProfile) {
      this.applyPedestrianProfile = JSON.parse(
        applyPedestrianProfile
      )?.accesspoints;
    }
    if (qouteForm) {
      this.qouteForm = JSON.parse(qouteForm);
    }
    if (access_pointArray) {
      this.access_pointArray = JSON.parse(access_pointArray)?.accesspoints;
    }
    if (AvailableHardware) {
      this.AvailableHardware = AvailableHardware;
    }
    if (turnstileTypeFrom) {
      this.turnstileTypeFrom = turnstileTypeFrom;
    }
    if (laresIntegrationForm) {
      this.laresIntegrationForm = JSON.parse(laresIntegrationForm)?.integration;
    }

    const formValue = localStorage.getItem("QouteDeliveryForm");
    this.formSumitAttempt = false;
    this.QouteDeliveryForm = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      mobile: [null, Validators.required],
    });

    this.allFormsData = {};
  }

  isFieldValid(field: string) {
    console.log("field", this.QouteDeliveryForm?.get(field)?.valid);
    return (
      (!this.QouteDeliveryForm?.get(field)?.valid &&
        this.QouteDeliveryForm?.get(field)?.touched) ||
      (this.QouteDeliveryForm?.get(field)?.untouched && this.formSumitAttempt)
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
    if (this.QouteDeliveryForm.valid) {
      this.submitingForm = true;
      this.showErrorMessage = false;
      const Data = {
        servey_type: "qoute",
        first_name: this.QouteDeliveryForm.value.first_name,
        last_name: this.QouteDeliveryForm.value.last_name,
        email: this.QouteDeliveryForm.value.email,
        mobile: this.QouteDeliveryForm.value.mobile,
        country: this.qouteForm.country,
        location_name: this.qouteForm?.locationName,
        city: this.qouteForm.city,
        location_type: this.qouteForm.type,
        access_point_array: [this.access_pointArray],
        available_hardware: this.AvailableHardware,
        available_integration: this.laresIntegrationForm,
        turnstile_array: [this.turnstileTypeFrom],
        pedestrian_profile_array: [this.applyPedestrianProfile],
        tigger_name: this.TriggerServeyForm.text,
        trigger_type: this.TriggerServeyForm.wantTobuyHardware,
        reading_device: this.ReadingdeviceForm.text,
        reading_device_type: this.ReadingdeviceForm.wantTobuyHardware,
        lpr_camera_entry_name: this.CheckinLPRCamera,
        lpr_camera_exit_name: this.CheckOutLPRCamera,
        lpr_license_name: this.LPRLicenseForm,
        lpr_entry_front_license: this.LPRLicenseForm,
        lpr_entry_rear_license: this.LPRLicenseForm,
        lpr_exit_front_license: this.LPRLicenseForm,
        lpr_exit_rear_license: this.LPRLicenseForm,
        physical_barrier: this.VehicleAccessForm.text,
        physical_barrier_type: this.VehicleAccessForm.wantTobuyHardware,
        vehicle_access_hardware_name: this.VehicleAccessForm.text,
        vehicle_access_hardware_type: this.VehicleAccessForm.wantTobuyHardware,
        vehicle_access_profile_array: [this.applyVehicleProfile],
      };
      console.log("Data", this.applyVehicleProfile);
      // localStorage.setItem(
      //   "QouteDeliveryForm",
      //   JSON.stringify(this.QouteDeliveryForm.value)
      // );

      this.serveyService.qouteApi(Data).subscribe(
        (res) => {
          this.submitingForm = false;

          this.changeServeyStep.emit("serveytwentyfour");
        },
        (err) => {
          debugger;
          this.errorMessage = err.error.title;
          this.showErrorMessage = true;
          this.submitingForm = false;
          console.log(err.error.title);
        }
      );
    }
  }

  goBack() {
    this.changeServeyStep.emit("serveytwentytwo");
  }
  checkedRadio = (value: any) => {
    this.radioValue = value;
  };

  ngOnInit(): void {}

  get first_name() {
    return this.QouteDeliveryForm.get("first_name");
  }

  get last_name() {
    return this.QouteDeliveryForm.get("last_name");
  }
  get email() {
    return this.QouteDeliveryForm.get("email");
  }
  get mobile() {
    return this.QouteDeliveryForm.get("mobile");
  }
}
