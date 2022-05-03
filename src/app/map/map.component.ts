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
  private route;

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


    var LamMarker  = L.marker([39, -98, 100]);
    this.marker.push(LamMarker);

    this.marker[0].addTo(this.map);
    this.marker[0].bindPopup('I am raketa');


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

    this.route =  this.posServ.getPosition();
   // console.log(this.posServ.getPosition()[2].id );

   for(const user of this.route){

    console.log(user.id);
    
}

  }
}
