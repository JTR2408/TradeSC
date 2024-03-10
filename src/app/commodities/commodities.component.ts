import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Commodities } from '../commodities.model';

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.scss']
})
export class CommoditiesComponent implements OnInit {
  commodities: Commodities[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCommodities().subscribe(data => {
      this.commodities = data.map(commodity => ({
        ...commodity,
        legality: commodity.is_illegal ? 'Illegal' : 'Legal',
        refinement: commodity.is_raw ? 'Unrefined' : 'Refined',
        harvestability: commodity.is_harvestable ? 'Harvestable' : 'Unharvestable',
        availability: commodity.is_available ? 'Available' : 'Unavailable',
        tradeability: this.getTradeability(commodity),
        permanence: commodity.is_temporary ? 'Temporary' : 'Permanent'
      }))
    });
  }

  private getTradeability(commodity: Commodities): string{
    if(commodity.is_buyable === 1 && commodity.is_sellable === 1){
      return 'Buyable/Sellable'
    }
    else if(commodity.is_buyable === 1){
      return 'Buyable';
    }else if (commodity.is_sellable ==1){
      return 'Sellable'
    }else{
      return 'Unknown'
    }
  }

}