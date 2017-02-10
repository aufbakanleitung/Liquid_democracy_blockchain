import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
export declare class LoginPage {
    nav: NavController;
    private authService;
    username: string;
    password: string;
    nav: NavController;
    constructor(nav: NavController, authService: AuthService);
    loginPage(): void;
    login(): void;
}
