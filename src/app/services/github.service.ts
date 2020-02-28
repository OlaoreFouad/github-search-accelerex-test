import { UsersResponse } from './../models/response.model';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private BASE_URL = 'https://api.github.com/search/users';
  private SINGLE_USER_URL = 'https://api.github.com/users/';

  public githubSearchTerm = new Subject<string>();

  constructor(private _http: HttpClient) { }

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
    return this._http.get<User>(this.SINGLE_USER_URL + name);
  }
}
