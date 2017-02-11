import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login-page/login-page';
//import { VotePage } from '../pages/vote-page/vote-page';
//import { DelegatePage } from '../pages/delegatepage/delegatepage';
import { ProfilePage } from '../pages/profile-page/profile-page';
import { HistoryPage } from '../pages/history-page/history-page';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  //rootPage: any = HelloIonicPage;
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Profile Page', component: ProfilePage },
      { title: 'Upcoming Polls', component: ListPage },
      { title: 'History', component: HistoryPage },
//      { title: 'Vote', component: VotePage },
//      { title: 'Delegate Page', component: DelegatePage },
      { title: 'Logout', component: LoginPage }

    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
