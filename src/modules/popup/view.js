import {View} from "../../utils/view";
import {Assets, Point, Sprite, TextStyle, Text, Graphics} from "pixi.js";
import gsap from 'gsap';
import {setAnimationTimeoutSync} from "../../utils/helperFunction";
import {PopupNotification} from "./notification";

export class GamePopupView extends View {
    constructor(parent) {
        super(parent);

        this.createBg();
        this.createTextInfo();
    }

    createBlackBg() {
        const width = Math.max(window.innerWidth, window.innerHeight);
        this.blackBg = new Graphics();
        this.blackBg.beginFill(0x111);
        this.blackBg.drawRect(0, 0, width, width);
        this.blackBg.endFill();
        this.addChild(this.blackBg);
        this.blackBg.alpha = 0;
    }

    createBg() {
        this.bg = new Sprite({
            texture: Assets.get("bgPopup"),
            anchor: .5,
            alpha: 0,
        });
        this.addChild(this.bg);
    }

    createTextInfo() {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 50,
            fontWeight: 'bold',
            fill: "#123",
            wordWrap: true,
            wordWrapWidth: 700,
        });

        this.richText = new Text({
            text: "Bet dropped: ",
            style,
            anchor: .5
        });

        this.bg.addChild(this.richText);
    }

    onResize() {
        super.onResize()

        this.setPositionRoulette();
    }

    setPositionRoulette() {
        const glPos = new Point(window.innerWidth / 2, window.innerHeight / 2);
        const pos = this.toLocal(glPos);
        this.bg.position.set(pos.x, pos.y);
    }

    async updateText(bet) {
        this.richText.text = "Bet dropped: " + bet;

        this.showPopup();
        await setAnimationTimeoutSync(3);
        this.hidePopup();
    }

    showPopup() {
        gsap.timeline()
            .to(this.bg, {
                duration: .5,
                alpha: 1,
                ease: "power2.out",
                onComplete: ()=> {
                    this.notifyToMediator(PopupNotification.SHOW_POPUP_COMPLETED);
                }
            });
    }

    hidePopup() {
        gsap.timeline()
            .to(this.bg, {
                duration: .3,
                alpha: 0,
                ease: "power2.out",
            });
    }
}