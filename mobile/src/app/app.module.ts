import { NgModule } from '@angular/core';
import {IonicApp, IonicModule, ToastController} from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login-page/login-page';
import {AuthService} from '../providers/auth-service';
import {PollService} from '../providers/poll-service';
import { VotePage } from '../pages/vote-page/vote-page';
import { DelegatePage } from '../pages/delegate-page/delegate-page';
import { ProfilePage } from '../pages/profile-page/profile-page';
import { HistoryPage } from '../pages/history-page/history-page';

@NgModule({
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
export class AppModule {}
