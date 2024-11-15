import {BaseMediator} from "../../utils/mediator";
import {SpinButtonNotification} from "./notification";
import {RouletteNotification} from "../roulette/notification";
import {GameNotification} from "../../app/notification";
import {setAnimationTimeoutSync} from "../../utils/helperFunction";
import {PreloaderNotification} from "../preloader/notification";

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
        this.mapNotification(GameNotification.RESET_GAME, async () => {
            await setAnimationTimeoutSync(2.5);
            this.view.setInteractiveSpinButton(true);
        });

        this.mapNotification(PreloaderNotification.HIDE_PRELOADER_COMPLETED, async (data)=> {
            await setAnimationTimeoutSync(.5);
            this.view.setInteractiveSpinButton(true);
        });
    }
}