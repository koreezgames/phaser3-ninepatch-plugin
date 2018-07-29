// ------------------------------------------------------------------------------
//  Copyright (c) 2018 Koreez LLC. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../entry";

import { assert } from "chai";

import { NinePatchPlugin } from "../../../../src/com/koreez/plugin/NinePatchPlugin";

describe("Ninepatch Plugin", () => {
    it("plugin_is_properly_working", () => {
        const config = {
            banner: false,
            height: 10,
            plugins: {
                global: [{ key: "NinePatchPlugin", plugin: NinePatchPlugin, start: true }]
            },
            scene: {
                create
            },
            type: Phaser.AUTO,
            width: 10
        };
        let plugin: NinePatchPlugin;
        function create() {
            plugin = this.plugins.get("NinePatchPlugin");
            assert.isTrue(plugin);
        }
        (window as any).game = new Phaser.Game(config);
    });
});
