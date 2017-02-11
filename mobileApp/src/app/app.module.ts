import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { Page2 } from '../pages/page2/page2';
import { ProfilePage } from '../pages/profile-page/profile-page';
import { DelegatePage } from '../pages/delegatepage/delegate-page';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    DelegatePage,
    ProfilePage
    Login,
    ListPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    DelegatePage
    ProfilePage
    Login,
    ListPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]

})
export class AppModule {}
