import { Component } from '@angular/core';
import {AuthService} from '../../providers/auth-service';


@Component({
    templateUrl: 'profile-page.html',
    providers: [AuthService]
})
export class ProfilePage {
    profile: any;
    constructor(private authService: AuthService) {
        this.profile = authService.currentUser;
    }


}
