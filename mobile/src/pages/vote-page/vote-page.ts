import { Component } from '@angular/core';
import {PollService} from '../../providers/poll-service';
import {NavParams, NavController, ToastController} from 'ionic-angular/index';

import { ProfilePage } from '../profile-page/profile-page';


@Component({
  templateUrl: 'vote-page.html'
})
export class VotePage {
  private voting:string;
  private poll: any;
  private voted: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pollService: PollService, public toastCtrl: ToastController) {
    this.poll = navParams.get('item');
    console.log(this.poll)
  }
  
  finalVote() {
    this.pollService.vote(this.poll.id, this.voting).subscribe(res => {
      this.voted = true;
      let toast = this.toastCtrl.create({
        message: 'Your vote has been registered to the blockchain.',
        duration: 3000
      });
      toast.present();
    });
  }

    gotoProfile(event, item){
        this.navCtrl.push(ProfilePage, {
            item: item
        });
      }
}
