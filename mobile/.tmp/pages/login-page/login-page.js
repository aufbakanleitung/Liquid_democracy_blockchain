var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { AuthService } from '../../providers/auth-service';
var LoginPage = (function () {
    function LoginPage(nav, authService) {
        this.nav = nav;
        this.authService = authService;
        this.username = 'bill';
        this.password = 'passw0rd';
        // this.nav = nav;
    }
    LoginPage.prototype.login = function (event, item) {
        var _this = this;
        console.log('login pressed : ', this.username, this.password);
        this.authService.login(this.username, this.password)
            .then(function (res) {
            console.log(res);
            if (res) {
                console.log('logged in successfully');
                _this.nav.setRoot(ListPage);
            }
            else
                console.log('something went wrong');
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        templateUrl: 'login-page.html'
    }),
    __metadata("design:paramtypes", [NavController, AuthService])
], LoginPage);
export { LoginPage };
