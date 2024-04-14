import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoserviceService {

  constructor() { }
  getCurrentLocation(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position: any) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      }, (e) => {
        reject({code: e.code, message: e.message})
      }, {
        timeout: 1000,
        maximumAge: 0,
        enableHighAccuracy: true
      });
    });
  }
}
