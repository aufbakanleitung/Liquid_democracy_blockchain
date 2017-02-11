import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder, FormGroup, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {ListPage} from '../list/list';
import { LoadingController } from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';

@Component({
  templateUrl: 'login-page.html'
})
export class LoginPage {
    username:string = 'bill';
    password:string = 'passw0rd';
    nav: NavController;
    constructor(public nav: NavController, private authService: AuthService) {
        this.nav = nav;
    }
    loginPage(){
        console.log('Login button pressed XXX');
        this.nav.setRoot(ListPage);
    }
    login() {
        console.log('login pressed xxzxx', this.username, this.password);
        //this.nav.setRoot(ListPage);
       
        this.authService.login(this.username, this.password).subscribe(res => {
            if (res) {
                console.log('logged in successfully');
                this.nav.setRoot(ListPage);
            }
            else console.log('something went wrong');
        });
    }
}
