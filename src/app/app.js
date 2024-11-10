import * as PIXI from "pixi.js";
import {manifest} from "../manifest";
import {Assets} from "pixi.js";
import {GameMediatorBG} from "../modules/bg/mediator";
import {GameBgView} from "../modules/bg/view";
import {GameSpinButtonMediator} from "../modules/spinButton/mediator";
import {GameSpinButtonView} from "../modules/spinButton/view";
import {GameRouletteView} from "../modules/roulette/view";
import {GameRouletteMediator} from "../modules/roulette/mediator";

export let GLOBAL_SCALE = 1

export class App extends PIXI.Application {
    constructor(data) {
        super(data)
        this.loadAssets()
    }

    async loadAssets() {
        await Assets.init({manifest});
        for (const bundle of manifest.bundles) {
            await Assets.loadBundle(bundle.name);
        }

        this.createBg()
        this.createSpinButton()
        this.createRoulette()

        this.resizeEvent()
        this.scaleContent()
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 100)
    }

    createSpinButton() {
        this.spinButton = new PIXI.Container();
        this.stage.addChild(this.spinButton);
        this.registerModule(GameSpinButtonMediator, GameSpinButtonView, this.spinButton);
    }

    createBg() {
        this.bgContainer = new PIXI.Container();
        this.stage.addChild(this.bgContainer);
        this.registerModule(GameMediatorBG, GameBgView, this.bgContainer);
    }

    createRoulette() {
        this.rouletteContainer = new PIXI.Container();
        this.stage.addChild(this.rouletteContainer);
        this.registerModule(GameRouletteMediator, GameRouletteView, this.rouletteContainer);
    }

    registerModule(mediator, view, parentForView) {
        const instanceMediator = new mediator();
        instanceMediator.initView(view, parentForView);
    }

    resizeEvent() {
        window.addEventListener("resize", () => {
            this.scaleContent();
        });
    }

    scaleContent() {
        const contentWidth = 1920;
        const contentHeight = 1080;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const scaleX = windowWidth / contentWidth;
        const scaleY = windowHeight / contentHeight;

        const scale = Math.max(scaleX, scaleY);
        GLOBAL_SCALE = scale
    }
}