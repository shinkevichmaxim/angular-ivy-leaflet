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
  private marker = new Array(); // массив с маркерами
  private position; // здесь храним json с начальными метками

  private initMap(): void {
    this.map = L.map('map', {
      center: [39, -98],

      zoom: 5,
    });


    // массив базовых слоев - тайлы
    const tiles = {  
    "OSM1" : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, minZoom: 3,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',}),

    "OSM2" : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, minZoom: 3,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',})
  };

  // массив доп инфы - слои с метками по типу авто или самолеты , активны  или неактивны или зоны аэропортов
  var overlays = {};


  L.control.layers(tiles, overlays).addTo(this.map);


    tiles["OSM1"].addTo(this.map);



    
  }




/*

var baselayers = {
    "Tile Layer 1": L.tileLayer( ),
    "Tile Layer 2": L.tileLayer(),
    "Tile Layer 3": L.tileLayer( )
};

var overlays = {};

L.control.layers(baselayers, overlays).addTo(map);

baseLayers["Tile Layer 1"].addTo(map);

*/


  constructor(private posServ: PositionService) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  getPosition() {

    
    this.position = this.posServ.getPosition();

    for (const tracker of this.position) {
      if (!(tracker.id in this.marker)) {// если маркера нет то создаем

       var greenIcon = L.icon({
          iconUrl:'./leaf-green.png',
          shadowUrl:'./leaf-sahdow.png',
         
          iconSize:[38,95],
          shadowSize:[50,64],
           iconAnchor: [22,94], // Точка отметки находится на значке
          shadowAnchor:[4,62],
          popupAnchor:[-3,-76]
        });

        this.marker[tracker.id] = new L.marker([
          tracker.lat,
          tracker.lng,
          tracker.alt,
        ], {icon:greenIcon, draggable: true});

        //console.log(tracker.lat);
        this.marker[tracker.id].addTo(this.map);
        //this.map.addLayer(this.marker[tracker.id]);
        this.marker[tracker.id].bindPopup('<b>'+String(tracker.id)+'</b> ----',{closeOnClick:false,autoClose: false}).openPopup(); // разобраться с popup
/*Let me quote the Leaflet documentation on L.Popup:

Used to open popups in certain places of the map. Use Map.openPopup to open popups while making sure that only one popup is open at one time (recommended for usability), or use Map.addLayer to open as many as you want.

In order to open several popups, instantiate them using L.popup(latlng, options), then .addTo(map) them.
*/

      }
else{//иначе перемещаем его и рисуем линию
                          // положение с прошлого шага         новое положение
  var line = L.polyline([this.marker[tracker.id].getLatLng(), [tracker.lat,tracker.lng]], {color: 'red', weight: 1}).addTo(this.map);
  // а вторую точку брать из this.position

  this.marker[tracker.id].setLatLng([
    tracker.lat+ Math.random(),
    tracker.lng+ Math.random(),
    tracker.alt,   ]);

   


//var line = L.polyline([marker_a.getLatLng(), marker_b.getLatLng()], {color: 'red', weight: 1}).addTo(map);
 
 console.log(this.marker[tracker.id].getLatLng());

}

//var lline = L.polyline([oldMarker[5].getLatLng(), this.marker[5].getLatLng()  ], {color: 'red', weight: 1}).addTo(this.map);

    }

    //console.log(this.posServ.getPosition()[0].id );
    /*
    this.marker[0].setLatLng([
      this.posServ.getPosition()[0].lat + 1,
      this.posServ.getPosition()[0].lng + 1,
    ]);
*/
    // this.marker.setLatLng( [ this.marker.getLatLng().lat +1  , -88.5795, 100] );

    //this.marker.bindPopup( String(this.marker.getLatLng().alt) );
    //this.marker.openPopup();
  }

  playPosition() {
    this.position = this.posServ.getPosition();
    // console.log(this.posServ.getPosition()[2].id );

    for (const user of this.position) {
      console.log(user.id);
    }
  }
}
