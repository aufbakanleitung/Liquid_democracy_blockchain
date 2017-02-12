import {Component} from '@angular/core';
import {ProfilePage} from '../profile-page/profile-page';
import {NavController} from 'ionic-angular';
import {NavParams, ToastController} from 'ionic-angular/index';
import {VoteService} from '../../providers/vote-service';
import {UserService} from '../../providers/users-service';


@Component({
  templateUrl: 'delegate-page.html'
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
    this.userService.getAllUsers()
      .then(res => {
        this.allUsers = res || {};
        console.log(this.allUsers);
      });
  }

  public delegateVote() {
    this.voteService.delegateVote(this.selectedUser, this.pollId).then(res => {
      this.delegated = true;
      let toast      = this.toastCtrl.create({
        message:  'Your vote has been delegated.',
        duration: 3000
      });
      toast.present();
    });
  }

  public gotoProfile(event, item) {
    this.navCtrl.push(ProfilePage, {
      item: item
    });
  }
}
