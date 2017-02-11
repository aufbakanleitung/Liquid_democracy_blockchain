var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login-page/login-page';
//import { VotePage } from '../pages/vote-page/vote-page';
//import { DelegatePage } from '../pages/delegatepage/delegatepage';
import { ProfilePage } from '../pages/profile-page/profile-page';
import { HistoryPage } from '../pages/history-page/history-page';
var MyApp = (function () {
    function MyApp(platform, menu) {
        this.platform = platform;
        this.menu = menu;
        // make HelloIonicPage the root (or first) page
        //rootPage: any = HelloIonicPage;
        this.rootPage = LoginPage;
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
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        MenuController])
], MyApp);
export { MyApp };
