import { Injectable } from '@angular/core';

// Declare constants:
declare const Camera: any;
declare const navigator: any;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  // **** WIP *****
  capturePhoto() : Promise<any> {
    // Return a new promise
    return new Promise<any>( (resolve, reject) => {
      let localData : any;
      let options = {
        quality: 50,
        sourceType: Camera.PictureSourceType.CAMERA,
        destinationType: Camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true
      };

      navigator.camera.getPicture()
    })
  }
  constructor() { }
}
