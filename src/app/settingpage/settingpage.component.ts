/*
Programming Mobile Apps
Authors: Johnstanley Ajagu,
         Will Smith
Student ID: 8864315,
            8657254
*/

import {Component, inject, OnInit} from '@angular/core';
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

  // Password param:
  passwordSet: string = "Hidden Password Not Set";
  // Inject DAL:
  dal_service = inject(DALService)

  ngOnInit(): void {
    if (localStorage.getItem("Password") != null) {
      this.passwordSet = "Password Set";
    } else {
      this.passwordSet = "Password NOT Set";
    }
  }

  // Database functions:
  clearPhotos_click() {
    if (confirm("Are you Sure you want to Delete all Photos? 💔")) {
      this.dal_service
        .deleteAllPhotos()
        .then(() => {
          alert("All Photos Deleted Successfully.😢")
        })
        .catch((e) => {
          alert("Failed to Delete All Photos: " + e.message)
        });
    } else {
      alert("Didnt think so 😉.");
    }
  }

  clearCollections_click() {
    if (confirm("Are you Sure you want to Delete all Collections? 💔")) {
      this.dal_service
        .deleteAllCollections()
        .then(() => {
          alert("All Collections Deleted Successfully.😢")
        })
        .catch((e) => {
          alert("Failed to Delete All Collections: " + e.message)
        });
    } else {
      alert("Didnt think so 😉.");
    }
  }

  clearDatabase_click() {
    if (confirm("Are you Sure you want to Clear the Database? 💔")) {
      // Delete all tags:
      this.dal_service
        .deleteAllTags()
        .then(() => {})
        .catch((e) => {
          alert("Failed to Clear Database: " + e.message)
        });
      // Delete all photos:
      this.dal_service
        .deleteAllPhotos()
        .then(() => {})
        .catch((e) => {
          alert("Failed to Clear Database: " + e.message)
        });
      // Delete all Collections
      this.dal_service
        .deleteAllCollections()
        .then(() => {})
        .catch((e) => {
          alert("Failed to Clear Database: " + e.message)
        });
      alert("Database Cleared 😞")
    } else {
      alert("Didnt think so 😉.");
    }
  }

  setPassword_click() {
    // Check localstorage for a password:
    if (localStorage.getItem("Password") != null) {
      // If yes, prompt for reset:
      if (confirm("There is already a saved password, reset?")) {
        // Request old password:
        const oldPassword: any = prompt("Please Enter your OLD Password:");

        // Check if the password matches:
        if (oldPassword === localStorage.getItem("Password")) {

          // If they match, get new password:
          const password: any = prompt("Please Provide a Password:");
          const confirmPass: any = prompt("Please Confirm Your Password:");

          // Check if passwords match
          if (password === confirmPass) {
            localStorage.setItem("Password", password);
            this.passwordSet = "Password Set"
          }
          else{
            alert("Passwords don't match.");
          }
        }
        else{
          alert("Incorrect Password.");
        }
      }
    }
    else{

      // get new password
      const password: any = prompt("Please Provide a New Password:");
      const confirmPass: any = prompt("Please Confirm Your New Password:");

      // Check if match
      if (password === confirmPass) {

        // update password in localstorage
        localStorage.setItem("Password", password);

        // Update button:
        this.passwordSet = "Password Set"
      }
      else {
        alert("Passwords don't Match. Please Try Again.");
      }
    }
  }

  btnDeleteTag_click() {
    if (confirm("Are you Sure you want to Clear all Tags? 💔")){
      this.dal_service.deleteAllTags().then((data)=>{
        alert("tag removed ")
      }).catch((e)=>{
        console.log(e.message)
      })
    }
  }
}
