/*
Programming Mobile Apps
Authors: Johnstanley Ajagu,
         Will Smith
Student ID: 8864315,
            8657254
*/

import {Component, inject} from '@angular/core';
import {CameraService} from "../../../services/camera.service";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent {
  imgsrc: any
  cameraService = inject(CameraService)

  constructor() {

  }

  onCapturePhotoClick() {
    this.cameraService.capturePhoto().then(data=>{
      this.imgsrc = data
    }).catch(e=>{
      alert(e.toString())
    });
  }

  onLoadFromLibraryClick(){
    this.cameraService.loadPhotoFromLibrary().then(data=>{
      this.imgsrc = data
    }).catch(e=>{
      alert(e.toString())
    });
  }

  getCapture(){
    return this.onCapturePhotoClick()
  }

  getLoad(){
    return this.onLoadFromLibraryClick()
  }
}
