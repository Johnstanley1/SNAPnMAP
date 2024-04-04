import {DatabaseService} from "./database-service";
export class Facade{
    dbService = new DatabaseService()
    initDatabase() {
      this.dbService.createDatabase().then(()=>{
      console.log("Database created successfully")
    }).catch((e)=>{
      console.log("Database created successfully" + e.message)
    })

  }
}

