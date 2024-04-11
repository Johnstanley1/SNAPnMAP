import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgForOf} from "@angular/common";
import {Photo} from "../../../services/model-service";
import {DALService} from "../../../services/DAL-service";
import {CameraComponent} from "../camera/camera.component";
import {MaplocationComponent} from "../maplocation/maplocation.component";
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-addphototocollectionpage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    NgForOf,
    CameraComponent,
    MaplocationComponent,
  ],
  templateUrl: './addphototocollectionpage.component.html',
  styleUrl: './addphototocollectionpage.component.css'
})
export class AddphototocollectionpageComponent {

  // Define variable to store id:
  id: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.queryParams.subscribe( (data) => {
      // Get id from route:
      this.id = +data['id'];
    })
  }

  Min_Length = 5
  Max_length = 20

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

  })

  refName = this.photoForm.controls['_photoName']
  refDateCaptured = this.photoForm.controls['_dateCaptured']
  refDateAdded = this.photoForm.controls['_dateAdded']

  btnAdd_click() {
    if (this.photoForm.valid) {
      console.log("Add photo form valid")

      const photoName = this.photoForm.value._photoName!;
      const dateCaptured = this.photoForm.value._dateCaptured!;
      const dateAdded = this.photoForm.value._dateAdded!;

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
        [], false, false, 0)

      this.dal_service.addPhotoToCollection(this.id, photo).then((data) => {
        alert("Photo added to Collection Successfully.");
      }).catch((e) => {
        alert("Photo add failed: " + e.message);
      });
    }else{
      alert("Add photo form is invalid")
    }
  }
}
