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
    this.add.ninePatch(200, 200, 300, 300, "metalPanel_blueCorner", null, {
        bottom: 11, // Amount of pixels for bottom
        left: 11, // Amount of pixels for left
        right: 53, // Amount of pixels for right
        top: 32 // Amount of pixels for top
    });

    let ninePatch = this.make.ninePatch({
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

    ninePatch.x = 60;
    ninePatch.y = 400;
    this.add.existing(ninePatch);

    this.cache.custom.ninePatch.add("squareYellow", {
        /* tslint:disable */
        bottom: 14, // Amount of pixels for bottom
        left: 6, // Amount of pixels for left
        right: 6, // Amount of pixels for right
        top: 10 // Amount of pixels for top
        /* tslint:enable */
    });

    this.add.ninePatch(200, 500, 300, 100, "squareYellow");

    // Or we use the Constructor
    ninePatch = new NinePatch(this, 230, 400, 200, 50, "squareGreen", null, {
        /* tslint:disable */
        bottom: 14, // Amount of pixels for bottom
        left: 6, // Amount of pixels for left
        right: 6, // Amount of pixels for right
        top: 10 // Amount of pixels for top
        /* tslint:enable */
    });
    ninePatch.x = 230;
    ninePatch.y = 400;
    this.add.existing(ninePatch);

    setTimeout(() => {
        ninePatch.resize(250, 60);
        ninePatch.rotation = Math.PI / 4;
    }, 2000);
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
            width: 400
        };
        (window as any).game = new Game(config);
    }
};
