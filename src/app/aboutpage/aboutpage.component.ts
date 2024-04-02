import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-aboutpage',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './aboutpage.component.html',
  styleUrl: './aboutpage.component.css'
})
export class AboutpageComponent {

}
