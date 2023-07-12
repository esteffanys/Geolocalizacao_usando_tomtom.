import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import tt from '@tomtom-international/web-sdk-maps';
import { Geolocation, Position } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule,FormsModule],
})
export class Tab3Page {
  map!: tt.Map;
  center = { lng: -71.1167, lat: 42.377 };
  reverseGeoCoded: any;
  query: string = 'pizza';
  searchResults: any;
  currentLocationAvailable: boolean = false;
  searchResultsAvailable: boolean = false;
  searchResultMarker: any;
  constructor(private http: HttpClient) {}
  ionViewDidEnter() {
    console.log('load');
    this.map = tt.map({
      key: 'qWs3zqjNxKQGEexONPwFAxRE5knGm6K7',
      container: 'map',
      center: this.center,
      zoom: 11,
    });
    let marker = new tt.Marker().setLngLat(this.center).addTo(this.map);
  }
  async getLocation() {
    const coordinates: Position = await Geolocation.getCurrentPosition();
    let marker2 = new tt.Marker({ color: 'green' })
      .setLngLat([coordinates.coords.longitude, coordinates.coords.latitude])
      .addTo(this.map);
    this.getAddress(coordinates.coords);
  }

  async getAddress(home: any) {
    const res: any = await this.http
      .get(
        `https://api.tomtom.com/search/2/reverseGeocode/${home.latitude}%2C${home.longitude}.json?key=qWs3zqjNxKQGEexONPwFAxRE5knGm6K7`
      )
      .toPromise();
    this.reverseGeoCoded =
      res.addresses[0].address.freeformAddress +
      ' ' +
      res.addresses[0].address.countryCodeISO3;
  }

  async search() {
    const coordinates: Position = await Geolocation.getCurrentPosition();
    const res: any = await this.http
      .get(
        `https://api.tomtom.com/search/2/search/${this.query}.json?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&key=qWs3zqjNxKQGEexONPwFAxRE5knGm6K7`
      )
      .toPromise();
    this.searchResults = res.results;
  }

  locateResult(place: any) {
    this.searchResultMarker = new tt.Marker({ color: 'orange' })
      .setLngLat([place.position.lon, place.position.lat])
      .addTo(this.map);
    this.map.setCenter({ lng: place.position.lon, lat: place.position.lat });
    this.map.setZoom(15);
  }
}
