import {Facade} from "./facade-service";

export class Global{
  facadeService = new Facade();
  initDB(){
    this.facadeService.initDatabase()
  }
}

