import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../_services/";

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) {}
}

@Component({
  selector: "app-place-fitness-trainer-appointment",
  templateUrl: "./place-fitness-trainer-appointment.component.html",
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  formTitle = "Place appointment";
  fitnessForm: FormGroup;

  numberValidationPattern: string = "[0-9]*";
  nameValidationPattern: string = "[a-zA-Z ]*";
  emailValidationPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.fitnessForm = this._formBuilder.group({
      firstname: [
        null,
        [Validators.required, Validators.pattern(this.nameValidationPattern)],
      ],
      lastname: [
        null,
        [Validators.required, Validators.pattern(this.nameValidationPattern)],
      ],
      age: [
        null,
        [Validators.required, Validators.min(19), Validators.max(59)],
      ],
      phonenumber: [
        null,
        [
          Validators.required,
          Validators.pattern(this.numberValidationPattern),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      pincode: [
        null,
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
          Validators.pattern(this.numberValidationPattern),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.emailValidationPattern),
        ],
      ],
      streetaddress: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
      paisa: [null, [Validators.required]],
      inr: [null, [Validators.required]],
      physiotherapist: [null, [Validators.required]],
      trainerPreference: [null, [Validators.required]],
      packages: [null, [Validators.required]],
    });
  }

  changePackage(selectedOptionOfPackage) {
    let inrValueUpdated = 0;
    let paisaValueUpdated = 0;
    if (selectedOptionOfPackage === "Basic Training package") {
      inrValueUpdated = 10000;
      paisaValueUpdated = 25;
    } else if (
      selectedOptionOfPackage ===
      "Silver package conatins (Yoga + Basic Package)"
    ) {
      inrValueUpdated = 20000;
      paisaValueUpdated = 50;
    } else {
      inrValueUpdated = 30000;
      paisaValueUpdated = 0;
    }

    this.fitnessForm.patchValue({
      inr: inrValueUpdated,
      paisa: paisaValueUpdated,
    });
  }

  onSubmit() {
    if (this.fitnessForm.status === "VALID") {
      const { value: formData } = this.fitnessForm;
      this._userService
        .postfitnessdata(
          new Fitness(
            formData.inr,
            formData.paisa,
            formData.streetaddress,
            formData.city,
            formData.state,
            formData.country,
            formData.pincode,
            formData.phonenumber,
            formData.email,
            formData.firstname,
            formData.lastname,
            formData.age,
            formData.trainerPreference,
            formData.physiotherapist,
            formData.packages
          )
        )
        .subscribe(
          (res) => {
            alert("Form submitted successfully");
            this.fitnessForm.reset();
          },
          (err) => {
            alert("Error submitting form");
          }
        );
    } else {
      alert("Cannot submit incomplete form");
    }
  }
}
