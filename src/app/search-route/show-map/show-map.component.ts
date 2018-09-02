import { Component, OnInit,ViewChild, Input } from '@angular/core';
import {} from '@types/googlemaps';
import {NgForm} from '@angular/forms'
import { MapService } from '../../map.service';

declare var MarkerClusterer;


@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.css']
})
export class ShowMapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  directionsService;
  directionsDisplay;
  
  routeResults:object={};
  routeArr:object[]=[];
  message='woo';

  displayRoutes:boolean=false;
  displayDirections:boolean=false;
  chosenRoute:object;

  @Input() origin : object;
  @Input() destination : object;
  @Input() travelType : string;

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
    //this.initMap();

    this.routeResults=null;
    this.routeArr=[];
    
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    let lat=this.origin['lat'];
    let lng=this.origin['lng'];
    var mapProp = {

      center: new google.maps.LatLng(lat, lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    //let layer=new google.maps.BicyclingLayer();
    //this.onChangeLayer(this.travelType);
    this.directionsDisplay.setMap(this.map);
    var request = {
      origin: this.origin['address'],
      destination: this.destination['address'],
      travelMode: this.travelType,
      provideRouteAlternatives: true,
      region:'NY'
    };
    this.onChangeLayer(this.travelType);
    let res;
    this.directionsService.route(request, (result, status) => {
      console.log(status);
      if (status == google.maps.DirectionsStatus.OK) {
        this.routeResults=result;
        this.directionsDisplay.setDirections(this.routeResults);
        this.routeArr=result['routes'];        
      }
    });

    //traffic/
    //var trafficLayer = new google.maps.TrafficLayer();
    //trafficLayer.setMap(this.map);
    //this.getRoutes(this.origin,this.destination)
  }

    onChangeLayer(type){
      let layer;
      if (type == 'DRIVING'){
        let layer=new google.maps.TrafficLayer();
        layer.setMap(this.map);
      }
      if (type == 'TRANSIT'){
        let layer=new google.maps.TransitLayer();
        layer.setMap(this.map);
      }
      if (type == 'BICYCLING'){
         let layer=new google.maps.BicyclingLayer();
         layer.setMap(this.map);
      }
    }

    //for some reason this displays route lol
    changeTo(str){
      let len=this.routeArr.length;
      for (let i =0; i< len; i++){
        if (this.routeArr[i]['summary'] == str){
          console.log("found!");
          this.routeResults['routes']=[this.routeArr[i]];
          this.chosenRoute=this.routeArr[i];
          this.directionsDisplay.setDirections(this.routeResults);
        }
      }

      console.log(this.routeArr);
      console.log(this.routeResults);
      
    }

    onDisplayDirections(){
      this.displayDirections=true;
      console.log(this.displayDirections);
    }

    onDisplayRoute(){
      this.displayRoutes=!this.displayRoutes;
      console.log(this.displayRoutes);
    }

}
