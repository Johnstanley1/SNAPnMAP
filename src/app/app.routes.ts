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
import {PhotopageComponent} from "./photopage/photopage.component";
import {AuthorspageComponent} from "./authorspage/authorspage.component";
import {AddcollectionspageComponent} from "./addcollectionspage/addcollectionspage.component";
import {ErrorpageComponent} from "./errorpage/errorpage.component";
import {ModifycollectionspageComponent} from "./modifycollectionspage/modifycollectionspage.component";
import {ModifyphotopageComponent} from "./modifyphotopage/modifyphotopage.component";

export const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "photo", component: PhotopageComponent},
  {path: "modifyPhoto", component: ModifyphotopageComponent},
  {path: "setting", component: SettingpageComponent},
  {path: "collections", component: CollectionspageComponent},
  {path: "camera", component: CamerapageComponent},
  {path: "hidden", component: HiddenpageComponent},
  {path: "authors", component: AuthorspageComponent},
  {path: "addCollections", component: AddcollectionspageComponent},
  {path: "modifyCollections", component: ModifycollectionspageComponent},
  {path: "error", component: ErrorpageComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "*", component: ErrorpageComponent}
];
