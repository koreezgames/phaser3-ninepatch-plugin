/// <reference path="../definitions/phaser.d.ts" />

import "phaser";
import { NinePatchPlugin } from "../src/com/koreez/plugin/NinePatchPlugin";

export default class Game extends Phaser.Game {
    public centerX: number;
    public centerY: number;
    constructor(config: GameConfig) {
        super(config);
    }
}

function preload() {
    console.log("preload");
    this.load.image("metalPanel_blueCorner", "assets/metalPanel_blueCorner.png");
    this.load.image("squareGreen", "assets/squareGreen.png");
}

function create() {
    console.log("create");
    this.add.ninePatch(200, 200, 300, 300, "metalPanel_blueCorner", null, {
        bottom: 11, // Amount of pixels for bottom
        left: 11, // Amount of pixels for left
        right: 53, // Amount of pixels for right
        top: 32 // Amount of pixels for top
    });
    this.add.ninePatch(60, 400, 100, 50, "squareGreen", null, {
        bottom: 14, // Amount of pixels for bottom
        left: 6, // Amount of pixels for left
        right: 6, // Amount of pixels for right
        top: 10 // Amount of pixels for top
    });
    this.add.ninePatch(230, 400, 200, 50, "squareGreen", null, {
        bottom: 14, // Amount of pixels for bottom
        left: 6, // Amount of pixels for left
        right: 6, // Amount of pixels for right
        top: 10 // Amount of pixels for top
    });

    this.add.ninePatch(200, 500, 300, 100, "squareGreen", null, {
        bottom: 14, // Amount of pixels for bottom
        left: 6, // Amount of pixels for left
        right: 6, // Amount of pixels for right
        top: 10 // Amount of pixels for top
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
            width: 400
        };
        (window as any).game = new Game(config);
    }
};
