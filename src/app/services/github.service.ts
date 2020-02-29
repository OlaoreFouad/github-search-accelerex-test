import { UsersResponse } from './../models/response.model';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private BASE_URL = 'https://api.github.com/search/users';
  private SINGLE_USER_URL = 'https://api.github.com/users/';
  private CLIENT_SECRET = 'f06673e910b4add699d1de69839a6b9af5e404a8';
  private CLIENT_ID = '67a38e51baa42a7c5d5b';
  httpOptions: HttpHeaders;

  public githubSearchTerm = new Subject<string>();

  constructor(private _http: HttpClient) {
    this.httpOptions = new HttpHeaders({
      'Authorization': `${ this.CLIENT_ID }:${ this.CLIENT_SECRET }`
    });
  }

  getUsersByName(query: string): Observable<UsersResponse> {
    return this._http.get<UsersResponse>(this.BASE_URL, {
      params: {
        q: query
      }
    }).pipe(
      switchMap(response => {
        response.items.forEach((val, idx) => {
          this.getMoreUserData(val.login).subscribe(user => response.items[idx] = user);
        });
        const { items, total_count } = response;

        const newResponse: UsersResponse = { items, total_count };

        return of(newResponse);
      })
    );
  }

  getMoreUserData(name: string): Observable<User> {
    return this._http.get<User>(this.SINGLE_USER_URL + name, {
      params: {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET
      }
    });
  }
}
