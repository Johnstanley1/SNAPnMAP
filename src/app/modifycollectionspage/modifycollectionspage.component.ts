import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Collection, Photo} from "../../../services/model-service";

@Component({
  selector: 'app-modifycollectionspage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './modifycollectionspage.component.html',
  styleUrl: './modifycollectionspage.component.css'
})
export class ModifycollectionspageComponent {
  Min_Length = 5
  Max_length = 20
  date = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/

  builder = inject(FormBuilder)

  collections = new Collection("", "", [], "", "")

  collectionModifyForm = this.builder.group({
    _nameModify: ["",
      [Validators.required,
        Validators.minLength(this.Min_Length),
        Validators.maxLength(this.Max_length)]
    ],

    _thumbnailsModify: ["",
      [Validators.required]
    ],

    _dateModify: ["",
      [Validators.required,
        Validators.pattern(this.date)]
    ],

    _descriptionModify: ["",
      [Validators.required]
    ]
  })

  refName = this.collectionModifyForm.controls['_nameModify']
  refThumbnails = this.collectionModifyForm.controls['_thumbnailsModify']
  refDate = this.collectionModifyForm.controls['_dateModify']
  refDescription = this.collectionModifyForm.controls['_descriptionModify']

  onFileSelected($event: Event) {

  }
}
