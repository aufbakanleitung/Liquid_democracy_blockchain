import {Component} from '@angular/core';
import {PollService} from '../../providers/poll-service';
import {NavParams, NavController, ToastController} from 'ionic-angular/index';

import {ProfilePage} from '../profile-page/profile-page';
import {VoteService} from '../../providers/vote-service';
import {AuthService} from '../../providers/auth-service';


@Component({
  templateUrl: 'vote-page.html',
  providers: [VoteService, AuthService, PollService]
})
export class VotePage {
  private voting: string;
  private poll: any;
  private voted: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private voteService: VoteService) {
    this.poll = navParams.get('item');
    console.log(this.poll)
  }

  public castVote() {
    this.voteService.castVote(this.poll.pollID, this.voting).then(res => {
      this.voted = true;
    });
  }

  public gotoProfile(event, item) {
    this.navCtrl.push(ProfilePage, {
      item: item
    });
  }
}
