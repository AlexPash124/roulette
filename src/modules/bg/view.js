import {View} from "../../utils/view";
import {Assets, Sprite} from "pixi.js";

export class GameBgView extends View {
    constructor(parent) {
        super(parent);

        this.addChild(new Sprite({
            texture: Assets.get("bg")
        }))
    }
}