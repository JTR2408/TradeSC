import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.scss']
})
export class CommoditiesComponent implements OnInit {

  commodities: any[] = [];

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.getCommodities().subscribe(
      (data: any[]) => {
        this.commodities = data;
      }
    );
  }
}
