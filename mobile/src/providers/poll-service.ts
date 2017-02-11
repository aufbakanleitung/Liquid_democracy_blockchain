import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AuthService} from './auth-service';

/*
 Generated class for the PollService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PollService {
    private authenticationHeaders: Headers;

    constructor(public http: Http, private authService: AuthService) {
        console.log('Hello PollService Provider');
        this.authenticationHeaders = authService.createAuthorizationHeader()
    }


    getList(): Promise<any> {
        let token = this.authService.getToken();
        //console.log(this.authenticationHeaders);
        return new Promise((resolve, reject) => {
            this.http
                .get('http://localhost:8080/api/v1/polls', {headers: this.authenticationHeaders}
                ).subscribe((data: any) => {
                let dataJSON = JSON.parse(data._body);
                console.log(dataJSON);
                if (dataJSON != null) {

                } else {
                    return reject("error");
                }
                return resolve(dataJSON);
            });

        });
    }

    getOne(id: string) {
        let token = this.authService.getToken();
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise((resolve, reject) => {
            this.http
                .get('http://localhost:8080/api/v1/polls/' + id, {headers: this.authenticationHeaders}
                ).subscribe((data: any) => {
                let dataJSON = JSON.parse(data._body);
                console.log(dataJSON);
                if (dataJSON != null) {

                } else {
                    return reject("error");
                }
                return resolve(dataJSON);
            });
        });

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
                {headers: headers}
            );
    }
}
