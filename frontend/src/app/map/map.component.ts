import { ReportService } from '../report.service';
import { Observable, of } from 'rxjs';



import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
import { LocationService } from '../location.service';


const iconRetinaUrl = 'assets/marker-icon-2x.png'; 
const iconUrl = 'assets/marker-icon.png'; 
const shadowUrl = 'assets/marker-shadow.png'; 
const iconDefault = icon({ 
  iconRetinaUrl, 
  iconUrl,
  shadowUrl, 
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
  tooltipAnchor: [16, -28], 
  shadowSize: [41, 41] 
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', '../../../node_modules/leaflet/dist/leaflet.css'], 
  standalone: true
})
export class MapComponent implements OnInit{
  private map: any 
  reports$: Observable<any[]> 
  location$: Observable<any[]>
  markers: L.Marker[]
  constructor(private rs: ReportService, private ls: LocationService) { 
    this.reports$ = of([])
    this.location$ = of([])
    this.markers = []
  };

  ngOnInit(): void {
    this.map = L.map('map').setView([49.2, -123], 11) 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.ls.getLocations().subscribe((locations: any[]) => {
      locations.forEach((location: any) => {
        console.log(location.coordinates)
        this.markers = [L.marker(location.coordinates), ...this.markers]
      });
      this.markers.forEach(marker => marker.addTo(this.map));
    })
  }
}