import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Photo, Tag} from "../../../services/model-service";
import {DALService} from "../../../services/DAL-service";
import {isEmpty} from "rxjs";

@Component({
  selector: 'app-modifyphotopage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './modifyphotopage.component.html',
  styleUrl: './modifyphotopage.component.css'
})
export class ModifyphotopageComponent {
  imgsrc: any
  Min_Length = 5
  Max_length = 20
  // date = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/
  // currentDate: string = new Date().toLocaleDateString("en-CA")

  builder = inject(FormBuilder)
  dal_service = inject(DALService)

  modifyPhoto = new Photo("", "", "", "", [], true, false, 2)

  modifyPhotoForm = this.builder.group({
    _photoNameModify: ["",
      [Validators.required,
        Validators.minLength(this.Min_Length),
        Validators.maxLength(this.Max_length)]
    ],

    _modifyDateCaptured: ["",
      [Validators.required]
    ],

    _modifyDateAdded: ["",
      [Validators.required]
    ],

    _modifyPhotoTag: ["",
      [Validators.required]
    ],

    _modifyFavouritePhoto: [false],
    _modifyHidePhoto: [false]

  })

  refModifyName = this.modifyPhotoForm.controls['_photoNameModify']
  refModifiedDateCaptured = this.modifyPhotoForm.controls['_modifyDateCaptured']
  refModifyDateAdded = this.modifyPhotoForm.controls['_modifyDateAdded']
  refModifyTag = this.modifyPhotoForm.controls['_modifyPhotoTag']


  btnModify_click() {
    if (this.modifyPhotoForm.valid) {
      console.log("Modify photo form valid")
      const photoName = this.modifyPhotoForm.value._photoNameModify!;
      const dateCaptured = this.modifyPhotoForm.value._modifyDateCaptured!;
      const dateAdded = this.modifyPhotoForm.value._modifyDateAdded!;
      const photoTag = this.modifyPhotoForm.value._modifyPhotoTag!;
      const photoTagId = parseInt(photoTag);
      const favouritePhoto = this.modifyPhotoForm.value._modifyFavouritePhoto!;
      const hidePhoto = this.modifyPhotoForm.value._modifyHidePhoto!;

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

  btnModifyTags_click() {
    const tag = this.modifyPhotoForm.value._modifyPhotoTag!
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
