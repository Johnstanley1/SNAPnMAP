import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgForOf} from "@angular/common";
import {ModelService, Photo, Tag} from "../../../services/model-service";
import {DALService} from "../../../services/DAL-service";
import {CameraComponent} from "../camera/camera.component";
import {MaplocationComponent} from "../maplocation/maplocation.component";


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
  constructor() {

  }
  tags: string[] = []
  Min_Length = 5
  Max_length = 20

  builder = inject(FormBuilder)

  dal_service = inject(DALService)

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

    _favouritePhoto:[false],
    _hidePhoto:[false]

  })

  refName = this.photoForm.controls['_photoName']
  refDateCaptured = this.photoForm.controls['_dateCaptured']
  refDateAdded = this.photoForm.controls['_dateAdded']
  refTag = this.tagForm.controls['_tagName']

  btnAdd_click() {
    if (this.photoForm.valid) {
      console.log("Add photo form valid")

      const tag: string[] =  this.tags
      const photoName = this.photoForm.value._photoName!;
      const dateCaptured = this.photoForm.value._dateCaptured!;
      const dateAdded = this.photoForm.value._dateAdded!;
      const photoTagId = parseInt(this.tags.toString());
      const favouritePhoto = this.photoForm.value._favouritePhoto!;
      const hidePhoto = this.photoForm.value._hidePhoto!;

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
      console.log("Data Url: " + dataUrl );

      const photo = new Photo(photoName, dataUrl, dateCaptured, dateAdded,
        tag, favouritePhoto, hidePhoto, photoTagId)

      this.dal_service.insertPhoto(photo).then((data) => {
        alert("Photo added successfully: " + tag);
        alert("Data URL: " + tag);
      }).catch((e) => {
        alert("Photo add failed " + e.message);
      });
    }else{
      alert("Add photo form is invalid")
    }
  }

  btnAddTags_click() {

  }

  btnAddTag_click() {
    const tag = this.tagForm.value._tagName!
    const photoTag = new Tag(tag)
    if (this.tagForm.invalid){
      alert("Please add tags")
    }else{
      this.dal_service.insertTag(photoTag).then((data)=>{
        this.tags.push(tag)
        alert("Tag added successfully " + data);
      }).catch((e)=>{
        console.log(e.message)
      })
    }
  }

}
