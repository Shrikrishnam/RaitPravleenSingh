import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { map, catchError } from "rxjs/operators";
import { RestResource } from "./rest-resource.service";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: Http, private _restResource: RestResource) {}

  updateFitnessData(idOfAppointmentToUpdate, data) {
    return this.http
      .put(
        this._restResource.BaseUrl + "allfriends/" + idOfAppointmentToUpdate,
        data,
        this._restResource.getHeaders()
      )
      .pipe(
        map((response: Response) => response.json()),
        catchError((err, caught) => {
          throw err || "Unable to perform put request";
        })
      );
  }

  deleteFitnessData(idOfAppointmentToDelete) {
    return this.http
      .delete(
        this._restResource.BaseUrl + "allfriends/" + idOfAppointmentToDelete,
        this._restResource.getHeaders()
      )
      .pipe(
        map((response: Response) => response.json()),
        catchError((err, caught) => {
          throw err || "Unable to perform delete request";
        })
      );
  }

  postfitnessdata(data, endpoint = "allfriends") {
    return this.http
      .post(
        this._restResource.BaseUrl + endpoint,
        data,
        this._restResource.getHeaders()
      )
      .pipe(
        map((response: Response) => response.json()),
        catchError((err, caught) => {
          throw err || "Unable to perform post request";
        })
      );
  }

  getfitnessdata(id = null) {
    let getUrl = this._restResource.BaseUrl + "allfriends";

    if (id !== null) getUrl += `/${id}`;

    return this.http.get(getUrl, this._restResource.getHeaders()).pipe(
      map((response: Response) => response.json()),
      catchError((err, caught) => {
        throw err || "Unable to perform get request";
      })
    );
  }
}
