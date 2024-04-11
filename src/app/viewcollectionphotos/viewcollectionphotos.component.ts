import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DALService} from "../../../services/DAL-service";
import {Collection, Photo} from "../../../services/model-service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-viewcollectionphotos',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './viewcollectionphotos.component.html',
  styleUrl: './viewcollectionphotos.component.css'
})
export class ViewcollectionphotosComponent {

  dal_service = inject(DALService)
  collection: any;
  collectionPhotos: Photo[] = [];
  collectionName: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.queryParams.subscribe( (data) => {
      // Get id from route:
      const id = +data['id'];

      // Get the collection via ID:
      this.dal_service
        .selectCollection(id)
        .then( (data) => {
          // Assign the data to a variable:
          this.collection = data;
          this.collectionPhotos = data.photos;
          this.collectionName = data.collectionName;

        })
        .catch( (e) => {
          alert("Failed to Get Collection: " + e)
        })
    })
  }

  btnAddPhoto_click(){
    alert("Add Photo Clicked");
  }

  btnDelete_click(){
    alert("Delete Photo Clicked.")
  }

}
