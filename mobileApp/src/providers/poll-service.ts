import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AuthService} from './auth-service';

@Injectable()
export class PollService {
  private authenticationHeaders: Headers;

  constructor(public http: Http, private authService: AuthService) {
    this.authenticationHeaders = authService.createAuthorizationHeader()
  }

  public getList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/api/v1/polls', {headers: this.authenticationHeaders})
        .subscribe((data: any) => {
          let dataJSON = JSON.parse(data._body);
          console.log(dataJSON);
          if (dataJSON != null) {
            return resolve(dataJSON);
          } else {
            return reject("error");
          }
        });
    });
  }

  public getOne(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/api/v1/polls/' + id, {headers: this.authenticationHeaders})
        .subscribe((data: any) => {
          let dataJSON = JSON.parse(data._body);
          if (dataJSON != null) {
            return resolve(dataJSON);
          } else {
            return reject("error");
          }
        });
    })
  }

  public vote(id: string, option: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post('http://localhost:8080/api/v1/poll/vote', {option: option}, {headers: this.authenticationHeaders});
  }
}
