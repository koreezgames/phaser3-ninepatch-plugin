import Phaser from 'phaser';
import IPatchesConfig, { normalizePatchesConfig } from './IPatchesConfig';

export default class NinePatch extends Phaser.GameObjects.RenderTexture {
  private static readonly __BASE: string = '__BASE';
  private static readonly patches: string[] = [
    '[0][0]',
    '[1][0]',
    '[2][0]',
    '[0][1]',
    '[1][1]',
    '[2][1]',
    '[0][2]',
    '[1][2]',
    '[2][2]',
  ];

  private originTexture: Phaser.Textures.Texture;
  private originFrame: Phaser.Textures.Frame;
  private textureXs: number[];
  private textureYs: number[];
  private finalXs: number[];
  private finalYs: number[];
  private config: IPatchesConfig;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    key: string,
    frame?: string | number,
    config?: IPatchesConfig,
  ) {
    super(scene, x, y, width, height);
    this.setOrigin(0.5, 0.5);
    this.config =
      config || this.scene.cache.custom.ninePatch.get(frame ? `${frame}` : key);
    normalizePatchesConfig(this.config);
    this.originTexture = this.scene.textures.get(key);
    this.originFrame =
      (this.originTexture.frames as any)[frame] ||
      (this.originTexture.frames as any)[NinePatch.__BASE];
    this.configurePatches(this.config);
    this.drawPatches();
  }

  public resize(width: number, height: number): this {
    if (this.width === width && this.height === height) {
      return;
    }
    super.resize(width, height);
    this.configurePatches(this.config);
    this.drawPatches();
    return this;
  }

  private configurePatches(config: any): void {
    // The positions we want from the base texture
    this.textureXs = [
      0,
      config.left,
      this.originFrame.width - config.right,
      this.originFrame.width,
    ];
    this.textureYs = [
      0,
      config.top,
      this.originFrame.height - config.bottom,
      this.originFrame.height,
    ];

    // These are the positions we need the eventual texture to have
    this.finalXs = [0, config.left, this.width - config.right, this.width];
    this.finalYs = [0, config.top, this.height - config.bottom, this.height];
  }

  private drawPatches(): void {
    let patchIndex: number = 0;
    for (let yi: number = 0; yi < 3; yi++) {
      for (let xi: number = 0; xi < 3; xi++) {
        const patch: Phaser.Textures.Frame = this.createPatchFrame(
          NinePatch.patches[patchIndex],
          this.textureXs[xi], // x
          this.textureYs[yi], // y
          this.textureXs[xi + 1] - this.textureXs[xi], // width
          this.textureYs[yi + 1] - this.textureYs[yi], // height
        );
        this.save();
        this.translate(this.finalXs[xi], this.finalYs[yi]);
        this.scale(
          (this.finalXs[xi + 1] - this.finalXs[xi]) / patch.width,
          (this.finalYs[yi + 1] - this.finalYs[yi]) / patch.height,
        );
        (this as any).draw(patch.texture, patch, 0, 0);
        this.restore();
        ++patchIndex;
      }
    }
  }

  private createPatchFrame(
    patch: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ): Phaser.Textures.Frame {
    const name: string = `${this.originFrame.name}|${patch}`;
    if (!this.originTexture.frames.hasOwnProperty(name)) {
      return this.originTexture.add(
        name,
        this.originFrame.sourceIndex,
        this.originFrame.x + x,
        this.originFrame.y + y,
        width,
        height,
      );
    }
    return (this.originTexture.frames as any)[name];
  }
}
