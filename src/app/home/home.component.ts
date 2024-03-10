import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SelectItem } from 'primeng/api';
import { Ship } from '../ships.model';
import { Commodities } from '../commodities.model';
import { OptimizationService } from '../optimizationService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ships: Ship[] = [];
  shipsDropdownOptions: any[] = [];
  selectedShip!: Ship;
  investment: number = 0;
  selectedCommodity: string = '';
  minimumInvestment: number | undefined;
  commodities: Commodities[] = [];
  commoditiesDropdownOptions: SelectItem[] = [];

  constructor(private dataService: DataService, private optimizationService: OptimizationService) { }

  ngOnInit(): void {
    this.dataService.getShips().subscribe(data => {
      this.ships = data;
      this.shipsDropdownOptions = this.ships
      .filter(ship => ship.scu > 0) // Filter ships with at least 1 SCU of cargo space
      .map(ship => ({ label: ship.name_full, value: ship }));
    });
    this.dataService.getCommodities().subscribe(data => {
      this.commodities = data;
      this.commoditiesDropdownOptions = this.commodities
        .map(commodity => ({ label: commodity.name, value: commodity.name }));
    });
  }


  onSubmit(): void {
    this.optimizationService.findBestTradeRoute(this.investment).subscribe(
      tradeRoute => {
        console.log(tradeRoute); // Output the result to console
      },
      error => {
        console.error('Error finding best trade route:', error);
      }
    );
  }
  
}
