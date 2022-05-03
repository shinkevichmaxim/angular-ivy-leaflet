import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import { PositionService } from '../position.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map;
  private marker= new Array();
  private position;// здесь храним json с начальными метками

    ;

  private initMap(): void {
    this.map = L.map('map', {
      center: [39, -98],

      zoom: -5,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,

        minZoom: 3,

        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    
  }

  constructor(private posServ: PositionService) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  getPosition() {


   

    this.position =  this.posServ.getPosition();
    // console.log(this.posServ.getPosition()[2].id );
 
    for(const tracker of this.position){
 
      
      this.marker[ tracker.id ] = new L.marker([tracker.lat, tracker.lng, tracker.alt]);

     console.log(tracker.lat);
     this.marker[tracker.id].addTo(this.map);
     this.marker[tracker.id].bindPopup(String(tracker.id));
     
 }





    //console.log(this.posServ.getPosition()[0].id );

    this.marker[0].setLatLng([
      this.posServ.getPosition()[0].lat + 1,
      this.posServ.getPosition()[0].lng + 1,
    ]);

    // this.marker.setLatLng( [ this.marker.getLatLng().lat +1  , -88.5795, 100] );

    //this.marker.bindPopup( String(this.marker.getLatLng().alt) );
    //this.marker.openPopup();
  }

  playPosition() {

    this.position =  this.posServ.getPosition();
   // console.log(this.posServ.getPosition()[2].id );

   for(const user of this.position){

    console.log(user.id);
    
}

  }
}
