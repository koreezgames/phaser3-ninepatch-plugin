import { NinePatch } from "./NinePatch";

export interface INinePatchCreator extends Phaser.GameObjects.GameObjectCreator {
    ninePatch: (config: any, addToScene?: boolean) => NinePatch;
}
