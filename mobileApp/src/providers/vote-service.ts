import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AuthService} from './auth-service';

@Injectable()
export class VoteService {
  public currentUser: any;
  private authenticationHeaders: Headers;

  constructor(private http: Http, private authService: AuthService) {
    this.authenticationHeaders = authService.createAuthorizationHeader()
  }

  public delegateVote(delegatedUserID: string, pollID: string) {
    return new Promise(() => {
      this.http
        .post('http://localhost:8080/api/v1/votes/delegate/' + delegatedUserID + '/' + pollID, {}, {headers: this.authenticationHeaders})
        .subscribe(res => res.json());
    })
  }

  public castVote(pollID: string, option: string) {
    return new Promise(() => {
      this.http.post('http://localhost:8080/api/v1/polls/' + pollID +'/vote', {option: option}, {headers: this.authenticationHeaders})
        .subscribe(res => res.json());
    })
  }

  public retrieveVote(voteID: string) {
    return new Promise(() => {
      this.http.post('http://localhost:8080/api/v1/votes/' + voteID + '/retrieve', {}, {headers: this.authenticationHeaders})
        .subscribe(res => res.json());
    })
  }
}
