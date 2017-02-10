import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers, RequestOptions} from 'angular2/http';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  public currentUser: any;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('token');
  }


  delegate(userId: string, pollId: string) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      console.log('Delegating', pollId, 'to', userId);

      return this.http
          .post(
              'http://localhost:8080/api/v1/delegation/delegate/',
              {
                token: this.getToken(),
                pollId: pollId,
                actualVoter: userId
              },
              new RequestOptions({ headers: headers })
          );
  }

  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http
        .post(
            'http://localhost:8080/api/v1/login',
            { username: username, password: password },
            new RequestOptions({ headers: headers })
        )
        .map(res => res.json())
        .map(res => {
          if (res.authenticated) {
            localStorage.setItem('token', res.token);
            this.loggedIn = true;
            this.currentUser = res.user;
            console.log('logged in', res);
          } else {
            console.log('something went wrong', res); //TODO?
          }

          return res.authenticated;
        });
  }


  getAllUsers() {
    console.log('get all users');
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
        .get(
            'http://localhost:8080/api/v1/user?token=' +  this.getToken(), {},
            new RequestOptions({ headers: headers })
        )
        .map(res => res.json());
  }


  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
