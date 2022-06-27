import { Injectable } from '@angular/core';
import { Observable, of, throwError, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { filter, catchError, tap, map } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { Calculation } from './calculation';

const httpOptions = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl= environment.apiUrl;

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  calculate(calc: Calculation): Observable<Calculation[]> {
    //return this.http.post<Calculation[]>(`http://localhost:8080/calculate`, JSON.stringify(calc), httpOptions)
    return this.http.post<Calculation[]>(`${this.apiUrl}/calculate`, JSON.stringify(calc), httpOptions)
      .pipe(
        tap(data=> console.log('Fetched data')),
        catchError(this.handleError('calculate', []))
      )
  }

  getHistory(): Observable<Calculation[]> {
    return this.http.get<Calculation[]>(`http://localhost:8080/getHistory`, httpOptions)
      .pipe(
        tap(data=> console.log('Fetched data')),
        catchError(this.handleError('calculate', []))
      )
  }
}
