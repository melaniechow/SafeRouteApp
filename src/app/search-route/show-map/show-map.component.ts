import { Component, OnInit,ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.css']
})
export class ShowMapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  @Input() origin : object;
  @Input() destination : object;


  constructor() { }

  ngOnInit() {
    let lat=this.origin['lat'];
    let lng=this.origin['lng'];
    console.log(this.origin);
    var mapProp = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  setCenter(e:any){
    e.preventDefault();
    this.map.setCenter(new google.maps.LatLng(this.origin['lat'], this.origin['lng']));
  }

}
