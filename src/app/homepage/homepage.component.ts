/*
Programming Mobile Apps
Authors: Johnstanley Ajagu,
         Will Smith
Student ID: 8864315,
            8657254
*/

import { Component } from '@angular/core';
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgStyle,
    RouterModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
