import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Photo} from "../../../services/model-service";
import {FacadeService} from "../../../services/facade-service";

@Component({
  selector: 'app-camerapage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './camerapage.component.html',
  styleUrl: './camerapage.component.css'
})
export class CamerapageComponent {
  imgsrc: any
  Min_Length = 5
  Max_length = 20
  date = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/

  builder = inject(FormBuilder)

  currentDate: string = new Date().toLocaleDateString("en-CA")

  photo = new Photo("", [], new Date(), new Date(), [], true, false, 2)

  photoForm = this.builder.group({
    _photoName: ["",
      [Validators.required,
        Validators.minLength(this.Min_Length),
        Validators.maxLength(this.Max_length)]
    ],

    _dateAdded: ["",
      [Validators.required,
        Validators.pattern(this.date)]
    ],

    _photoTag: ["",
      [Validators.required]
    ]

  })

  refName = this.photoForm.controls['_photoName']
  refDateAdded = this.photoForm.controls['_dateAdded']
  refTag = this.photoForm.controls['_photoTag']

  btnAdd_click() {
    // // @ts-ignore
    // let Tag1 = document.getElementById("photoTag").value
    // let Tags1 = document.querySelector("#photoTags")
    //
    // // @ts-ignore
    // Tags1.innerHTML += `<ul>
    //                     <li>${Tag1}
    //                     <button type="button">Delete</button></li>
    //                     </ul>`
  }
}
