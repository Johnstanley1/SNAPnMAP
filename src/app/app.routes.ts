// Programming Mobile Apps
// Authors: Johnstanley Ajagu,
//          Will Smith
// Student ID: 8864315,
//             88*****

import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AboutpageComponent} from "./aboutpage/aboutpage.component";

export const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "about", component: AboutpageComponent},
];
