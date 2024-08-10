import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './card.model'; // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost/path_to_your_api/getcards.php'; // Adjust URL

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  updateCardStatus(cardId: string, status: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/updatecardstatus.php`, { cardId, status });
  }
}
