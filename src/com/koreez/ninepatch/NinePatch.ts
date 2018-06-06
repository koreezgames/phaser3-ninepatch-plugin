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
    super(scene, x, y, Math.max(width, 2), Math.max(height, 2));
    this.setOrigin(0.5, 0.5);
    this.config =
      config || this.scene.cache.custom.ninePatch.get(frame ? `${frame}` : key);
    normalizePatchesConfig(this.config);
    this.originTexture = this.scene.textures.get(key);
    this.originFrame =
      (this.originTexture.frames as any)[frame] ||
      (this.originTexture.frames as any)[NinePatch.__BASE];
    this.drawPatches();
  }

  public resize(width: number, height: number): this {
    if (this.width === width && this.height === height) {
      return;
    }
    width = Math.max(width, this.config.left + this.config.right);
    height = Math.max(height, this.config.top + this.config.bottom);
    super.resize(width, height);
    this.drawPatches();
    return this;
  }

  private drawPatches(): void {
    // The positions we want from the base texture
    const textureXs: number[] = [
      0,
      this.config.left,
      this.originFrame.width - this.config.right,
      this.originFrame.width,
    ];
    const textureYs: number[] = [
      0,
      this.config.top,
      this.originFrame.height - this.config.bottom,
      this.originFrame.height,
    ];

    // These are the positions we need the eventual texture to have
    const finalXs: number[] = [
      0,
      this.config.left,
      this.width - this.config.right,
      this.width,
    ];
    const finalYs: number[] = [
      0,
      this.config.top,
      this.height - this.config.bottom,
      this.height,
    ];

    let patchIndex: number = 0;
    for (let yi: number = 0; yi < 3; yi++) {
      for (let xi: number = 0; xi < 3; xi++) {
        const patch: Phaser.Textures.Frame = this.createPatchFrame(
          NinePatch.patches[patchIndex],
          textureXs[xi], // x
          textureYs[yi], // y
          textureXs[xi + 1] - textureXs[xi], // width
          textureYs[yi + 1] - textureYs[yi], // height
        );
        this.save();
        this.translate(finalXs[xi], finalYs[yi]);
        this.scale(
          (finalXs[xi + 1] - finalXs[xi]) / patch.width,
          (finalYs[yi + 1] - finalYs[yi]) / patch.height,
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
        this.originFrame.cutX + x,
        this.originFrame.cutY + y,
        width,
        height,
      );
    }
    return (this.originTexture.frames as any)[name];
  }
}
