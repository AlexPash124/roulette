import {BaseMediator} from "../../utils/mediator";
import {SpinButtonNotification} from "./notification";
import {RouletteNotification} from "../roulette/notification";

export class GameSpinButtonMediator extends BaseMediator {
    constructor() {
        super();

        this.mapUINotification()
    }

    mapUINotification() {
        this.mapNotification(SpinButtonNotification.SPIN_BUTTON_PRESSED, (data)=> {
            this.sendNotification(RouletteNotification.PLAY_ROULETTE);
        });
    }
}