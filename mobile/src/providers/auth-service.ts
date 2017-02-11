import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Headers, RequestOptions} from '@angular/http';

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthService {
    public currentUser: any;
    private loggedIn: boolean;

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
                {headers: headers}
            );
    }

    login(username, password): Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return new Promise((resolve, reject) => {
            this.http
                .post(
                    'http://localhost:8080/api/v1/login',
                    {username: username, password: password},
                    {headers: headers}
                )
                .subscribe((data: any) => {

                    let dataJSON = JSON.parse(data._body);
                    console.log("data ", dataJSON);
                    if (dataJSON.success) {
                        localStorage.setItem('token', dataJSON.token);
                        this.loggedIn = true;
                        this.currentUser = dataJSON.user;
                        console.log('logged in', dataJSON.user);
                    } else {
                        console.log('something went wrong', dataJSON);
                        return reject('err');
                    }

                    return resolve(dataJSON.success);
                });
        });
    }


    getAllUsers() {
        console.log('get all users');
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http
            .get(
                'http://localhost:8080/api/v1/user?token=' + this.getToken(),
                {headers: headers}
            )
            .map(res => res.json());
    }


    public createAuthorizationHeader(): Headers {
        let headers = new Headers();
        headers.append('x-access-token', this.getToken());
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    getToken() {
        console.log(localStorage.getItem('token'));
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
