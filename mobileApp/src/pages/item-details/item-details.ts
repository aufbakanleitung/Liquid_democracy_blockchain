import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {PollService} from '../../providers/poll-service';
import {VotePage} from '../vote-page/vote-page';
import {DelegatePage} from '../delegate-page/delegate-page';
import { ProfilePage } from '../profile-page/profile-page';
import {AuthService} from '../../providers/auth-service';


@Component({
  templateUrl: 'item-details.html',
  providers : [PollService, AuthService]
})
export class ItemDetailsPage {
  selectedItem: any;
  //navCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pollService: PollService) {
    this.selectedItem = {};
    this.getOne(navParams.get('id'));
  }

  getOne(id: string){
    // this.pollService.getOne(id)
    //   .then(res => {
    //       this.selectedItem = res || {};
    // });
  }

  vote(event, item){
    this.navCtrl.push(VotePage, {
        item: this.selectedItem
    });
  }

  delegate(event, item){
    this.navCtrl.push(DelegatePage, {
        pollId: this.selectedItem.id
    });
  }

    gotoProfile(event, item){
        this.navCtrl.push(ProfilePage, {
            item: item
        });
      }
}
