import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
export declare class LoginPage {
    nav: NavController;
    private authService;
    username: string;
    password: string;
    constructor(nav: NavController, authService: AuthService);
    login(event: any, item: any): void;
}
