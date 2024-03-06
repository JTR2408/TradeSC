import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SelectItem } from 'primeng/api';
import { Ship } from '../ships.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ships: Ship[] = [];
  shipsDropdownOptions: SelectItem[] = [];
  selectedShip!: Ship;
  investment: number = 0;
  includeIllegal: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getShips().subscribe(data => {
      this.ships = data;
      this.shipsDropdownOptions = this.generateShipsDropdownOptions(data);
    });
  }

  generateShipsDropdownOptions(ships: Ship[]): SelectItem[] {
    const options: SelectItem[] = [];
    let currentManufacturer: string = '';

    ships.forEach(ship => {
      if (ship.company_name !== currentManufacturer) {
        currentManufacturer = ship.company_name;
        options.push({ label: currentManufacturer, value: null, disabled: true });
      }
      options.push({ label: ship.name, value: ship });
    });

    return options;
  }

  submitForm() {
    // Implement form submission logic here
  }
}
