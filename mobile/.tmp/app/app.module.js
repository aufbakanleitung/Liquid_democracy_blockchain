var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, ToastController } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login-page/login-page';
import { AuthService } from '../providers/auth-service';
import { PollService } from '../providers/poll-service';
import { VotePage } from '../pages/vote-page/vote-page';
import { DelegatePage } from '../pages/delegate-page/delegate-page';
import { ProfilePage } from '../pages/profile-page/profile-page';
import { HistoryPage } from '../pages/history-page/history-page';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            LoginPage,
            HelloIonicPage,
            ItemDetailsPage,
            ListPage,
            VotePage,
            DelegatePage,
            ProfilePage,
            HistoryPage
        ],
        imports: [
            IonicModule.forRoot(MyApp)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            LoginPage,
            HelloIonicPage,
            ItemDetailsPage,
            ListPage,
            VotePage,
            DelegatePage,
            ProfilePage,
            HistoryPage
        ],
        providers: [AuthService, PollService, ToastController]
    })
], AppModule);
export { AppModule };
