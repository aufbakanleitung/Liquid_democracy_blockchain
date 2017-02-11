import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { ProfilePage } from '../profile-page/profile-page';
import { PollService} from '../../providers/poll-service';


@Component({
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  categories: string[];
  items: Array<{title: string, category: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pollService: PollService) {
    this.categories = ['Finance', 'Energy', 'Security', 'Agriculture', 'Transport'];
    this.pollService.getList()
        .then(res => {
            this.items = res || [];
    });

  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      id: item.id
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
