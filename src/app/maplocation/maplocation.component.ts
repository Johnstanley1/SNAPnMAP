import {Component, inject} from '@angular/core';
import {GeoserviceService} from "../../../services/geoservice.service";
import {ReactiveFormsModule} from "@angular/forms";
declare const H: any
@Component({
  selector: 'app-maplocation',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './maplocation.component.html',
  styleUrl: './maplocation.component.css'
})
export class MaplocationComponent {

  geoService = inject(GeoserviceService);
  position: any = undefined;
  error: any = undefined;

  lat: any;
  lon: any

  constructor() {
    this.getLocationOnclick()
  }
  getLocationOnclick() {
    const subscription = this.geoService.getCurrentLocation().then(data => {
      console.log(data);
      this.position = data;
      // @ts-ignore
      this.lat = data.lat;
      // @ts-ignore
      this.lon = data.lon;
      this.error = ""
      this.showMap()
    }).catch(e => {
      console.log(e)
      this.error = e;
    });
  }

  public showMap() {
    console.log("showing map: ")
    let container = document.getElementById('mapContainer')!
    container.innerHTML = '';

    // Initialize the platform object:
    var platform = new H.service.Platform({
      'apikey': 'AuMrWpEvGOyNF9ECs4Q_dwZJKJDeQWa9aT6wEdunbQc'
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    var options = {
      zoom: 15,
      center: {
        lat: this.lat, lng: this.lon
      }
    };

    // Instantiate (and display) a map object:
    var map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.vector.normal.map,
      options
    );

    var icon = new H.map.Icon('assets/img/marker.png');
    var marker = new H.map.Marker({
      lat: this.lat, lng: this.lon
    }, {icon: icon});

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
  }

  getLat(): any {
    return this.lat;
  }

  getLon(): any {
    return this.lon;
  }

}
