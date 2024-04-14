/*
Programming Mobile Apps
Authors: Johnstanley Ajagu,
         Will Smith
Student ID: 8864315,
            8657254
*/

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


  constructor(private route: ActivatedRoute, private router: Router) { }

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

  btnDelete_click(index: any){

    if(confirm("Are you sure you want to delete this photo?")){
      this.dal_service
        .removePhotoFromCollection(this.collection.id, index)
        .then( (data) => {
          alert("Photo Deleted.");
          this.router.navigate(["/collections"]);
        })
        .catch( (e) => {
          alert("Failed to Delete Photo: " + e);
        })
    }
  }
}
