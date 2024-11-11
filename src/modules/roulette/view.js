import {View} from "../../utils/view";
import {Assets, Point, Sprite} from "pixi.js";
import {randomInteger, setAnimationTimeoutSync} from "../../utils/helperFunction";
import gsap from 'gsap';
import {RouletteNotification} from "./notification";

export class GameRouletteView extends View {
    constructor(parent) {
        super(parent);

        this.createRouletteCircle();
        this.createBall();
        this.createSections();
    }

    createSections() {
        this.collectionSections = []
        const radius = 133;
        let angle = 0;
        const sectionsCount = 38;
        const angleStep = 360 / sectionsCount;
        const idSections = [33, 7, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1, 100, 27, 10, 25, 29, 12, 8, 19, 31,
            18, 6, 21, 26, 16, 4, 23, 35, 14, 2, 0, 20, 9, 28, 32, 11, 30];
        for (let i = 0; i < sectionsCount; i++) {
            const section = new Sprite({
                texture: Assets.get("section"),
                anchor: 0.5,
                x: radius * Math.cos(angle * Math.PI / 180),
                y: radius * Math.sin(angle * Math.PI / 180),
                scale: 0.5,
                rotation: angle,
                alpha: 0,
            });

            this.rouletteCircle.addChild(section);
            angle += angleStep;
            const sectionObject = {
                section: section,
                id: idSections[i],
            }
            this.collectionSections.push(sectionObject)
        }
    }

    createRouletteCircle() {
        this.rouletteCircle = new Sprite({
            texture: Assets.get("roulette"),
            anchor: .5,
            scale: 1.2
        });

        this.addChild(this.rouletteCircle);
        this.setPositionRoulette();
    }

    createBall() {
        this.ball = new Sprite({
            texture: Assets.get("ball"),
            anchor: .5,
            scale: .5
        });
        this.rouletteCircle.addChild(this.ball);

    }

    getSectionById(id) {
        for (let i = 0; i < this.collectionSections.length; i++) {
            if (this.collectionSections[i].id === id) return this.collectionSections[i];
        }
    }

    onResize() {
        super.onResize();

        this.setPositionRoulette();
    }

    setPositionRoulette() {
        const glPos = new Point(this.rouletteCircle.width, window.innerHeight - this.rouletteCircle.height);
        const pos = this.toLocal(glPos);
        this.rouletteCircle.position.set(pos.x, pos.y);
    }

    async playAnimation(sector) {
        const animationTime = 15;

        this.playAnimationBall(sector, animationTime);
        await setAnimationTimeoutSync(.2)
        this.playRouletteAnimation(sector, animationTime);
    }

    playRouletteAnimation(sector, animationTime) {
        this.rouletteGsap = gsap.timeline()
            .to(this.rouletteCircle, {
                rotation: -12,
                duration: animationTime,
                ease: "power4.out",
            });
    }

    playAnimationBall(sector, animationTime) {
        const endPosition = this.getSectionById(sector).section.position;
        this.ball.x = 280;
        let radius = 200;
        let angel = .09;
        let stepAngel = .1;
        let isAnimationCompleted = false;
        const timeLine = gsap.timeline()
            .to(this.ball, {
                duration: .3,
                x: radius * Math.cos(stepAngel),
                y: radius * Math.sin(stepAngel),
                onUpdate: () => {
                    this.ball.rotation += angel;
                }
            })
            .to(this.ball, {
                duration: animationTime,
                onUpdate: () => {
                    this.ball.rotation += angel;
                    stepAngel += .04;
                    const distanceToSection = Math.sqrt((this.ball.x - endPosition.x) ** 2 + (this.ball.y - endPosition.y) ** 2);
                    if (Math.abs(this.rouletteCircle.rotation * 180 / Math.PI) > 360 && distanceToSection < randomInteger(75, 90) && !isAnimationCompleted) {
                        isAnimationCompleted = true;
                        gsap.to(this.ball, {
                            duration: .6,
                            x: endPosition.x,
                            y: endPosition.y + randomInteger(0, 3),
                            onUpdate: () => {
                                this.ball.rotation += 0.0009;
                            },
                            onComplete: () => {
                                timeLine.kill();
                                setAnimationTimeoutSync(.5).then( ()=> {
                                    this.notifyToMediator(RouletteNotification.ANIMATION_COMPLETED, sector);
                                });
                            }
                        });
                    } else {
                        this.ball.x = radius * Math.cos(stepAngel);
                        this.ball.y = radius * Math.sin(stepAngel);
                    }
                },
                ease: "power4.out",
            });
    }

    reset() {
        this.ball.position.set(0, 0);
        this.ball.rotation = 0;

        this.rouletteCircle.rotation = 0;
        this.rouletteGsap.kill();
    }
}