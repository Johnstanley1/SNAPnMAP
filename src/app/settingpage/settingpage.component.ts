import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-settingpage',
  standalone: true,
    imports: [
        NgOptimizedImage,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './settingpage.component.html',
  styleUrl: './settingpage.component.css'
})

export class SettingpageComponent {

}
