import { Component } from '@angular/core';
import {NgOptimizedImage, NgStyle} from "@angular/common";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgStyle
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
