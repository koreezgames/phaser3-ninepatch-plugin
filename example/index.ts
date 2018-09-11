/// <reference path="../definitions/phaser.d.ts" />

import "phaser";
import { NinePatchPlugin } from "../src/com/koreez/plugin/NinePatchPlugin";
import { NinePatch } from "../src/com/koreez/plugin/ninepatch/NinePatch";

export default class Game extends Phaser.Game {
    public centerX: number;
    public centerY: number;
    constructor(config: GameConfig) {
        super(config);
    }
}

function preload() {
    console.log("preload");
    this.load.image("metalPanel_blueCorner", "static/assets/metalPanel_blueCorner.png");
    this.load.image("squareGreen", "static/assets/squareGreen.png");
    this.load.image("squareYellow", "static/assets/squareYellow.png");
}

function create() {
    console.log("create");
    // We specify the x and y position, the width and height and the key for the image of the image.
    // It will be automatically scaled!
    const metalPanel = this.add.ninePatch(200, 200, 300, 300, "metalPanel_blueCorner", null, {
        bottom: 11, // Amount of pixels for bottom
        left: 11, // Amount of pixels for left
        right: 53, // Amount of pixels for right
        top: 32 // Amount of pixels for top
    });
    let metalPanelDir = 0.5;
    this.tweens.add({
        /* tslint:disable */
        targets: metalPanel,
        duration: 3000,
        y: 190,
        onUpdate: (tween: any) => {
            metalPanel.resize(metalPanel.width + metalPanelDir, metalPanel.height + metalPanelDir);
        },
        onYoyo: (tween: any) => {
            metalPanelDir = -1 * metalPanelDir;
        },
        onRepeat: (tween: any) => {
            metalPanelDir = -1 * metalPanelDir;
        },
        repeat: -1,
        yoyo: true
        /* tslint:enable */
    });

    let squareGreen = this.make.ninePatch({
        /* tslint:disable */
        key: "squareGreen",
        width: 100,
        height: 50,
        patchesConfig: {
            bottom: 14, // Amount of pixels for bottom
            left: 6, // Amount of pixels for left
            right: 6, // Amount of pixels for right
            top: 10 // Amount of pixels for top
        }
        /* tslint:enable */
    });

    squareGreen.x = 450;
    squareGreen.y = 50;
    this.add.existing(squareGreen);
    let squareGreenDir = 1;
    this.tweens.add({
        /* tslint:disable */
        targets: squareGreen,
        duration: 3000,
        x: 550,
        onUpdate: (tween: any) => {
            squareGreen.resize(squareGreen.width + squareGreenDir, squareGreen.height);
        },
        onYoyo: (tween: any) => {
            squareGreenDir = -1 * squareGreenDir;
        },
        onRepeat: (tween: any) => {
            squareGreenDir = -1 * squareGreenDir;
        },
        repeat: -1,
        yoyo: true
        /* tslint:enable */
    });

    this.cache.custom.ninePatch.add("squareYellow", {
        /* tslint:disable */
        bottom: 14, // Amount of pixels for bottom
        left: 6, // Amount of pixels for left
        right: 6, // Amount of pixels for right
        top: 10 // Amount of pixels for top
        /* tslint:enable */
    });

    const squareYellow = this.add.ninePatch(550, 500, 300, 100, "squareYellow");
    let squareYellowDir = 0.5;
    this.tweens.add({
        /* tslint:disable */
        targets: squareYellow,
        duration: 3000,
        x: 150,
        repeat: -1,
        yoyo: true,
        onUpdate: (tween: any) => {
            squareYellow.resize(squareYellow.width + squareYellowDir, squareYellow.height);
        },
        onYoyo: (tween: any) => {
            squareYellowDir = -1 * squareYellowDir;
        },
        onRepeat: (tween: any) => {
            squareYellowDir = -1 * squareYellowDir;
        }
        /* tslint:enable */
    });

    // Or we use the Constructor
    const newNinePatch = new NinePatch(this, 630, 300, 200, 50, "squareGreen", null, {
        /* tslint:disable */
        bottom: 14, // Amount of pixels for bottom
        left: 6, // Amount of pixels for left
        right: 6, // Amount of pixels for right
        top: 10 // Amount of pixels for top
        /* tslint:enable */
    });
    this.add.existing(newNinePatch);
    let newNinePatchDir = 0.5;
    this.tweens.add({
        /* tslint:disable */
        targets: newNinePatch,
        duration: 3000,
        rotation: Math.PI,
        repeat: -1,
        yoyo: true,
        onUpdate: (tween: any) => {
            newNinePatch.resize(newNinePatch.width + newNinePatchDir, newNinePatch.height);
        },
        onYoyo: (tween: any) => {
            newNinePatchDir = -1 * newNinePatchDir;
        },
        onRepeat: (tween: any) => {
            newNinePatchDir = -1 * newNinePatchDir;
        }
        /* tslint:enable */
    });
}

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        const config = {
            banner: false,
            height: 600,
            plugins: {
                global: [{ key: "NinePatchPlugin", plugin: NinePatchPlugin, start: true }]
            },
            scene: {
                create,
                preload
            },
            type: Phaser.AUTO,
            width: 800
        };
        (window as any).game = new Game(config);
    }
};
