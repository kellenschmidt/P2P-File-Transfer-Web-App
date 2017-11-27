import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  _apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getPeerByUrl(url: string): Observable<any> {
    let res = this.http.get(this._apiUrl + '/' + url);
    return res;
  }

  addPeer(peer: string, url: string): Observable<any> {
    console.log("addPeer method: " + peer + ":" + url);
    return this.http.post(this._apiUrl,
      {
        "peerid": peer,
        "url": url
      })
  }
}
