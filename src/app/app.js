import * as PIXI from "pixi.js";
import {manifest} from "../manifest";
import {Assets} from "pixi.js";
import {GameMediatorBG} from "../modules/bg/mediator";
import {GameBgView} from "../modules/bg/view";

export let GLOBAL_SCALE = 1

export class App extends PIXI.Application {
    constructor(data) {
        super(data)
        this.loadAssets()

        this.resizeEvent()
        this.scaleContent()
    }

    async loadAssets() {
        await Assets.init({ manifest });
        for (const bundle of manifest.bundles) {
            await Assets.loadBundle(bundle.name);
        }

        this.bgContainer = new PIXI.Container();
        this.stage.addChild(this.bgContainer);
        this.registerModule(GameMediatorBG, GameBgView, this.bgContainer);
    }

    registerModule(mediator, view, parentForView) {
        const instanceMediator = new mediator()
        instanceMediator.initView(view, parentForView);
    }

    resizeEvent() {
        window.addEventListener('resize', () => {
            setTimeout(()=> {
                this.scaleContent();
            }, 50)
        });
    }

    scaleContent() {
        const pixelRatio = window.devicePixelRatio || 1;

        // Визначаємо масштаб для канвасу з урахуванням pixelRatio
        const scaleX = window.innerWidth * pixelRatio / 1920;
        const scaleY = window.innerHeight * pixelRatio / 1920;

        GLOBAL_SCALE = Math.min(scaleX, scaleY);
    }
}