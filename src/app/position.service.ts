import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

export interface Position {
  id: number;
  lat: number;
  lng: number;
  alt: number;
}

@Injectable({
  providedIn: 'root',
})
export class PositionService {

   //markers: Position[]=[];

   private mockCycle = 0;

  constructor(
    private http: HttpClient,
  ) { }

   getPosition( ): Observable<Position[]> {

    
    this.mockCycle = (this.mockCycle < 6)? (++this.mockCycle) : 0;

   console.log('='+this.mockCycle);
    //return this.http.get<Position>(this.positionUrl);
    // this.http.get(this.positionUrl).subscribe((data:any) => b= new Array(23,  32));
    // return b;
   
    //.subscribe((data: any) => this.markers = data["marker"]);
    
    //console.log(this.markers);
    //alert(stringify(markers));
    
    return this.http.get<Position[]>('assets/markers' + this.mockCycle + '.json');



   }

}