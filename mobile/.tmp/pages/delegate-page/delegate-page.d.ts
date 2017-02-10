import { AuthService } from '../../providers/auth-service';
import { NavParams, ToastController } from 'ionic-angular/index';
export declare class DelegatePage {
    private authService;
    private navParams;
    private toastCtrl;
    constructor(authService: AuthService, navParams: NavParams, toastCtrl: ToastController);
    loadUsers(): void;
    delegate(): void;
    gotoProfile(event: any, item: any): void;
}
