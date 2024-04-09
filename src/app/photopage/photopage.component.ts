import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {DALService} from "../../../services/DAL-service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-photopage',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './photopage.component.html',
  styleUrl: './photopage.component.css'
})
export class PhotopageComponent implements OnInit{
  sortData: string[] = ["A - Z", "Added", "Rating", "Favourite"];
  sortInt: number = 0;
  sortString: string = this.sortData[1]

  loadPhoto = inject(DALService)

  constructor() {

  }

  ngOnInit(): void {
      // this.loadPhotos()
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

  // loadPhotos() {
  //   this.loadPhoto.selectAllPhotos().then((data) => {
  //     let htmlCode = ""
  //
  //     if (data.length === 0) {
  //       htmlCode += `<p>No record found</p>`
  //     } else {
  //       for (let i = 0; i < data.length; i++) {
  //         const card = data [i]
  //
  //         htmlCode += `<div class="card">
  //                      <a [routerLink]="['/modifyPhoto', ${card.id}]">
  //                        <img src="${card.imageDataUrl}" class="card-img-top" alt="Photo">
  //                      </a>
  //                    </div>`;
  //       }
  //     }
  //
  //     // @ts-ignore
  //     document.getElementById("photoContainer").innerHTML = htmlCode;
  //
  //   }).catch((e) => {
  //     console.log(e.message)
  //   })
  // }
}
