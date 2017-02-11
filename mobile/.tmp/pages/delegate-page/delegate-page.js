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
import { ProfilePage } from '../profile-page/profile-page';
import { AuthService } from '../../providers/auth-service';
import { NavController } from 'ionic-angular';
import { NavParams, ToastController } from 'ionic-angular/index';
var DelegatePage = (function () {
    function DelegatePage(authService, navParams, toastCtrl, navCtrl) {
        this.authService = authService;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.loadUsers();
        this.pollId = navParams.get('pollId');
    }
    DelegatePage.prototype.loadUsers = function () {
        /*
        this.authService.getAllUsers().subscribe(users => {
          this.users = users
        });
        */
    };
    DelegatePage.prototype.delegate = function () {
        var _this = this;
        this.authService.delegate(this.selectedUser, this.pollId).subscribe(function (res) {
            _this.delegated = true;
            var toast = _this.toastCtrl.create({
                message: 'Your vote has been delegated.',
                duration: 3000
            });
            toast.present();
        });
    };
    DelegatePage.prototype.gotoProfile = function (event, item) {
        this.navCtrl.push(ProfilePage, {
            item: item
        });
    };
    return DelegatePage;
}());
DelegatePage = __decorate([
    Component({
        templateUrl: 'delegatepage.html'
    }),
    __metadata("design:paramtypes", [AuthService, NavParams, ToastController, NavController])
], DelegatePage);
export { DelegatePage };
