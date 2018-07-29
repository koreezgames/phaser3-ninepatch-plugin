import NinePatch from "./NinePatch";

export default interface INinePatchFactory extends Phaser.GameObjects.GameObjectFactory {
    ninePatch: (
        x: number,
        y: number,
        width: number,
        height: number,
        key: string,
        frame?: string | number,
        patchesConfig?: any
    ) => NinePatch;
}
