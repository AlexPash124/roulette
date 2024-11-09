import {View} from "../../utils/view";
import {Assets, Point, Sprite} from "pixi.js";
import {GLOBAL_SCALE} from "../../app/app";
import {SpinButtonNotification} from "./notification";


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
        this.addEventForSpinButton()
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


    addEventForSpinButton() {
        this.spinButton.on("pointerdown", () => {
            this.spinButton.scale.set(.9);
        });
        this.spinButton.on("pointerover", () => {
            this.spinButton.scale.set(1.05);
        });
        this.spinButton.on("pointerout", () => {
            this.spinButton.scale.set(1);
        });
        this.spinButton.on("pointerupoutside", () => {
            this.spinButton.scale.set(1);
        });
        this.spinButton.on("pointerup", () => {
            this.spinButton.scale.set(.9);

            this.setInteractiveSpinButton(false)
            this.notifyToMediator(SpinButtonNotification.SPIN_BUTTON_PRESSED)
        });
    }

    setInteractiveSpinButton(on) {
        this.spinButton.interactive = on;

        if (on) {
            this.spinButton.alpha = 1
        } else {
            this.spinButton.alpha = 0.5
        }
    }
}