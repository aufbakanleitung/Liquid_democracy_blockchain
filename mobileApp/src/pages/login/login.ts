
import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {ListPage} from '../list/list';


@Component({
  templateUrl: 'login.html',
  providers: [AuthService]
})
export class Login {

  public username: string;
  public password: string;

  constructor(public nav: NavController, private authService: AuthService){

  }

  public login(){
    console.log('login pressed : ', this.username, this.password);

    this.authService.login(this.username, this.password)
      .then(res => {
        console.log(res);
        if (res) {
          console.log('logged in successfully');
          this.nav.setRoot(ListPage);
        }
        else console.log('something went wrong');
      });
  }

}
