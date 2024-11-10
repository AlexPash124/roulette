import {BaseMediator} from "../../utils/mediator";
import {RouletteNotification} from "./notification";

export class GameRouletteMediator extends BaseMediator {
    constructor() {
        super();

        this.mapUINotification();
        this.notificationOutside();
    }

    mapUINotification() {
        // this.mapNotification(SpinButtonNotification.SPIN_BUTTON_PRESSED, (data)=> {
        //     //this.sendNotification(SPIN_BUTTON_PRESSED)
        // })
    }

    notificationOutside() {
        this.mapNotification(RouletteNotification.PLAY_ROULETTE, (data)=> {
            const secor  = this.proxy.getRandomSector()
            this.view.playAnimation(secor)
        })
    }
}