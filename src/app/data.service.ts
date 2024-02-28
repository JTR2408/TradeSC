import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

interface DataResponse {
  ships: any[];
  commodities: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private testApiUrl = 'assets/test-data.json'; // Assuming data.json is in the assets folder
  private apiUrlComm = 'https://portal.uexcorp.space/api/commodities/';
  private apiUrl = 'https://portal.uexcorp.space/api/'
  private apiKey = 'ca401110476bf5c3d732acde56283d6403599813';


  constructor(private http: HttpClient) { }

  getData(): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.testApiUrl);
  }

  getShips(): Observable<any[]> {
    return this.getData().pipe(
      map(data => data.ships)
    );
  }

  // getShips(): Observable<any[]> {
  //   const headers = { 'api_key': this.apiKey };
  //   return this.http.get<any[]>(this.apiUrlShips, { headers })
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error fetching ships:', error);
  //         throw error;
  //       })
  //     );
  //   }

  // getShips(): Observable<any[]> {
  //   const shipEnd = "ships";
  //   const url = `${this.apiUrl}${shipEnd}`;

  //   return this.http.get<any[]>(url, { headers: { 'api_key': this.apiKey } });
  // }


  getCommodities(): Observable<any[]> {
    const headers = { 'api_key': this.apiKey };
    return this.http.get<any[]>(this.apiUrlComm, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching commodities:', error);
          throw error;
        })
      );
  }
}