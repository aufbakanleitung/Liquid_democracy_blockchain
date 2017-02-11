import { NavController, NavParams } from 'ionic-angular';
import { PollService } from '../../providers/poll-service';
export declare class ItemDetailsPage {
    navCtrl: NavController;
    navParams: NavParams;
    private pollService;
    selectedItem: any;
    constructor(navCtrl: NavController, navParams: NavParams, pollService: PollService);
    getOne(id: string): void;
    vote(event: any, item: any): void;
    delegate(event: any, item: any): void;
    gotoProfile(event: any, item: any): void;
}
