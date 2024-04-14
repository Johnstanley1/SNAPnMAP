// Programming Mobile Apps
// Authors: Johnstanley Ajagu,
//          Will Smith
// Student ID: 8864315,
//             8657254

import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgForOf} from "@angular/common";
import {ModelService, Photo, Tag} from "../../../services/model-service";
import {DALService} from "../../../services/DAL-service";
import {CameraComponent} from "../camera/camera.component";
import {MaplocationComponent} from "../maplocation/maplocation.component";
import { ActivatedRoute, Router } from "@angular/router";


// Components
@Component({
  selector: 'app-camerapage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    NgForOf,
    CameraComponent,
    MaplocationComponent,
  ],
  templateUrl: './camerapage.component.html',
  styleUrl: './camerapage.component.css'
})
export class CamerapageComponent {

  // Initialize router within constructor:
  constructor(private router: Router) { }

  tags: string[] = []
  Min_Length = 5
  Max_length = 20
  image: any

  // Inject builder and DAL
  builder = inject(FormBuilder)
  dal_service = inject(DALService)

  // Initialize mapLocation (for getting lat/lon)
  mapLocation = new MaplocationComponent()

  // Validation
  tagForm = this.builder.group({
    _tagName: ["",
      [Validators.required,
        Validators.maxLength(this.Max_length)]
    ],
  })

  photoForm = this.builder.group({
    _photoName: ["",
      [Validators.required,
        Validators.minLength(this.Min_Length),
        Validators.maxLength(this.Max_length)]
    ],

    _dateCaptured: ["",
      [Validators.required],
    ],

    _dateAdded: ["",
      [Validators.required],
    ],

    _favouritePhoto: [false],
    _hidePhoto: [false]

  })

  // Get data:
  refName = this.photoForm.controls['_photoName']
  refDateCaptured = this.photoForm.controls['_dateCaptured']
  refDateAdded = this.photoForm.controls['_dateAdded']
  refTag = this.tagForm.controls['_tagName']

  // On 'Add' Click:
  btnAdd_click() {
    // Check Validation
    if (this.photoForm.valid) {
      console.log("Add photo form valid")


      // Get data:
      const tag: string[] = this.tags
      const photoName = this.photoForm.value._photoName!;
      const dateCaptured = this.photoForm.value._dateCaptured!;
      const dateAdded = this.photoForm.value._dateAdded!;
      const favouritePhoto = this.photoForm.value._favouritePhoto!;
      const hidePhoto = this.photoForm.value._hidePhoto!;
      const lat = this.mapLocation.getLat();
      const lon = this.mapLocation.getLon();

      // Before creating photo, we need to get the image passed, and convert it to DataURL
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

      // Create new photo object, pass data:
      const photo = new Photo(photoName, dataUrl, dateCaptured, dateAdded,
        tag, favouritePhoto, hidePhoto, lon, lat)

      // Insert photo into DB:
      this.dal_service
        .insertPhoto(photo)
        .then((data) => {
        alert("Photo added successfully");
        // Route depending on photo properties:
          if(photo.hidden){
            //if photo is hidden, route back to hidden page:
            this.router.navigate(["/hidden"]);
          }
          else{
            // Otherwise, route back to main photo list page:
            this.router.navigate(["/photo"]);
          }
      })
        .catch((e) => {
        alert("Photo add failed " + e.message);
      });
    } else {
      alert("Add photo form is invalid")
    }
  }

  btnAddTags_click() {

  }

  btnAddTag_click() {
    const tag = this.tagForm.value._tagName!
    const photoTag = new Tag(tag)
    if (this.tagForm.invalid) {
      alert("Please add tags")
    } else {
      this.dal_service.insertTag(photoTag).then((data) => {
        this.tags.push(tag)
      }).catch((e) => {
        console.log(e.message)
      })
    }
  }

  deleteTag(i: number) {
      this.tags.splice(i,1)
  }
}
