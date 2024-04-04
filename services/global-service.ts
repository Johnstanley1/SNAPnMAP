import {FacadeService} from "./facade-service";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService{
  facadeService = new FacadeService();
  initDB(){
    this.facadeService.initDatabase()
  }
}

