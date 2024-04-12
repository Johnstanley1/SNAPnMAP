import {Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {Photo, Tag, Collection} from "../../../services/model-service";
import {DALService} from "../../../services/DAL-service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";


@Component({
  selector: 'app-modifycollectionspage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    NgIf,
    RouterModule
  ],
  templateUrl: './modifycollectionspage.component.html',
  styleUrl: './modifycollectionspage.component.css'
})
export class ModifycollectionspageComponent {
  // Inject DAL and FormBuilder:
  dal_service = inject(DALService)
  builder = inject(FormBuilder)

  // Initialize Variables:
  Min_Length = 5
  Max_length = 20
  //date = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/
  id: any;
  collection: any;
  dataUrl: any;

  // Initialize router and activatedRoute inside constructor:
  constructor(private route: ActivatedRoute, private router: Router) { }

  // On Initialization Functionality:
  ngOnInit(){

    // Get id passed by ActivatedRoute:
    this.route.queryParams.subscribe( (data) => {

      // Get id:
      this.id = +data['id'];

      // Get collection from DAL:
      this.collection = this.dal_service
        .selectCollection(this.id)
        .then( (data) => {

          // Assign data to collection:
          this.collection = data;

          // Assign collection data to input fields:
          this.collectionModifyForm.get('_nameModify')?.setValue(this.collection.name);
          this.collectionModifyForm.get('_dateModify')?.setValue(this.collection.dateCreated);
          this.collectionModifyForm.get('_descriptionModify')?.setValue(this.collection.description);

          // Get DataURL and apply it to the thumbnail:
          this.updateDataUrl(this.collection);

        })
        .catch( (e) => {
          alert("Failed to Get Collection: " + e)
        })

    })
  }

  updateDataUrl(collection: Collection){
    this.dataUrl = collection.thumbnailPhoto;
  }

  collectionModifyForm = this.builder.group({
    _nameModify: ["",
      [Validators.required,
        Validators.minLength(this.Min_Length),
        Validators.maxLength(this.Max_length)]
    ],

    _dateModify: ["",
      [Validators.required]
    ],

    _descriptionModify: ["",
      [Validators.required]
    ]
  })

  refName = this.collectionModifyForm.controls['_nameModify']
  refDate = this.collectionModifyForm.controls['_dateModify']
  refDescription = this.collectionModifyForm.controls['_descriptionModify']

  btnUpdate_click() {
    if(this.collectionModifyForm.valid){

      // Get new values passed:
      const collectionName = this.collectionModifyForm.value._nameModify!;
      const collectionDate = this.collectionModifyForm.value._dateModify!;
      const collectionDescription = this.collectionModifyForm.value._descriptionModify!;

      // Create new collection, pass data:
      const collection = new Collection(collectionName, this.dataUrl, this.collection.photos, collectionDate, collectionDescription)

      // Update collection id to match passed id (just in case):
      collection.id = this.id;

      // Update collection inside DB:
      this.dal_service
        .updateCollection(collection)
        .then( () => {
          alert("Updated Collection.");
          // Route back to main page:
          this.router.navigate(["/collections"])
        })
        .catch( (e) => {
          alert("Failed to Update Collection: " + e);
        })

    }
  }

  btnDelete_click(){
    if(confirm("Are you Sure you Want to Delete this Collection?")){
      // Delete photo after confirm:
      this.dal_service
        .deleteCollection(this.collection)
        .then( () => {
          alert("Collection Deleted. 😭");
          // Route back to collection list
          this.router.navigate(["/collections"])
        })
        .catch( (e) => {
          alert("Failed to Delete Collection: " + e);
        })
    }
  }

  btnViewPhotos_click(){

  }
}
