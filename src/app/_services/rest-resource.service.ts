import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";

@Injectable({
  providedIn: "root",
})
export class RestResource {
  BaseUrl = "http://localhost:6565/";
  constructor() {}

  getHeaders() {
    return {
      headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
    };
  }
}
