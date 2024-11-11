import {BaseMediator} from "../../utils/mediator";
import {PopupNotification} from "./notification";
import {GameNotification} from "../../app/notification";

export class GamePopupMediator extends BaseMediator {

    constructor() {
        super();

        this.notificationOutside();
        this.mapUINotification()
    }
    notificationOutside() {
        this.mapNotification(PopupNotification.SHOW_POPUP, (data)=> {
            this.view.updateText(this.proxy.getTextByBet(data.data.data))
        })
    }

    mapUINotification() {
        this.mapNotification(PopupNotification.SHOW_POPUP_COMPLETED, (data)=> {
            this.sendNotification(GameNotification.RESET_GAME)
        })
    }
}