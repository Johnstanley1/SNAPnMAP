/*
Programming Mobile Apps
Authors: Johnstanley Ajagu,
         Will Smith
Student ID: 8864315,
            8657254
*/

import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Collection} from "../../../services/model-service";
import {JsonPipe} from "@angular/common";
import {CameraComponent} from "../camera/camera.component";
import {DALService} from "../../../services/DAL-service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addcollectionspage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    CameraComponent
  ],
  templateUrl: './addcollectionspage.component.html',
  styleUrl: './addcollectionspage.component.css'
})
export class AddcollectionspageComponent {

  constructor( private router: Router) { }

  Min_Length = 5
  Max_length = 20
  date = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/

  builder = inject(FormBuilder)

  dal_service = inject(DALService)

  collectionForm = this.builder.group({
    _name: ["",
      [Validators.required,
      Validators.minLength(this.Min_Length),
      Validators.maxLength(this.Max_length)]
    ],

    _date: ["",
      [Validators.required]
    ],

    _description: ["",
      [Validators.required]
    ]
  })

  refName = this.collectionForm.controls['_name']
  refDate = this.collectionForm.controls['_date']
  refDescription = this.collectionForm.controls['_description']

  addCollection_click(){

    if(this.collectionForm.valid){
      console.log("[AddCollection.ts] Form Valid.");

      const collectionName: any = this.collectionForm.value._name;
      const collectionDate: any = this.collectionForm.value._date;
      const collectionDescription: any = this.collectionForm.value._description;

      // Before creating collection, we need to get the image passed, and convert it to DataURL
      const image: any = document.getElementById('imageSource');

      // Create a canvas for the image:
      const canvas: any = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Assign dimensions:
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image
      context.drawImage(image, 0, 0, image.width, image.height);

      // Convert to dataURL:
      const dataUrl = canvas.toDataURL('image/png');

      // Assign values to new collection object:
      const collection: Collection = new Collection(collectionName, dataUrl, [], collectionDate, collectionDescription);

      // Add to DB:
      this.dal_service
        .insertCollection(collection)
        .then( (data) => {
          alert("Collection Added Successfully");
          // Route back to collections list page:
          this.router.navigate(["/collections"]);
        })
        .catch( (e) => {
          alert("An Error Occurred Attempting to Insert Collection: " + e.message);
        });

    }
    else{
      alert("Form is not Valid.")
    }


  }
}
