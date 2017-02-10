import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
export declare class AuthService {
    private http;
    currentUser: any;
    constructor(http: Http);
    delegate(userId: string, pollId: string): any;
    login(username: any, password: any): any;
    getAllUsers(): any;
    getToken(): string;
    logout(): void;
    isLoggedIn(): any;
}
