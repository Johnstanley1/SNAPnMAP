import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Collection} from "../../../services/model-service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-addcollectionspage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './addcollectionspage.component.html',
  styleUrl: './addcollectionspage.component.css'
})
export class AddcollectionspageComponent {
  Min_Length = 5
  Max_length = 20
  date = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/

  builder = inject(FormBuilder)

  collections = new Collection("", "", [], "", "")

  collectionForm = this.builder.group({
    _name: ["",
      [Validators.required,
      Validators.minLength(this.Min_Length),
      Validators.maxLength(this.Max_length)]
    ],

    _thumbnails: ["",
      [Validators.required]
    ],

    _date: ["",
      [Validators.required,
      Validators.pattern(this.date)]
    ],

    _description: ["",
      [Validators.required]
    ]
  })

  refName = this.collectionForm.controls['_name']
  refThumbnails = this.collectionForm.controls['_thumbnails']
  refDate = this.collectionForm.controls['_date']
  refDescription = this.collectionForm.controls['_description']

  onFileSelected($event: Event) {

  }
}
