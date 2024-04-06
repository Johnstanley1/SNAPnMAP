import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-photopage',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './photopage.component.html',
  styleUrl: './photopage.component.css'
})
export class PhotopageComponent {
  sortData: string[] = ["A - Z", "Added", "Rating", "Favourite"];
  sortInt: number = 0;
  sortString : string = this.sortData[1]
  constructor() {

  }

  changeSortValue_click(){
    // Increment sortInt and adjust sortString data:
    this.sortInt++;
    this.sortString = this.sortData[this.sortInt]

    // Check if sortInt is out of bounds:
    if(this.sortInt >= this.sortData.length){
      this.sortInt = 0;
      this.sortString = this.sortData[this.sortInt]
    }

    // TODO: ADJUST THE CARDS ACCORDINGLY:
  }
}
