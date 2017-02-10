import { PollService } from '../../providers/poll-service';
import { NavParams, NavController, ToastController } from 'ionic-angular/index';
export declare class VotePage {
    navCtrl: NavController;
    navParams: NavParams;
    private pollService;
    toastCtrl: ToastController;
    private voting;
    private poll;
    private voted;
    constructor(navCtrl: NavController, navParams: NavParams, pollService: PollService, toastCtrl: ToastController);
    finalVote(): void;
    gotoProfile(event: any, item: any): void;
}
