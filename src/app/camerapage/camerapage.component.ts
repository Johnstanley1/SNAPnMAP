import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Photo} from "../../../services/model-service";
import {FacadeService} from "../../../services/facade-service";

@Component({
  selector: 'app-camerapage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './camerapage.component.html',
  styleUrl: './camerapage.component.css'
})
export class CamerapageComponent {
  imgsrc: any
  currentDate: string = new Date().toLocaleDateString("en-CA")

  photo = new Photo("", [], new Date(), new Date(), [], true, false, 2)

}
