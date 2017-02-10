import { Component } from '@angular/core';
import { ProfilePage } from '../profile-page/profile-page';
import {AuthService} from '../../providers/auth-service';
import {NavParams, ToastController} from 'ionic-angular/index';


@Component({
  templateUrl: 'delegate-page.html'
})
export class DelegatePage {

  constructor(private authService: AuthService, private navParams: NavParams, private toastCtrl: ToastController) {
    this.loadUsers();
    this.pollId = navParams.get('pollId');
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe(users => {
      this.users = users
    });
  }
  
  delegate() {
    this.authService.delegate(this.selectedUser, this.pollId).subscribe(res => {
      this.delegated = true;
      let toast = this.toastCtrl.create({
        message: 'Your vote has been delegated.',
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
