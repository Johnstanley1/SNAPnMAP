import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Collection} from "../../../services/model-service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-addcollectionspage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './addcollectionspage.component.html',
  styleUrl: './addcollectionspage.component.css'
})
export class AddcollectionspageComponent {
  collection = new Collection("", "", [], "", "")


}
