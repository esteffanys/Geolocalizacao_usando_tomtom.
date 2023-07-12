import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import tt from '@tomtom-international/web-sdk-maps';
import { Geolocation, Position } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ExploreContainerComponent,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
})
export class Tab2Page {
  input: any;
  latitute: any;
  longetude: any;
  map!: any;
  result!: any;
  searchResultMarker!: any;
  reverseGeoCoded!: any;
  constructor(private http: HttpClient) {
    this.map = tt.map({
      key: 'qWs3zqjNxKQGEexONPwFAxRE5knGm6K7',
      container: 'map',
      center: new tt.LngLat(-35, -5),
      zoom: 11,
    });
    let marker = new tt.Marker()
      .setLngLat(new tt.LngLat(-35, -5))
      .addTo(this.map);
    this.input = 'Pizza';
  }

  async geolocation() {
    // await Geolocation.requestPermissions();
    const coordinates = await Geolocation.getCurrentPosition();
    // this.latitute = coordinates.coords.latitude;
    // this.longetude = coordinates.coords.longitude;
    let marker2 = new tt.Marker({ color: 'green' })
      .setLngLat([coordinates.coords.longitude, coordinates.coords.latitude])
      .addTo(this.map);
    this.getAddress(coordinates.coords);
  }

  async getAddress(currentLocation: any) {
    const res: any = await this.http
      .get(
        `https://api.tomtom.com/search/2/reverseGeocode/${currentLocation.latitude}%2C${currentLocation.longitude}.json?key=qWs3zqjNxKQGEexONPwFAxRE5knGm6K7`
      )
      .toPromise();
    this.reverseGeoCoded =
      res.addresses[0].address.freeformAddress +
      ' ' +
      res.addresses[0].address.countryCodeISO3;
  }

  async search(query: any) {
    const coordinates: Position = await Geolocation.getCurrentPosition();
    const res: any = await this.http
      .get(
        `https://api.tomtom.com/search/2/search/${query}.json?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&key=qWs3zqjNxKQGEexONPwFAxRE5knGm6K7`
      )
      .toPromise();
    this.result = res.results;
  }

  locateResult(place: any) {
    this.searchResultMarker = new tt.Marker({ color: 'orange' })
      .setLngLat([place.position.lon, place.position.lat])
      .addTo(this.map);
    this.map.setCenter({ lng: place.position.lon, lat: place.position.lat });
    this.map.setZoom(15);
  }
}
