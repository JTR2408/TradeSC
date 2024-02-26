import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.scss']
})
export class CommoditiesComponent implements OnInit {

  commodities: any[] = [];

  constructor(private dataservice: DataService){}

  ngOnInit(): void {
      this.dataservice.getCommodities().subscribe(data => {this.commodities = data
        console.log('Ships Data:', data);},
        error => {
          console.error('Error fetching ships:', error); // Log any errors that occur during data retrieval
        }
        )
  }
}
