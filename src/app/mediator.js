import {BaseMediator} from "../utils/mediator";
import {GameNotification} from "./notification";

export class GameMediator extends BaseMediator {
    resourcesLoaded() {
        this.sendNotification(GameNotification.RESOURCES_LOADED)
    }
}