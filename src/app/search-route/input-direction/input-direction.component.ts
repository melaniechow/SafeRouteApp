import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MapService } from '../../map.service';
//import { } from "@types/googlemaps";

@Component({
  selector: 'app-input-direction',
  templateUrl: './input-direction.component.html',
  styleUrls: ['./input-direction.component.css']
})
export class InputDirectionComponent implements OnInit {
  startLoc:string
  endLoc:string;

  origin={address:'',lat:null,lng:null}
  destination={address:'',lat:null,lng:null}

  constructor(
    private service: MapService
  ) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.resetEndLoc();
    this.resetStartLoc();

    let start=form.value['startLoc'];
    let end=form.value['endLoc'];
    this.service.findPlaceFromText(start).subscribe((start)=>{
      if (start['status']==200){
        let googleRes=start['response'][0];
        this.origin.address=googleRes['formatted_address'];
        this.origin.lat=googleRes['geometry']['location']['lat'];
        this.origin.lng=googleRes['geometry']['location']['lng'];
        this.service.findPlaceFromText(end).subscribe((end)=>{
          if (end['status']==200){
            let googleRes=end['response'][0];
            this.destination.address=googleRes['formatted_address'];
            this.destination.lat=googleRes['geometry']['location']['lat'];
            this.destination.lng=googleRes['geometry']['location']['lng'];
          }
        });
      }
    });
  }

  resetStartLoc(){
    this.origin={address:'',lat:null,lng:null}
  }

  resetEndLoc(){
    this.destination={address:'',lat:null,lng:null}
  }

}
