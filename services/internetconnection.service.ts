// Programming Mobile Apps
// Authors: Johnstanley Ajagu,
//          Will Smith
// Student ID: 8864315,
//             8657254
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InternetconnectionService {

  private isConnectedSubject: BehaviorSubject<boolean>
  constructor() {
    this.isConnectedSubject = new BehaviorSubject<boolean>(navigator.onLine)
    window.addEventListener("online", ()=>{
      this.isConnectedSubject.next(true)
    })
    window.addEventListener("offline", ()=>{
      this.isConnectedSubject.next(false)
    })
  }

  isConnected():Observable<boolean> {
    return this.isConnectedSubject.asObservable()
  }
}
