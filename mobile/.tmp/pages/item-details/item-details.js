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
import { NavController, NavParams } from 'ionic-angular';
import { PollService } from '../../providers/poll-service';
import { VotePage } from '../vote-page/vote-page';
import { DelegatePage } from '../delegate-page/delegate-page';
import { ProfilePage } from '../profile-page/profile-page';
var ItemDetailsPage = (function () {
    function ItemDetailsPage(navCtrl, navParams, pollService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pollService = pollService;
        this.selectedItem = {};
        this.getOne(navParams.get('id'));
    }
    ItemDetailsPage.prototype.getOne = function (id) {
        var _this = this;
        this.pollService.getOne(id).subscribe(function (res) {
            _this.selectedItem = res || {};
        });
    };
    ItemDetailsPage.prototype.vote = function (event, item) {
        this.navCtrl.push(VotePage, {
            item: this.selectedItem
        });
    };
    ItemDetailsPage.prototype.delegate = function (event, item) {
        this.navCtrl.push(DelegatePage, {
            pollId: this.selectedItem.id
        });
    };
    ItemDetailsPage.prototype.gotoProfile = function (event, item) {
        this.navCtrl.push(ProfilePage, {
            item: item
        });
    };
    return ItemDetailsPage;
}());
ItemDetailsPage = __decorate([
    Component({
        templateUrl: 'item-details.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, PollService])
], ItemDetailsPage);
export { ItemDetailsPage };
