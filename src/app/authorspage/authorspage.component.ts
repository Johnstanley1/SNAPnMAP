import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-authorspage',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './authorspage.component.html',
  styleUrl: './authorspage.component.css'
})
export class AuthorspageComponent {

}
