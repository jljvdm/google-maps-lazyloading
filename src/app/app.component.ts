import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  apiLoaded: Observable<boolean>;

  title = 'googlemaps-lazyloading';


  zoom = 12;
  center: any = {lat: 52.5125, lng: 6.09444}; //
  display: any = {lat: 52.5125, lng: 6.09444};


  constructor(httpClient: HttpClient) {
    //this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE', 'callback')
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }


  moveMap(event: google.maps.MapMouseEvent) {
    if ( event.latLng ) {
      this.center = new google.maps.LatLng(event.latLng.toJSON());
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if ( event.latLng){
      this.display = event.latLng.toJSON();
    }
  }
}
