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
import { ItemDetailsPage } from '../item-details/item-details';
import { ProfilePage } from '../profile-page/profile-page';
import { PollService } from '../../providers/poll-service';
var ListPage = (function () {
    function ListPage(navCtrl, navParams, pollService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pollService = pollService;
        this.categories = ['Finance', 'Energy', 'Security', 'Agriculture', 'Transport'];
        this.subcategories = ['Pool1'];
        this.subcategories = ['Pool2'];
        this.subcategories = ['Pool3'];
        this.subcategories = ['Pool4'];
        this.subcategories = ['Pool5'];
        /*
      this.pollService.getList().subscribe(res => {
        this.items = res || [];
      });
      */
    }
    ListPage.prototype.itemTapped = function (event, item) {
        this.navCtrl.push(ItemDetailsPage, {
            id: item.id
        });
    };
    ListPage.prototype.MyCtrl = function ($scope, $ionicHistory) {
        $scope.myGoBack = function () {
            console.log('dsadas');
        };
    };
    ListPage.prototype.gotoProfile = function (event, item) {
        this.navCtrl.push(ProfilePage, {
            item: item
        });
    };
    return ListPage;
}());
ListPage = __decorate([
    Component({
        templateUrl: 'list.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, PollService])
], ListPage);
export { ListPage };
