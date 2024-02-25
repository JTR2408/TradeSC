// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private testDataUrl = 'assets/test-data.json'; // Path to your test data JSON file

  constructor(private http: HttpClient) { }

  getShips(): Observable<any[]> {
    return this.http.get<any[]>(this.testDataUrl)
      .pipe(
        catchError(this.handleError<any[]>('getShips', []))
      );
  }

  getCommodities(): Observable<any[]> {
    return this.http.get<any[]>(this.testDataUrl)
      .pipe(
        catchError(this.handleError<any[]>('getCommodities', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
