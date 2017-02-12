import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PollService} from '../../providers/poll-service';
import {VotePage} from '../vote-page/vote-page';
import {DelegatePage} from '../delegate-page/delegate-page';
import {ProfilePage} from '../profile-page/profile-page';
import {AuthService} from '../../providers/auth-service';
import {VoteService} from '../../providers/vote-service';


@Component({
  templateUrl: 'item-details.html',
  providers:   [PollService, AuthService, VoteService]
})
export class ItemDetailsPage {
  public selectedItem: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private pollService: PollService,
              private voteService: VoteService) {
    this.selectedItem = {};
    this.getPollByID(navParams.get('id'));
  }

  public getPollByID(id: string) {
    this.pollService.getPollByID(id)
      .then(res => {
        this.selectedItem = res || {};
        console.log(this.selectedItem);
      });
  }

  public goToVote() {
    this.navCtrl.push(VotePage, {
      item: this.selectedItem
    });
  }

  public goToDelegate() {
    console.log(this.selectedItem);
    this.navCtrl.push(DelegatePage, {
      pollId: this.selectedItem.pollID
    });
  }

  public gotoProfile(item) {
    this.navCtrl.push(ProfilePage, {
      item: item
    });
  }
}
