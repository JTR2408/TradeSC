import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { tradePost } from './tradePost.model';

interface DataResponse {
  ships: any[];
  commodities: any[];
  tradePorts: any[];
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'assets/test-data.json';

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

 getTradePosts(): Observable<tradePost[]> {
  return this.getData().pipe(
    map(data => data['tradePosts'])
  );
}
}