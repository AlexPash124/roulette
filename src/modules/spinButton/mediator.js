import {BaseMediator} from "../../utils/mediator";
import {SpinButtonNotification} from "./notification";

export class GameSpinButtonMediator extends BaseMediator {
    constructor() {
        super();

        this.mapUINotification()
    }

    mapUINotification() {
        this.mapNotification(SpinButtonNotification.SPIN_BUTTON_PRESSED, (data)=> {
            //this.sendNotification(SPIN_BUTTON_PRESSED)
        })
    }
}