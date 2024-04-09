import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Photo} from "../../../services/model-service";

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
  date = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/
  currentDate: string = new Date().toLocaleDateString("en-CA")

  builder = inject(FormBuilder)

  modifyPhoto = new Photo("", "", new Date(), new Date(), [], true, false, 2)

  modifyPhotoForm = this.builder.group({
    _photoNameModify: ["",
      [Validators.required,
        Validators.minLength(this.Min_Length),
        Validators.maxLength(this.Max_length)]
    ],

    _modifyDateAdded: ["",
      [Validators.required,
        Validators.pattern(this.date)]
    ],

    _modifyPhotoTag: ["",
      [Validators.required]
    ]

  })

  refModifyName = this.modifyPhotoForm.controls['_photoNameModify']
  refModifyDateAdded = this.modifyPhotoForm.controls['_modifyDateAdded']
  refModifyTag = this.modifyPhotoForm.controls['_modifyPhotoTag']

  btnModify_click() {
    console.log("hello")
  }
}
