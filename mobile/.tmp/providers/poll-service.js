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
import 'rxjs/add/operator/map';
import { RequestOptions, Headers } from 'angular2/http';
import { AuthService } from './auth-service';
/*
  Generated class for the PollService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var PollService = (function () {
    function PollService(http, authService) {
        this.http = http;
        this.authService = authService;
        console.log('Hello PollService Provider');
    }
    PollService.prototype.getList = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http
            .get('http://localhost:8080/api/v1/poll' + '?token=' + this.authService.getToken(), {}, new RequestOptions({ headers: headers })).map(function (res) { return res.json(); });
    };
    PollService.prototype.getOne = function (id) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http
            .get('http://localhost:8080/api/v1/poll/' + id + '?token=' + this.authService.getToken(), {}, new RequestOptions({ headers: headers })).map(function (res) { return res.json(); });
    };
    PollService.prototype.vote = function (id, option) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log('Voting', option, 'for', id);
        return this.http
            .post('http://localhost:8080/api/v1/poll/vote', {
            token: this.authService.getToken(),
            pollId: id,
            option: option
        }, new RequestOptions({ headers: headers }));
    };
    return PollService;
}());
PollService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AuthService])
], PollService);
export { PollService };
