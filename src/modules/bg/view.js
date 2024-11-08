import {View} from "../../utils/view";
import {Assets, Sprite} from "pixi.js";

export class GameBgView extends View {
    constructor(parent) {
        super();
        parent.addChild(this)

        this.addChild(new Sprite({
            texture: Assets.get("bg")
        }))
    }
}