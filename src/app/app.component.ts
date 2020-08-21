import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "angularSPA";
  logo_url = "https://purepng.com/public/uploads/large/purepng.com-s-health-icon-galaxy-s6symbolsiconssamsungapp-iconsgalaxy-s6-icons-721522597469oeqmy.png";
  constructor(private router: Router) {}
  landingpage() {
    this.router.navigateByUrl("landing-page");
  }
  placeAppointment() {
    this.router.navigateByUrl("place-fitness-trainer-appointment");
  }
  viewAppointment() {
    this.router.navigateByUrl("view-appointment");
  }
  contactUspage() {
    this.router.navigateByUrl("contact-us");
  }
}

