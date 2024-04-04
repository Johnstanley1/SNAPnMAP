/*
Programming Mobile Apps
Authors: Johnstanley Ajagu,
         Will Smith
Student ID: 8864315,
            88*****
*/

import {Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {GlobalService} from "../../services/global-service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = "Snap&Map";
  globalService = new GlobalService();
  constructor() {}

  ngOnInit(): void {
    this.globalService.initDB();
  }
}
