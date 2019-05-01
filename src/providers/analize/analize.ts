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

  enviaImagem(img: string): Observable<any> {
    let headers = new HttpHeaders({'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'});
    //headers.set("Content-Type","multipart/form-data");
    let url= 'https://jsonplaceholder.typicode.com/photos';
    let url2='https://0.0.0.0:5000/ui'
    let data = {"imagem": img}
    return this.http.post(url2, data, {headers: headers});
    /* return this.http.post(url2, img,  {
      headers: headers, 
      observe: 'response'
  }); */
  }

  outra(img: string): Observable<any> {
    let headers = new HttpHeaders({'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'});
    let url2='http://analize.herokuapp.com/analize'
    let data = {"imagem": img}
    return this.http.post(url2, data, {headers: headers});
  }
  

}
