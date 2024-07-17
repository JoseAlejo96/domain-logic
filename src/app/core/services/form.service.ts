import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../interfaces/searchResult';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'https://api.github.com/search/users?q=';

  constructor(private http: HttpClient) {}

  searchUsers(userName: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${this.apiUrl}${userName}`);
  }
}
