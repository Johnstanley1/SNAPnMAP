import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DALService} from "../../../services/DAL-service";

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

  // Inject DAL:
  dal_service = inject(DALService)

  // Database functions:
  clearPhotos_click(){
    if(confirm("Are you Sure you want to Delete all Photos? 💔")){
      this.dal_service
        .deleteAllPhotos()
        .then( () => {
          alert("All Photos Deleted Successfully.😢")
        })
        .catch( (e) => {
          alert("Failed to Delete All Photos: " + e.message)
        });
    }else{
      alert("Didnt think so 😉.");
    }
  }

  clearCollections_click(){
    if(confirm("Are you Sure you want to Delete all Collections? 💔")){
      this.dal_service
        .deleteAllPhotos()
        .then( () => {
          alert("All Collections Deleted Successfully.😢")
        })
        .catch( (e) => {
          alert("Failed to Delete All Collections: " + e.message)
        });
    }else{
      alert("Didnt think so 😉.");
    }
  }

  clearDatabase_click(){
    if(confirm("Are you Sure you want to Clear the Database? 💔")){
      this.dal_service
        .deleteAllPhotos()
        .then( () => {
          alert("Database Cleared Successfully.😢")
        })
        .catch( (e) => {
          alert("Failed to Clear Database: " + e.message)
        });
    }else{
      alert("Didnt think so 😉.");
    }
  }

  setPassword_click(){
    prompt("Please Provide a Password:");
  }


}
