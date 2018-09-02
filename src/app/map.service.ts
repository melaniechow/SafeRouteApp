import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  start=environment.start;


  constructor(
    private http: HttpClient
  ) { }

  findPlaceFromText(text){
    var arrTxt = text.split(" ");
    var text=arrTxt.join("-");
    return this.http.get(this.start+`api/getPlaceFromText/${text}`);
  }
}
