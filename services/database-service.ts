// Programming Mobile Apps
// Authors: Johnstanley Ajagu,
//          Will Smith
// Student ID: 8864315,
//             88*****
import {Photo} from "./model-service";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  db: any

  constructor() {
  }

  photoData = [
    {}
  ]

  collectionData = [
    {}
  ]

  tagData = [
    {}
  ]
  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("ImageCatalogueDB", 1)

      request.onerror = (event) => {
        // @ts-ignore
        this.db = event.target.result
        console.log("Error in creating database!");
        reject(event)
      }

      request.onsuccess = (event) => {
        // @ts-ignore
        this.db = event.target.result
        console.log("onSuccess() called!");
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        console.log("onupgradeneeded() called!");
        // @ts-ignore
        this.db = event.target.result

        const photoStore = this.db.createObjectStore("photos", {
          keyPath: "id",
          autoIncrement: true
        })

        const collectionStore = this.db.createObjectStore("collections", {
          keyPath: "id",
          autoIncrement: true
        })

        const tagStore = this.db.createObjectStore("tags", {
          keyPath: "id",
          autoIncrement: true
        })
      }
    })
  }

  initDatabase() {
    this.createDatabase().then((data)=>{
      console.log("Database created successfully" + data)
    }).catch((e)=>{
      console.log("Database created successfully" + e.message)
    })
  }
}



