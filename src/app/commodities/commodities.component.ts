import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { commodities } from '../commodities';

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.scss']
})
export class CommoditiesComponent implements OnInit {
  commodities: commodities[] = []; // Array to store Commodities data

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCommodities().subscribe(data => {
      this.commodities = data; // Assign fetched Commodities data to the commodities array
    });
  }
}