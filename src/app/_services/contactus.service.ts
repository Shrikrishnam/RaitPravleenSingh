import { Injectable } from "@angular/core";
import { Response, Headers, Http } from "@angular/http";
import { map, catchError } from "rxjs/operators";
import { RestResource } from "./rest-resource.service";

@Injectable({
  providedIn: "root",
})
export class ContactusService {
  constructor(private http: Http, private _restResource: RestResource) {}
  postcontactdata(data) {
    return this.http
      .post(
        this._restResource.BaseUrl + "allcontacts",
        data,
        this._restResource.getHeaders()
      )
      .pipe(
        map((response: Response) => response.json()),
        catchError((err, caught) => {
          throw err || "Unable to perform post request for contact us";
        })
      );
  }
}
