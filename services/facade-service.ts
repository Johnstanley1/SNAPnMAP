import {DatabaseService} from "./database-service";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FacadeService{
    dbService = new DatabaseService()
    initDatabase() {
      this.dbService.createDatabase().then(()=>{
      console.log("Database created successfully")
    }).catch((e)=>{
      console.log("Database created successfully" + e.message)
    })

  }
}

