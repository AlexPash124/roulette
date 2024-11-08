import {Container} from "pixi.js";
import {GLOBAL_EMITTER} from "./eventEmitter";
import {GLOBAL_SCALE} from "../app/app";

export class View extends Container {
    constructor(parent) {
        super();
        this.initEmitter()
        this.addEventListenerResize()
    }

    initEmitter() {
        this.emitter = GLOBAL_EMITTER
    }

    notifyToMediator(data) {
        this.emitter.emit("notification", {data});
    }

    addEventListenerResize() {
        window.addEventListener("resize", () => {
            setTimeout(() => {
                this.onResize()
            }, 50)
        })
    }

    onResize() {
        console.error(GLOBAL_SCALE)
        this.scale.set(GLOBAL_SCALE)
    }

    isLandScape() {
        return screen.width > screen.height
    }
}