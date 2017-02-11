import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ListPage} from '../list/list';
import {AuthService} from '../../providers/auth-service';

@Component({
    templateUrl: 'login-page.html'
})
export class LoginPage {
    username: string = 'bill';
    password: string = 'passw0rd';
        // this.nav = nav;
    }

    login(event, item) {
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
