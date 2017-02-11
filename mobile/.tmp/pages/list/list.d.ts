import { NavController, NavParams } from 'ionic-angular';
import { PollService } from '../../providers/poll-service';
export declare class ListPage {
    navCtrl: NavController;
    navParams: NavParams;
    private pollService;
    selectedItem: any;
    categories: string[];
    items: Array<{
        title: string;
        category: string;
    }>;
    constructor(navCtrl: NavController, navParams: NavParams, pollService: PollService);
    itemTapped(event: any, item: any): void;
    MyCtrl($scope: any, $ionicHistory: any): void;
    gotoProfile(event: any, item: any): void;
}
