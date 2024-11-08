import {View} from "../../utils/view";
import {Assets, Sprite} from "pixi.js";

export class GameBgView extends View {
    constructor(parent) {
        super(parent);

        this.bgSprite = new Sprite({
            texture: Assets.get("bg"),
            anchor: .5
        })
        this.addChild(this.bgSprite)

        this.setPositionBg();
    }

    onResize() {
        super.onResize();
        this.setPositionBg();
    }

    setPositionBg() {
        this.position.set(window.innerWidth / 2, window.innerHeight / 2);
    }
}