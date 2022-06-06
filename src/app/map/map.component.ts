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

    "Railway" : L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {maxZoom: 18, minZoom: 3,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenRailwayMap</a>',})
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


moveMarkers(){

  for (const tracker of this.position) {
    if (!(tracker.id in this.marker)) {// если маркера нет то создаем

     var greenIcon = L.icon({
        iconUrl:'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
        shadowUrl:'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',
       
        iconSize:[ 12, 21],
        shadowSize:[12, 21 ],
        iconAnchor: [ 6, 21 ], // Точка отметки находится на значке
        shadowAnchor:[6, 21],
        popupAnchor:[-3,-20]
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
  tracker.lat/*+ Math.random()*/,
  tracker.lng/*+ Math.random()*/,
  tracker.alt,   ]);


console.log(this.marker[tracker.id].getLatLng());

}
}



}

  getPosition() {

    
     this.posServ.getPosition().subscribe((data: any) => {this.position = data["marker"];
      this.moveMarkers(); });
     // надо добавить обработку ошибок и тд с выводдом в экран
  }


  playPosition() {
    
   
      setInterval(this.getPosition.bind(this) ,1500);

  }
}
