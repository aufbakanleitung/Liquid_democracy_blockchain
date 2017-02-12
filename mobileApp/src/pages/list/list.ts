import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PollService} from '../../providers/poll-service';
import {ItemDetailsPage} from '../item-details/item-details';
import {ProfilePage} from '../profile-page/profile-page';
import {VoteService} from '../../providers/vote-service';
import {AuthService} from '../../providers/auth-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [PollService, AuthService, VoteService]
})
export class ListPage {

  constructor(public navCtrl: NavController, private pollService: PollService) {
    this.categories = ['Finance', 'Energy', 'Security', 'Agriculture', 'Transport'];
    this.pollService.getAllPolls()
      .then(res => {
        this.items = res || [];
      });

  }
  public ionViewDidLoad() {}

  selectedItem: any;
  categories: string[];
  items: Array<{title: string, category: string}>;

  public itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      id: item.pollID
    });
  }

  public MyCtrl($scope, $ionicHistory) {
    $scope.myGoBack = function() {
      console.log('dsadas');
    };
  }

  public gotoProfile(event, item){
    this.navCtrl.push(ProfilePage, {
      item: item
    });
  }

}
