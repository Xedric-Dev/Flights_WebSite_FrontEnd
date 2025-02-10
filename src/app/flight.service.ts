import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './Environments/environment';
import { Observable } from 'rxjs';
import { Flight } from './Models/Flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private apiUrl = `${environment.apiUrl}/Flights`

  constructor(private http : HttpClient) { }

  getFlights() : Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl)
  }

  getFlightsById(id:number) : Observable<Flight>{
    return this.http.get<Flight>(`${this.apiUrl}/${id}`)
  }

  createFlight(flight:Flight): Observable<Flight>{
    return this.http.post<Flight>(this.apiUrl,flight)
  }

  deleteFlight(id:number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateFlight(flight:Flight):Observable<Flight>{
    return this.http.put<Flight>(`${this.apiUrl}/${flight.id}`,flight)
  }
}
