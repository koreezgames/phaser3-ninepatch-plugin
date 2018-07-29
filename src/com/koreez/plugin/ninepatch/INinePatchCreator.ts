import NinePatch from "./NinePatch";

export default interface INinePatchCreator extends Phaser.GameObjects.GameObjectCreator {
    ninePatch: (config: any, addToScene: boolean) => NinePatch;
}
