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
    return new Promise<any>((resolve, reject) => {
      let localData: any;
      let options = {
        quality: 50,
        sourceType: Camera.PictureSourceType.CAMERA,
        destinationType: Camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true
      }
      navigator.camera.getPicture((data: any) => {
        localData = "data:image/jpeg;base64," + data;
        resolve(localData)
      }, (e: any) => {
        console.log("CameraService: error in capture")
        reject(e)
      }, options)
    });
  }

  loadPhotoFromLibrary(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let localData: any;
      let options = {
        quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.DATA_URL
      }
      navigator.camera.getPicture((data: any) => {
        localData = "data:image/jpeg;base64," + data;
        resolve(localData)
      }, (e: any) => {
        console.log("CameraService: error in load from library")
        reject(e)
      }, options)

    });
  }

  constructor() { }
}
