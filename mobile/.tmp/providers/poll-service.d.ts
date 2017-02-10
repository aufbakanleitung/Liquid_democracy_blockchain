import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth-service';
export declare class PollService {
    http: Http;
    private authService;
    constructor(http: Http, authService: AuthService);
    getList(): any;
    getOne(id: string): any;
    vote(id: string, option: string): any;
}
