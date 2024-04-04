import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-photopage',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './photopage.component.html',
  styleUrl: './photopage.component.css'
})
export class PhotopageComponent {

}
