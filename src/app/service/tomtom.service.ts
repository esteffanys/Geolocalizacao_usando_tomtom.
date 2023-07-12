import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class TomtomService {
  query: string = 'pizza';
  constructor(private http: HttpClient) { }

  async getAddress(home:any){
    return await this.http
      .get(
        `https://api.tomtom.com/search/2/reverseGeocode/${home.latitude}%2C${home.longitude}.json?key=qWs3zqjNxKQGEexONPwFAxRE5knGm6K7`
      );
  }

  async search(){
    const coordinates: Position = await Geolocation.getCurrentPosition();
    return await this.http
      .get(
        `https://api.tomtom.com/search/2/search/${this.query}.json?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&key=qWs3zqjNxKQGEexONPwFAxRE5knGm6K7`
      );
  }
}
