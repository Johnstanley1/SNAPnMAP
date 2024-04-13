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

  sortData: string[] = ["A - Z", "Added", "Captured"];
  orderData: string[] = ["Asc", "Dsc"];

  sortString: string = this.sortData[0];
  orderString: string = this.orderData[0];

  sortInt: number = 0;
  orderInt: number = 0;

  photos: any[] = [];
  isFavourite: boolean = false;
  favouriteString: string = "Showing All";

  loadPhoto = inject(DALService)

  // Pass the router through the constructor for usage later
  constructor(private router: Router) { }

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

    // ADJUST THE CARDS ACCORDINGLY:
    this.sortPhotos()
  }

  changeOrderValue_click(){
    // Increment orderInt and adjust string accordingly:
    this.orderInt++;
    this.orderString = this.orderData[this.orderInt];

    // Check if point is out of bounds (or going to be):
    if(this.orderInt >= this.orderData.length){
      this.orderInt = 0;
      this.orderString = this.orderData[this.orderInt];
    }

    // Adjust card according to data:
    this.sortPhotos();
  }

  sortPhotos() {
    // Run a simple comparison function to update the photo cards according to sort/order options:
    const comparePhotoData = (a: any, b: any): number => {
      // Check sort value:
      if (this.sortInt === 0) { // 0 = a - z ordering:
        if (a.name < b.name) return -1; // THIS ALSO TAKES CAPITALIZATION INTO ACCOUNT (A-Z will always be before a-z)
        if (a.name > b.name) return 1;
        return 0;
      } else if (this.sortInt === 1) { // 1 = Date Added
        if (a.dateAdded < b.dateAdded) return -1;
        if (a.dateAdded > b.dateAdded) return 1;
        return 0;
      } else if (this.sortInt === 2) { // 2 = Date Created
        if (a.dateCaptured < b.dateCaptured) return -1;
        if (a.dateCaptured > b.dateCaptured) return 1;
        return 0;
      }

      // Default return if the pointer is out of bounds:
      return 0;
    };

    // Handle sorting the array of photos:
    if (!this.isFavourite) {
      this.loadPhoto.selectAllPhotos().then((data) => {
        // Clear existing photos before pushing new ones
        this.photos = [];

        for (let i = 0; i < data.length; i++) {
          if (!data[i].hidden) {
            this.photos.push(data[i]);
          }
        }

        // Once looping ends, sort array:
        this.photos.sort((a: any, b: any) => {
          // Call comparison function
          let comparePhotos = comparePhotoData(a, b);

          // Check order data to determine ascending or descending:
          if (this.orderInt === 1) { // Check only if it equals DESCENDING (because it is automatically asc)
            comparePhotos *= -1;
          }
          return comparePhotos;
        });
      });
    }
    else {
      this.loadPhoto.selectAllPhotos().then((data) => {
        // Clear existing photos before pushing new ones (optional, depends on your requirements)
        this.photos = [];

        for (let i = 0; i < data.length; i++) {
          if (!data[i].hidden && data[i].favourite) {
            this.photos.push(data[i]);
          }
        }

        // Once looping ends, sort array:
        this.photos.sort((a: any, b: any) => {
          // Call comparison function
          let comparePhotos = comparePhotoData(a, b);

          // Check order data to determine ascending or descending:
          if (this.orderInt === 1) { // Check only if it equals DESCENDING (because it is automatically asc)
            comparePhotos *= -1;
          }
          return comparePhotos;
        });

      });

    }
  }

  toggleFavourite(){
    this.isFavourite = !this.isFavourite;
    if(this.isFavourite){
      this.favouriteString = "Showing Favourites"
    }else{
      this.favouriteString = "Showing All"
    }
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
  }
}
