import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../_services";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export class UpdateFitness {
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
  selector: "app-view-appointment",
  templateUrl: "./view-appointment.component.html",
})
export class ViewAppointmentComponent implements OnInit {
  appointmentsData: Array<Object>;
  modalStatus: Boolean = false;
  fitnessForm: FormGroup;
  numberValidationPattern: string = "[0-9]*";
  nameValidationPattern: string = "[a-zA-Z ]*";
  emailValidationPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  prevoiuslyStoredData: Object;
  idOfAppointment: string;

  constructor(
    private _userServices: UserService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getfitness();
    this.buildForm();
  }

  allowModal(modalStatus, idOfAppointementToEdit) {
    this.modalStatus = modalStatus;
    this.idOfAppointment = idOfAppointementToEdit;
    if (idOfAppointementToEdit !== -100) this.getPrevoiuslyFilledForm();
  }

  getfitness(): void {
    this._userServices.getfitnessdata().subscribe(
      (res) => {
        this.appointmentsData = res;
      },
      (err) => {
        alert("Error loading appointment's");
      }
    );
  }

  deleteAppointment(id) {
    const decesionToDeleteAppoinment = confirm("Delete appointment ?");
    if (decesionToDeleteAppoinment) {
      this._userServices.deleteFitnessData(id).subscribe(
        (response) => {
          alert("Appointment deleted");
          location.reload();
        },
        (err) => {
          alert("Error in deleting appointment");
        }
      );
    }
  }

  onSubmit() {
    if (this.fitnessForm.status === "VALID") {
      const { value: formData } = this.fitnessForm;
      this._userServices
        .updateFitnessData(
          this.idOfAppointment,
          new UpdateFitness(
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
            alert("Appointment updated successfully");
            this.allowModal(false, -100);
            location.reload();
          },
          (err) => {
            alert("Error updating appointment");
          }
        );
    } else {
      alert("Cannot submit incomplete form");
    }
  }

  buildForm() {
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

      trainerPreference: [null, [Validators.required]],
      physiotherapist: [null, [Validators.required]],
      packages: [null, [Validators.required]],
    });
  }

  getPrevoiuslyFilledForm() {
    this.buildForm();
    this._userServices.getfitnessdata(this.idOfAppointment).subscribe(
      (res) => {
        if (res) this.populateForm(res);
        else throw "No data from server";
      },
      (err) => {
        alert("No such appointment found to edit");
      }
    );
  }

  populateForm(prevoiusData) {
    this.fitnessForm.setValue({
      firstname: prevoiusData.firstname,
      lastname: prevoiusData.lastname,
      age: prevoiusData.age,
      phonenumber: prevoiusData.phonenumber,
      pincode: prevoiusData.pincode,
      email: prevoiusData.email,
      streetaddress: prevoiusData.streetaddress,
      city: prevoiusData.city,
      state: prevoiusData.state,
      country: prevoiusData.country,
      paisa: prevoiusData.paisa,
      inr: prevoiusData.inr,
      trainerPreference: prevoiusData.trainerpreference,
      packages: prevoiusData.packages,
      physiotherapist: prevoiusData.physiotherapist,
    });
  }

  changePackage(selectedOptionOfPackage: string) {
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
}
