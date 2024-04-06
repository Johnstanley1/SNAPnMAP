import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Photo} from "../../../services/model-service";

@Component({
  selector: 'app-modifyphotopage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './modifyphotopage.component.html',
  styleUrl: './modifyphotopage.component.css'
})
export class ModifyphotopageComponent {
  imgsrc: any
  currentDate: string = new Date().toLocaleDateString("en-CA")

  photo = new Photo("", [], new Date(), new Date(), [], true, false, 2)

}
