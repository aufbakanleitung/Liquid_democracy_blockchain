import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProfilePage } from '../profile-page/profile-page';

/*
  Generated class for the HistoryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-history-page',
  templateUrl: 'history-page.html'
})
export class HistoryPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello HistoryPage Page');
  }


gotoProfile(event, item){
    this.navCtrl.push(ProfilePage, {
        item: item
    });
  }

}
