import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, Router} from "@angular/router";
import {DALService} from "../../../services/DAL-service";
import {NgForOf, NgIf} from "@angular/common";
import {MaplocationComponent} from "../maplocation/maplocation.component";

@Component({
  selector: 'app-photopage',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './photopage.component.html',
  styleUrl: './photopage.component.css'
})
export class PhotopageComponent implements OnInit{
  sortData: string[] = ["A - Z", "Added", "Rating", "Favourite"];
  sortInt: number = 0;
  sortString: string = this.sortData[1]
  photos: any[] = [];
  isFavourite: boolean = false;

  loadPhoto = inject(DALService)

  // Pass the router through the constructor for usage later
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.loadPhotos()
  }

  changeSortValue_click() {
    // Increment sortInt and adjust sortString data:
    this.sortInt++;
    this.sortString = this.sortData[this.sortInt]

    // Check if sortInt is out of bounds:
    if (this.sortInt >= this.sortData.length) {
      this.sortInt = 0;
      this.sortString = this.sortData[this.sortInt]
    }

    // TODO: ADJUST THE CARDS ACCORDINGLY:

  }

  toggleFavourite(){
    this.isFavourite = !this.isFavourite;
    this.loadPhotos();
  }

  loadPhotos() {
    console.log("LOAD PHOTOS CALLED");
    if(!this.isFavourite){
      this.loadPhoto.selectAllPhotos().then((data) => {
        // Clear existing photos before pushing new ones (optional, depends on your requirements)
        this.photos = [];

        for (let i = 0; i < data.length; i++) {
          if (!data[i].hidden) {
            this.photos.push(data[i]);
          }
        }
      });
    }else{
      this.loadPhoto.selectAllPhotos().then((data) => {
        // Clear existing photos before pushing new ones (optional, depends on your requirements)
        this.photos = [];

        for (let i = 0; i < data.length; i++) {
          if (!data[i].hidden && data[i].favourite) {
            this.photos.push(data[i]);
          }
        }
      });
    }



      // // Get card group:
      // let cardGroup = document.getElementById('card-group')!;
      //
      // let htmlCode = ""
      //
      // if (data.length === 0) {
      //   htmlCode += `<p>No Photos Inside Storage 😭</p>`
      // } else {
      //   for (let i = 0; i < data.length; i++) {
      //     const card = data [i]
      //
      //     // CHECK IF THE PHOTO HAS HIDDEN ATTRIBUTE:
      //     if(!card.hidden){
      //       // Create new image and assign it the saved dataUrl:
      //       const img = new Image();
      //       //img.src = card.imageDataUrl;
      //
      //       htmlCode += `<div class="card">
      //                  <a href="/modifyPhoto" data-row-id="${card.id}" role="button">
      //                    <img src="${card.imageDataUrl}" class="card-img-top" alt="Photo">
      //                    <p>${card.name}</p>
      //                  </a>
      //                </div>`;
      //     }
      //   }
      // }
      //
      // cardGroup.innerHTML = htmlCode;


  }
}
