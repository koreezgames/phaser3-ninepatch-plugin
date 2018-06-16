# Phaser3 Nine Patch

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/koreezgames/phaser3-ninepatch-plugin/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/koreezgames/phaser3-ninepatch-plugin.svg)](https://github.com/koreezgames/phaser3-ninepatch-plugin)
[![David](https://david-dm.org/koreezgames/phaser3-ninepatch-plugin.svg)]() [![Project status](https://img.shields.io/badge/status-active-brightgreen.svg)](#status)
[![Code Climate](https://img.shields.io/github/issues/koreezgames/phaser3-ninepatch-plugin.svg)](https://github.com/koreezgames/phaser3-ninepatch-plugin)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Blazing Fast](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)

Phaser3 Nine Patch plugin adds 9-slice scaling support to Phaser3!

Key features:

- Blazing fast
- Low memory usage
- Easy to use API

## Getting Started

First you want to get a fresh copy of the plugin. You can get it from this repo or from npm, ain't that handy.

[![npm](https://img.shields.io/npm/dt/@koreez/phaser3-ninepatch.svg)](https://www.npmjs.com/package/@koreez/phaser3-ninepatch)

```
npm install @koreez/phaser3-ninepatch --save
```

## Usage

### Load the plugin

You still need to load the plugin in your game. This is done just like any other global plugin in Phaser3.
So, to load the plugin, include it in phaser game config.

```javascript
{
  type: Phaser.WEBGL,
  width: 540,
  height: 960,
  backgroundColor: '#626262',
  parent: 'gameContainer',
  scene: [GameScene],
  plugins: {
    global: [{ key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true }],
  },
}
```

The plugin will patch your Phaser game with additional add/make methods so the NinePatch game object fits up in Phaser like any normal object!

### Adding a container

Also adding and creating of 9-patch images is exposed through Phaser's GameObjectCreator and GameObjectFactory.
So you can add a 9-patch image to your game just like any other image once it's preloaded!

```javascript
//We specify the x and y position, the width and height and the key for the image of the image. It will be automaticly scaled!
this.add.ninePatch(100, 100, 200, 50, 'my-image');
```

Or if you'd want to do something with it first:

```javascript
//Two options here, first we use Phaser
var ninePatch = this.make.ninePatch({
  key: 'my-image',
  width: 200,
  height: 200,
});
ninePatch.x = 20;
ninePatch.y = 20;
this.add.existing(ninePatch);

//Or we use the Constructor
var ninePatch = new NinePatch(this, 0, 0, 200, 50, 'my-image');
ninePatch.x = 50;
ninePatch.y = 50;
this.add.existing(nineSlice);
```

### Using a Texture Atlas

It's also possible to use an image that's located inside a Texture atlas. The only difference then is that you don't have to preload the image, instead you use the object's constructor and pass the framedata directly on creation:

```javascript
//Add an nineslice image with an texture atlas
var ninePatch = new NinePatch(
  this, // Phaser.Scene
  150, // x position
  100, // y position
  200, // expected width
  100, // expected height
  'buttons', // atlas key
  'btn_clean.png', // Image frame
  {
    top: 20, // Amount of pixels for top
    bottom: 23, // Amount of pixels for bottom
    left: 27, // Amount of pixels for left
    right: 28, // Amount of pixels for right
  },
);
this.add.existing(ninePatch);
```

### Resize method

9-patch image has a resize method which lets you expand/shorten the width or length of the image.
When using resize method, make sure values are not lower than the width of the image corners

```javascript
var ninePatch = this.add.ninePatch(5, 5, 48, 48, 'image');
ninePatch.resize(100, 200);
```

## Credits

Big thanks to this great repo:

https://github.com/orange-games/phaser-nineslice
