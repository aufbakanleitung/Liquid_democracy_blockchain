
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {RequestOptions, Headers} from 'angular2/http';
import {AuthService} from './auth-service';

/*
  Generated class for the PollService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PollService {

  constructor(public http: Http, private authService: AuthService) {
    console.log('Hello PollService Provider');
  }


  getList() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
        .get(
            'http://localhost:8080/api/v1/poll' + '?token=' + this.authService.getToken(), {},
            new RequestOptions({ headers: headers })
        ).map(res => res.json());
  }

  getOne(id: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
        .get(
            'http://localhost:8080/api/v1/poll/'+id+'?token=' + this.authService.getToken(), {},
            new RequestOptions({ headers: headers })
        ).map(res => res.json());
  }

  vote(id: string, option: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log('Voting', option, 'for', id);

    return this.http
        .post(
            'http://localhost:8080/api/v1/poll/vote',
            {
              token: this.authService.getToken(),
              pollId: id,
              option: option
            },
            new RequestOptions({ headers: headers })
        );
  }
}
