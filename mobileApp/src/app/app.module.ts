import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { Page2 } from '../pages/page2/page2';
import { ProfilePage } from '../pages/profile-page/profile-page';
import { DelegatePage } from '../pages/delegate-page/delegate-page';
import { HistoryPage } from '../pages/history-page/history-page';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { VotePage } from '../pages/vote-page/vote-page';

@NgModule({
  declarations: [
    MyApp,
    Page2,
    DelegatePage,
    HistoryPage,
    ProfilePage,
    Login,
    ListPage,
    ItemDetailsPage,
    VotePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page2,
    DelegatePage,
    HistoryPage,
    ProfilePage,
    Login,
    ListPage,
    ItemDetailsPage,
    VotePage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]

})
export class AppModule {}
