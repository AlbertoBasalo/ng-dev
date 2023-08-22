import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../domain/models/booking.interface';

@Injectable({ providedIn: 'root' })
export class BookingsService {
  #endpoint = 'http://localhost:3000/bookings';
  #http = inject(HttpClient);
  postBooking(booking: Booking): Observable<Booking> {
    return this.#http.post<Booking>(this.#endpoint, booking);
  }
}
