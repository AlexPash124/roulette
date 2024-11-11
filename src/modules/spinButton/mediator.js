import {BaseMediator} from "../../utils/mediator";
import {SpinButtonNotification} from "./notification";
import {RouletteNotification} from "../roulette/notification";
import {GameNotification} from "../../app/notification";

export class GameSpinButtonMediator extends BaseMediator {
    constructor() {
        super();

        this.mapUINotification();
        this.notificationOutside();
    }

    mapUINotification() {
        this.mapNotification(SpinButtonNotification.SPIN_BUTTON_PRESSED, (data)=> {
            this.sendNotification(RouletteNotification.PLAY_ROULETTE);
        });
    }

    notificationOutside() {
        this.mapNotification(GameNotification.RESET_GAME, () => {
            this.view.setInteractiveSpinButton(true);
        });
    }
}