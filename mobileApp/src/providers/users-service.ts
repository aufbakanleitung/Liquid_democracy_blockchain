import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Headers, RequestOptions} from '@angular/http';
import {AuthService} from './auth-service';

@Injectable()
export class UserService {
  private authenticationHeaders: Headers;

  constructor(private http: Http, private authService: AuthService) {
    this.authenticationHeaders = authService.createAuthorizationHeader()
  }
  public getAllUsers() {
    return new Promise(() => {
      this.http
        .get('http://localhost:8080/api/v1/users', {headers: this.authenticationHeaders} )
        .subscribe(res => res.json());
    })
  }
}
