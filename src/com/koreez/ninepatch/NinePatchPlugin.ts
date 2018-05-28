import Phaser from 'phaser';
import NinePatch from './NinePatch';

export default class NinePatchPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    pluginManager.game.cache.addCustom('ninePatch');

    //  Register our new Game Object type
    pluginManager.registerGameObject(
      'ninePatch',
      this.ninePatchFactory,
      this.ninePatchCreator,
    );
  }

  private ninePatchFactory(
    x: number,
    y: number,
    width: number,
    height: number,
    key: string,
    frame?: string | number,
    patchesConfig?: any,
  ): NinePatch {
    return this.scene.add.existing(
      new NinePatch(this.scene, x, y, width, height, key, frame, patchesConfig),
    ) as NinePatch;
  }

  private ninePatchCreator(config: any, addToScene: boolean): NinePatch {
    if (config === undefined) {
      config = {};
    }

    const key: any = (Phaser.Utils as any).Objects.GetAdvancedValue(
      config,
      'key',
      null,
    );
    const frame: any = (Phaser.Utils as any).Objects.GetAdvancedValue(
      config,
      'frame',
      null,
    );
    const width: any = (Phaser.Utils as any).Objects.GetAdvancedValue(
      config,
      'width',
      null,
    );
    const height: any = (Phaser.Utils as any).Objects.GetAdvancedValue(
      config,
      'height',
      null,
    );
    const patchesConfig: any = (Phaser.Utils as any).Objects.GetAdvancedValue(
      config,
      'patchesConfig',
      null,
    );

    const ninePatch: NinePatch = new NinePatch(
      this.scene,
      0,
      0,
      width,
      height,
      key,
      frame,
      patchesConfig,
    );

    if (addToScene !== undefined) {
      config.add = addToScene;
    }

    Phaser.GameObjects.BuildGameObject(this.scene, ninePatch, config);

    return ninePatch;
  }
}
