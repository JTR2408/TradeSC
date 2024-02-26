import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface DataResponse {
  ships: any[];
  commodities: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'assets/test-data.json'; // Assuming data.json is in the assets folder

  constructor(private http: HttpClient) { }

  getData(): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.apiUrl);
  }

  getShips(): Observable<any[]> {
    return this.getData().pipe(
      map(data => data.ships)
    );
  }

  getCommodities(): Observable<any[]> {
    return this.getData().pipe(
      map(data => data.commodities)
    );
  }
}