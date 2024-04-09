import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgForOf} from "@angular/common";
import {Photo, Tag} from "../../../services/model-service";
import {DALService} from "../../../services/DAL-service";
import {CameraComponent} from "../camera/camera.component";

@Component({
  selector: 'app-camerapage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    NgForOf,
    CameraComponent
  ],
  templateUrl: './camerapage.component.html',
  styleUrl: './camerapage.component.css'
})
export class CamerapageComponent {
  imgsrc: any
  Min_Length = 5
  Max_length = 20
  //date = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/
  // currentDate: string = new Date().toLocaleDateString("en-CA")

  builder = inject(FormBuilder)

  dal_service = inject(DALService)

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

    _photoTag: ["",
      [Validators.required]
    ],

    _favouritePhoto:[false],
    _hidePhoto:[false]

  })

  refName = this.photoForm.controls['_photoName']
  refDateCaptured = this.photoForm.controls['_dateCaptured']
  refDateAdded = this.photoForm.controls['_dateAdded']
  refTag = this.photoForm.controls['_photoTag']

  btnAdd_click() {
    if (this.photoForm.valid) {
      console.log("Add photo form valid")
      const photoName = this.photoForm.value._photoName!;
      const dateCaptured = this.photoForm.value._dateCaptured!;
      const dateAdded = this.photoForm.value._dateAdded!;
      const photoTag = this.photoForm.value._photoTag!;
      const photoTagId = parseInt(photoTag);
      const favouritePhoto = this.photoForm.value._favouritePhoto!;
      const hidePhoto = this.photoForm.value._hidePhoto!;

      const photo = new Photo(photoName, "", dateCaptured, dateAdded,
        [photoTag], favouritePhoto, hidePhoto, photoTagId)

      this.dal_service.insertPhoto(photo).then((data) => {
        alert("Photo added successfully");
      }).catch((e) => {
        alert("Photo add failed " + e.message);
      });
    }else{
      alert("Add photo form is invalid")
    }
  }

  btnAddTags_click() {
    const tag = this.photoForm.value._photoTag!
    const photoTag = new Tag(tag)
    if (tag == null){
      console.log("Please add tags")
    }else{
      this.dal_service.insertTag(photoTag).then((data)=>{
        console.log("Tag added successfully " + data);
      }).catch((e)=>{
        console.log(e.message)
      })
    }
  }
}
