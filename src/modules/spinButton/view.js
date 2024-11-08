import {View} from "../../utils/view";
import {Assets, Point, Sprite} from "pixi.js";
import {GLOBAL_SCALE} from "../../app/app";


export class GameSpinButtonView extends View {
    constructor(parent) {
        super(parent);

        this.createSpinButton();
    }

    createSpinButton() {
        this.spinButton = new Sprite({
            texture: Assets.get("spinButton"),
            anchor: .5,
            interactive: true,
            cursor: "pointer"
        })
        this.addChild(this.spinButton);

        this.setPositionSpinButton()
    }

    onResize() {
        this.scale.set(GLOBAL_SCALE)
        this.position.set(window.innerWidth / 2, window.innerHeight / 2)

        this.setPositionSpinButton();
    }

    setPositionSpinButton() {
        const glPos = new Point(window.innerWidth / 2, window.innerHeight - this.spinButton.height / 2);
        const pos = this.toLocal(glPos);
        this.spinButton.position.set(pos.x, pos.y);
    }

}