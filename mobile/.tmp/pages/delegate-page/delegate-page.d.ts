import { AuthService } from '../../providers/auth-service';
import { NavController } from 'ionic-angular';
import { NavParams, ToastController } from 'ionic-angular/index';
export declare class DelegatePage {
    private authService;
    private navParams;
    private toastCtrl;
    navCtrl: NavController;
    private pollId;
    private delegated;
    private selectedUser;
    constructor(authService: AuthService, navParams: NavParams, toastCtrl: ToastController, navCtrl: NavController);
    loadUsers(): void;
    delegate(): void;
    gotoProfile(event: any, item: any): void;
}
