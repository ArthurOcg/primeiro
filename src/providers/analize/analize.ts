import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AnalizeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnalizeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AnalizeProvider Provider');
  }

  enviaImagem(img: any): Observable< any> {
    let headers = new HttpHeaders({'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'});
    headers.set("Content-Type","multipart/form-data");
    return this.http.post("http://127.0.0.1:5000/ui", img);
  }

}
