import {BaseMediator} from "../../utils/mediator";
import {GameNotification} from "../../app/notification";
import {setAnimationTimeoutSync} from "../../utils/helperFunction";
import {PreloaderNotification} from "./notification";

export class GamePreloaderMediator extends BaseMediator {

    constructor() {
        super();

        this.notificationOutside();
    }

    notificationOutside() {
        this.mapNotification(GameNotification.RESOURCES_LOADED, async (data)=> {
            await setAnimationTimeoutSync(1);
            this.view.hide();
            await setAnimationTimeoutSync(.5);
            this.sendNotification(PreloaderNotification.HIDE_PRELOADER_COMPLETED);
        });
    }
}