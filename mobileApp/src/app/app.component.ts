import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Login } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile-page/profile-page';
import { DelegatePage } from '../pages/delegate-page/delegate-page';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { VotePage } from '../pages/vote-page/vote-page';
import { HistoryPage } from '../pages/history-page/history-page';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'ProfilePage', component: ProfilePage },
      { title: 'VotePage', component: VotePage },
      { title: 'DelegatePage', component: DelegatePage },
      { title: 'ListPage', component: ListPage },
      { title: 'HistoryPage', component: HistoryPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
