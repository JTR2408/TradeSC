import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Ship } from '../ships.model'

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {
  ships: any[] = [];

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.getShips().subscribe(data => {
      this.ships = data.map(ship => ({
        ...ship,
        environment: ship.is_spaceship ? 'Space' : 'Ground',
        shipClass: this.getShipClass(ship),
        shipStatus: this.getShipStatus(ship),
        shipRoll: this.getShipRoll(ship)
      }));
    });
  }
  private getShipClass(ship: Ship): string {
    if (ship.is_military === 1) {
      return 'Military';
    } else if (ship.is_civilian === 1) {
      return 'Civilian';;
    } else {
      return 'Unknown';
    }
  }
  private getShipStatus(ship: Ship): string {
    if(ship.is_concept === 1){return 'In Concept';}
    else{return 'Flight Ready';}
  }

  private getShipRoll(ship: Ship): string {
    if (ship.is_exploration === 1) {
      return 'Exploration';
    } else if (ship.is_passenger === 1) {
      return 'Passenger';
    } else if (ship.is_industrial === 1) {
      return 'Industrial';
    } else if (ship.is_mining === 1) {
      return 'Mining';
    } else if (ship.is_salvage === 1) {
      return 'Salvage';
    } else if (ship.is_refinery === 1) {
      return 'Refinery';
    } else if (ship.is_scanning === 1) {
      return 'Scanning';
    } else if (ship.is_cargo === 1) {
      return 'Cargo';
    } else if (ship.is_medical === 1) {
      return 'Medical';
    } else if (ship.is_racing === 1) {
      return 'Racing';
    } else if (ship.is_repair === 1) {
      return 'Repair';
    } else if (ship.is_refuel === 1) {
      return 'Refuel';
    } else if (ship.is_interdiction === 1) {
      return 'Interdiction';
    } else if (ship.is_tractor_beam === 1) {
      return 'Tractor Beam';
    } else if (ship.is_qed === 1) {
      return 'QED';
    } else if (ship.is_emp === 1) {
      return 'EMP';
    } else if (ship.is_construction === 1) {
      return 'Construction';
    } else if (ship.is_datarunner === 1) {
      return 'Data Runner';
    } else if (ship.is_science === 1) {
      return 'Science';
    } else if (ship.is_boarding === 1) {
      return 'Boarding';
    } else if (ship.is_stealth === 1) {
      return 'Stealth';
    } else if (ship.is_research === 1) {
      return 'Research';
    } else if (ship.is_carrier === 1) {
      return 'Carrier';
    } else {
      return 'Unknown';
    }
}
}