import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Collection} from "../../../services/model-service";

@Component({
  selector: 'app-modifycollectionspage',
  standalone: true,
    imports: [
        FormsModule,
        JsonPipe
    ],
  templateUrl: './modifycollectionspage.component.html',
  styleUrl: './modifycollectionspage.component.css'
})
export class ModifycollectionspageComponent {
  collection = new Collection("Collection1", [],
    "", "Test Collection")
}
