import {Component, inject} from '@angular/core';
import {DALService} from "../../../services/DAL-service";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-photopage',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './hiddenpage.component.html',
  styleUrl: './hiddenpage.component.css'
})


export class HiddenpageComponent {
  sortData: string[] = ["A - Z", "Added", "Rating", "Favourite"];
  sortInt: number = 0;
  sortString: string = this.sortData[1]

  loadPhoto = inject(DALService)

  constructor() {

  }

  ngOnInit(): void {

    if (localStorage.getItem("Password") === null) {
      alert("Please set a Password in Settings Before Using this Page!");
    }
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

  loadPhotos() {
    console.log("LOAD PHOTOS CALLED");
    this.loadPhoto.selectAllPhotos().then((data) => {

      // Get card group:
      const cardGroup = document.getElementById('card-group');

      let htmlCode = ""

      if (data.length === 0) {
        htmlCode += `<p>No Photos Inside Storage 😭</p>`
      } else {
        for (let i = 0; i < data.length; i++) {
          const card = data [i]

          // CHECK IF THE PHOTO HAS HIDDEN ATTRIBUTE:
          if(card.hidden){
            // Create new image and assign it the saved dataUrl:
            const img = new Image();
            img.src = card.imageDataUrl;

            htmlCode += `<div class="card">
                       <a [routerLink]="['/modifyPhoto', ${card.id}]">
                         <img src="${img.src}" class="card-img-top" alt="Photo">
                       </a>
                     </div>`;
          }
        }
      }

      // @ts-ignore
      cardGroup.innerHTML = htmlCode;

    }).catch((e) => {
      console.log(e.message)
    })
  }
}
