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

  // URLS endpoints for accessing the GitHub Search API
  private BASE_URL = 'https://api.github.com/search/users';
  private SINGLE_USER_URL = 'https://api.github.com/users/';

  // Secret keys handed by GitHub used to make requests to increase Rate Limit.
  private CLIENT_SECRET = 'f06673e910b4add699d1de69839a6b9af5e404a8';
  private CLIENT_ID = '67a38e51baa42a7c5d5b';
  httpOptions: HttpHeaders;

  public githubSearchTerm = new Subject<string>();

  constructor(private _http: HttpClient) {
    this.httpOptions = new HttpHeaders({
      'Authorization': `${ this.CLIENT_ID }:${ this.CLIENT_SECRET }`
    });
  }

  /**
   * This getUsersByName method accepts a parameter of type string. Which serves as the query
   * used to get a set of users registered on GitHub whose username, full name, email or bio
   * matches the query passed in. The data returned is wrapped in an Observable that holds data of
   * type UsersResponse(a type that contains an array of user items and an integer total_count as
   * properties.). The returned user object does not contain enough information so the returned data
   * is passed through a pipe (set of functions) where the users object from the original request
   * is morphed into a more detailed one by making another request, after which a new observable
   * is constructed and sent to the calling method.
   */
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

  /**
   * This getMoreUserData method retrieves a more detailed set of data for a particular
   * GitHub user by sending requests to a different endpoint.
   * @param name
   * @returns @see Observable<User>
   */
  getMoreUserData(name: string): Observable<User> {
    return this._http.get<User>(this.SINGLE_USER_URL + name, {
      params: {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET
      }
    });
  }
}
