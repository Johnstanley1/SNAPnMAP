import {Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {Photo, Tag} from "../../../services/model-service";
import {DALService} from "../../../services/DAL-service";
import {MaplocationComponent} from "../maplocation/maplocation.component";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-modifyphotopage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    MaplocationComponent,
    NgIf
  ],
  templateUrl: './modifyphotopage.component.html',
  styleUrl: './modifyphotopage.component.css'
})
export class ModifyphotopageComponent implements OnInit{

  // Initialize params to hold selected PhotoID:
  photo: any;
  id: any;
  dataURL: any;

  // Get data from ActivatedRoute and Initialize a Router (to return back to photoList)
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Get ID passed by ActivatedRoute:
    this.route.queryParams.subscribe( (data) => {

      // Get id from activated route:
       this.id = +data['id'];

      // Get photo data from DAL:
      this.photo = this.dal_service
        .selectPhoto(this.id)
        .then( (data) => {

          // Assign data to photo:
          this.photo = data;

          // Apply data to the fields inside the form:
          this.modifyPhotoForm.get('_photoNameModify')?.setValue(this.photo.name);
          this.modifyPhotoForm.get('_modifyDateCaptured')?.setValue(this.photo.dateCaptured);
          this.modifyPhotoForm.get('_modifyDateAdded')?.setValue(this.photo.dateAdded);
          this.modifyPhotoForm.get('_modifyPhotoTag')?.setValue(this.photo.tag);
          this.modifyPhotoForm.get('_modifyFavouritePhoto')?.setValue(this.photo.favourite);
          this.modifyPhotoForm.get('_modifyHidePhoto')?.setValue(this.photo.hidden);

          // Assign data URL data:
          this.updateDataUrl(this.photo)
        })
        .catch( (e) => {
          alert("Failed to Retrieve Photo Data: " + e);
        });
    });
  };

  updateDataUrl(photo: Photo){
    this.dataURL = photo.imageDataUrl;
  }

  Min_Length = 5
  Max_length = 20

  builder = inject(FormBuilder)
  dal_service = inject(DALService)

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
      //const photoTagId = parseInt(photoTag);
      const favouritePhoto = this.modifyPhotoForm.value._modifyFavouritePhoto!;
      const hidePhoto = this.modifyPhotoForm.value._modifyHidePhoto!;

      const photo = new Photo(photoName, this.dataURL, dateCaptured, dateAdded,
        [photoTag], favouritePhoto, hidePhoto);

      // Update the photo id to match the passed id:
      photo.id = this.id;

      this.dal_service.updatePhoto(photo).then((data) => {
        alert("Photo added successfully");
        // Navigate back to photolist:
        this.router.navigate(["/photo"]);
      }).catch((e) => {
        alert("Photo add failed " + e.message);
      });
    }else{
      alert("Add photo form is invalid")
    }
  }

  btnDelete_click(){
        if(confirm("Are you Sure you want to Delete this Photo?")){
          // Delete Photo from DB
          this.dal_service
            .deletePhoto(this.photo)
            .then( () => {
              alert("Photo Deleted. ☹");
              // Route user back to photo list
              this.router.navigate(["/photo"]);
            })
            .catch( (e) => {
              alert("Failed to Delete Photo: " + e)
            })
        }
  }

  btnModifyTags_click() {
    const tag = this.modifyPhotoForm.value._modifyPhotoTag!
    const photoTag = new Tag(tag)
    if (tag == null){
      console.log("Please add tags")
    }else{
      this.dal_service
        .insertTag(photoTag)
        .then((data)=>{
          console.log("Tag added successfully " + data); })
        .catch((e)=>{
          alert("An Error Occurred When Inserting the Photo: " + e.message)
        })


    }
  }
}
