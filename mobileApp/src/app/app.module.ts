import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { Page2 } from '../pages/page2/page2';

@NgModule({
  declarations: [
    MyApp,
    Login,
    ListPage,
    Page2
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    ListPage,
    Page2
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]

})
export class AppModule {}
