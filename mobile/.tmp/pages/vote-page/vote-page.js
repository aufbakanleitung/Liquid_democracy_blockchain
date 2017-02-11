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
import { PollService } from '../../providers/poll-service';
import { NavParams, NavController, ToastController } from 'ionic-angular/index';
import { ProfilePage } from '../profile-page/profile-page';
var VotePage = (function () {
    function VotePage(navCtrl, navParams, pollService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pollService = pollService;
        this.toastCtrl = toastCtrl;
        this.poll = navParams.get('item');
        console.log(this.poll);
    }
    VotePage.prototype.finalVote = function () {
        var _this = this;
        this.pollService.vote(this.poll.id, this.voting).subscribe(function (res) {
            _this.voted = true;
            var toast = _this.toastCtrl.create({
                message: 'Your vote has been registered to the blockchain.',
                duration: 3000
            });
            toast.present();
        });
    };
    VotePage.prototype.gotoProfile = function (event, item) {
        this.navCtrl.push(ProfilePage, {
            item: item
        });
    };
    return VotePage;
}());
VotePage = __decorate([
    Component({
        templateUrl: 'vote-page.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, PollService, ToastController])
], VotePage);
export { VotePage };
