import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContactusService } from "../_services/contactus.service";
import { ThrowStmt } from '@angular/compiler';
export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) {}
}
@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  public obj: any = {};

  showModal: Boolean = false;
  modalMessage: string;
  modalTitle: string;


  constructor(
    private _contactUsService: ContactusService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      phonenumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      message: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.obj = { ...this.contactForm.value, ...this.obj };
    this.contactForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
      this.contactForm.value
    );
    if (this.contactForm.status === "VALID") {
      const contactUsData = new Contact(
        this.contactForm.value.firstname,
        this.contactForm.value.lastname,
        this.contactForm.value.phonenumber,
        this.contactForm.value.email,
        this.contactForm.value.message
      );
      this.contactdata.emit(contactUsData);

      this._contactUsService
        .postcontactdata({
          firstname: contactUsData.firstname,
          lastname: contactUsData.lastname,
          phonenumber: contactUsData.phonenumber,
          email: contactUsData.email,
          message: contactUsData.message,
        })
        .subscribe(
          (res) => {
            this.handleModal(false ,"Done", "Contact details submitted");
            this.contactForm.reset();
          },
          (err) => this.handleModal(false ,"Error","Unable to submit contact details")
        );
    }
  }

  handleModal(isHidden ,title = null, body = null){
      this.showModal = !isHidden;
      this.modalMessage = body;
      this.modalTitle = title;
  

  }
}
