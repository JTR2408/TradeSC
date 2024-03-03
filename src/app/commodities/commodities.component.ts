import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { commodities } from '../commodities.model';

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.scss']
})
export class CommoditiesComponent implements OnInit {
  commodities: commodities[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCommodities().subscribe(data => {
      this.commodities = this.mapCommodities(data);
    });
  }

  private mapCommodities(commodities: commodities[]): commodities[] {
    return commodities.map(commodity => ({
      ...commodity,
      legality: commodity.is_illegal ? 'Illegal' : 'Legal'
    }));    
  }
}