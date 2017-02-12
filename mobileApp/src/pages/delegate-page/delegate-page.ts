import {Component} from '@angular/core';
import {ProfilePage} from '../profile-page/profile-page';
import {NavController} from 'ionic-angular';
import {NavParams, ToastController} from 'ionic-angular/index';
import {VoteService} from '../../providers/vote-service';
import {UserService} from '../../providers/users-service';
import {PollService} from '../../providers/poll-service';
import {AuthService} from '../../providers/auth-service';


@Component({
  templateUrl: 'delegate-page.html',
  providers:   [VoteService, AuthService, PollService, UserService]
})
export class DelegatePage {
  private pollId: string;
  private delegated: boolean;
  private selectedUser: string;
  public allUsers: any;

  constructor(private voteService: VoteService,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private userService: UserService,
              public navCtrl: NavController,) {
    this.getAllUsers();
    this.pollId = navParams.get('pollId');
  }

  public getAllUsers() {
    console.log("getting all users");
    this.userService.getAllUsers()
      .then(res => {
        console.log(res);
        this.allUsers = res || {};
        console.log(this.allUsers);
      });
  }

  public delegateVote() {
    console.log(this.selectedUser);
    console.log(this.pollId);
    this.voteService.delegateVote(this.selectedUser, this.pollId).then(res => {
      // this.voted = true;
    });
  }

  public gotoProfile(event, item) {
    this.navCtrl.push(ProfilePage, {
      item: item
    });
  }
}
