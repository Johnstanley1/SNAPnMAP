import { Component, inject, OnInit } from '@angular/core';
import {RouterLink, Router} from "@angular/router";
import {DALService} from "../../../services/DAL-service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-collectionspage',
  standalone: true,
    imports: [
      RouterLink,
      NgForOf,
      NgIf
    ],
  templateUrl: './collectionspage.component.html',
  styleUrl: './collectionspage.component.css'
})
export class CollectionspageComponent {

  // Initialize empty collections array:
  collections: any[] = [];

  // Inject DAL Service:
  loadCollection = inject(DALService);

  // Constructor
  constructor(private router: Router) { }

  ngOnInit(){
    // Load collections from Db:
    this.loadCollections();
  }

  loadCollections(){
    this.loadCollection
      .selectAllCollections()
      .then( (data) => {
        // Initialize collections with data received:
        this.collections = data;
      })
  }
}
