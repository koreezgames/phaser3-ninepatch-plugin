/// <reference path="../definitions/phaser.d.ts" />

import "phaser";

export default class Game extends Phaser.Game {
    public centerX: number;
    public centerY: number;
    constructor(config: GameConfig) {
        super(config);
    }
}

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        (window as any).game = new Game({});
    }
};
