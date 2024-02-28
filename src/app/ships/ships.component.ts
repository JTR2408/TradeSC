import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

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
      console.log(data); // Process the data here
    }, error => {
      console.error('Error fetching star systems:', error);
    });
  }
}
