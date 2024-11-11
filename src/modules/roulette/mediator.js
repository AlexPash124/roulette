import {BaseMediator} from "../../utils/mediator";
import {RouletteNotification} from "./notification";
import {PopupNotification} from "../popup/notification";
import {GameNotification} from "../../app/notification";

export class GameRouletteMediator extends BaseMediator {
    constructor() {
        super();

        this.mapUINotification();
        this.notificationOutside();
    }

    mapUINotification() {
        this.mapNotification(RouletteNotification.ANIMATION_COMPLETED, (data) => {
            this.sendNotification(PopupNotification.SHOW_POPUP, data);
        })
    }

    notificationOutside() {
        this.mapNotification(RouletteNotification.PLAY_ROULETTE, (data) => {
            const secor = this.proxy.getRandomSector();
            this.view.playAnimation(secor);
        });

        this.mapNotification(GameNotification.RESET_GAME, () => {
            this.view.reset();
        });
    }
}