/*
Programming Mobile Apps
Authors: Johnstanley Ajagu,
         Will Smith
Student ID: 8864315,
            8657254
*/

import { Component, inject, OnInit } from '@angular/core';
import {RouterLink, Router} from "@angular/router";
import {DALService} from "../../../services/DAL-service";
import {NgForOf, NgIf} from "@angular/common";
import {InternetconnectionService} from "../../../services/internetconnection.service";

@Component({
  selector: 'app-collectionspage',
  standalone: true,
    imports: [
      RouterLink,
      NgForOf,
      NgIf
    ],
  templateUrl: './collectionspage.component.html',
  styleUrl: './collectionspage.component.css',
  providers: [InternetconnectionService]
})
export class CollectionspageComponent {

  // Initialize empty collections array:
  collections: any[] = [];
  isConnected: boolean = true
  // Inject DAL Service:
  loadCollection = inject(DALService);

  // Constructor
  constructor(private router: Router,
              private internetConnectionService: InternetconnectionService) { }

  ngOnInit(){
    // Load collections from Db:
    this.loadCollections();
    this.internetConnectionService.isConnected().subscribe(connected=>{
      this.isConnected = connected
    })
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
