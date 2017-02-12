import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PollService} from '../../providers/poll-service';
import {AuthService} from '../../providers/auth-service';
import {ItemDetailsPage} from '../item-details/item-details';
import {ProfilePage} from '../profile-page/profile-page';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [PollService, AuthService]
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private pollService: PollService) {
    this.categories = ['Finance', 'Energy', 'Security', 'Agriculture', 'Transport'];
    this.pollService.getList()
      .then(res => {
        this.items = res || [];
      });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  selectedItem: any;
  categories: string[];
  items: Array<{title: string, category: string}>;

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      id: item.pollID
    });
  }

  MyCtrl($scope, $ionicHistory) {
    $scope.myGoBack = function() {
      console.log('dsadas');
    };
  }

  gotoProfile(event, item){
    this.navCtrl.push(ProfilePage, {
      item: item
    });
  }

}
