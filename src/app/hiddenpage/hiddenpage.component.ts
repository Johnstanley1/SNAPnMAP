import {Component, inject} from '@angular/core';
import {DALService} from "../../../services/DAL-service";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {InternetconnectionService} from "../../../services/internetconnection.service";


@Component({
  selector: 'app-photopage',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './hiddenpage.component.html',
  styleUrl: './hiddenpage.component.css',
  providers: [InternetconnectionService]
})


export class HiddenpageComponent {
  sortData: string[] = ["A - Z", "Added", "Rating", "Favourite"];
  sortInt: number = 0;
  sortString: string = this.sortData[1]
  photos: any[] = [];
  passwordValid: boolean = false;
  loadPhoto = inject(DALService)
  isConnected: boolean = true
  constructor(private internetConnectionService: InternetconnectionService) {
    this.internetConnectionService.isConnected().subscribe(connected=>{
      this.isConnected = connected
    })
  }

  ngOnInit(): void {

    // CHECK PASSWORD:
    if (localStorage.getItem("Password") === null) {
      alert("Please set a Password in Settings Before Using this Page!");
    }
    else{
      const password: any = prompt("Please Enter your Password:");

      if(password === localStorage.getItem("Password")){
        // Change flag:
        this.passwordValid = true;
        // Load Photos:
        this.loadPhotos();
      }
      else{
        const cardGroup: any = document.getElementById('deny');
        cardGroup.innerHTML = `<p>No Password, No Access. 😈</p>`
      }
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

      this.photos = [];

      for (let i = 0; i < data.length; i++) {
        // Only select hidden photos
        if (data[i].hidden) {
          this.photos.push(data[i]);
        }
      }
    }).catch((e) => {
      console.log(e.message)
    })
  }
}
