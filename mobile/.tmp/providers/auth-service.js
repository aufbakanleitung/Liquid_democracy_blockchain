var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Headers } from '@angular/http';
/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.loggedIn = !!localStorage.getItem('token');
    }
    AuthService.prototype.delegate = function (userId, pollId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log('Delegating', pollId, 'to', userId);
        return this.http
            .post('http://localhost:8080/api/v1/delegation/delegate/', {
            token: this.getToken(),
            pollId: pollId,
            actualVoter: userId
        }, { headers: headers });
    };
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http
                .post('http://localhost:8080/api/v1/login', { username: username, password: password }, { headers: headers })
                .subscribe(function (data) {
                var dataJSON = JSON.parse(data._body);
                console.log("data ", dataJSON);
                if (dataJSON.success) {
                    localStorage.setItem('token', dataJSON.token);
                    _this.loggedIn = true;
                    _this.currentUser = dataJSON.user;
                    console.log('logged in', dataJSON.user);
                }
                else {
                    console.log('something went wrong', dataJSON);
                    return reject('err');
                }
                return resolve(dataJSON.success);
            });
        });
    };
    AuthService.prototype.getAllUsers = function () {
        console.log('get all users');
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http
            .get('http://localhost:8080/api/v1/user?token=' + this.getToken(), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.createAuthorizationHeader = function () {
        var headers = new Headers();
        headers.append('x-access-token', this.getToken());
        headers.append('Content-Type', 'application/json');
        return headers;
    };
    AuthService.prototype.getToken = function () {
        console.log(localStorage.getItem('token'));
        return localStorage.getItem('token');
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('token');
        this.loggedIn = false;
    };
    AuthService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AuthService);
export { AuthService };
