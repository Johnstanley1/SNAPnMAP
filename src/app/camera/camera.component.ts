import {Component, inject} from '@angular/core';
import {CameraService} from "../../../services/camera.service";

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent {
  imgsrc: any
  cameraService = inject(CameraService)

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
}
