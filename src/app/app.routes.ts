// Programming Mobile Apps
// Authors: Johnstanley Ajagu,
//          Will Smith
// Student ID: 8864315,
//             88*****

import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {SettingpageComponent} from "./settingpage/settingpage.component";
import {CollectionspageComponent} from "./collectionspage/collectionspage.component";
import {CamerapageComponent} from "./camerapage/camerapage.component";
import {HiddenpageComponent} from "./hiddenpage/hiddenpage.component";

export const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "setting", component: SettingpageComponent},
  {path: "collections", component: CollectionspageComponent},
  {path: "camera", component: CamerapageComponent},
  {path: "hidden", component: HiddenpageComponent}
];
