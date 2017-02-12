import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Headers} from '@angular/http';

@Injectable()
export class AuthService {
  public currentUser: any;
  private loggedIn: boolean;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('token');
  }

  public login(username, password): Promise<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http
        .post('http://localhost:8080/api/v1/login', {username: username, password: password}, {headers: headers})
        .subscribe((data: any) => {
          let dataJSON = JSON.parse(data._body);
          if (dataJSON.success) {
            this.loggedIn    = true;
            this.currentUser = dataJSON.user;
          } else {
            return reject('err');
          }

          return resolve(dataJSON.success);
        });
    });
  }

  public createAuthorizationHeader(): Headers {
    let headers = new Headers();
    headers.append('x-access-token', this.getToken());
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public logout() {
    this.loggedIn = false;
  }

  public isLoggedIn() {
    return this.loggedIn;
  }
}
