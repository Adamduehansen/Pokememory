import kctx from './lib/kctx';
import scenes from './lib/scenes';
import gameScene from './scenes/gameScene';
import preloadScene from './scenes/preloadScene';

const assetRoot = import.meta.env.VITE_ASSET_URL;

kctx.loadSprite('card', '/images/card.png', {
  sliceX: 2,
  sliceY: 1,
});

kctx.loadRoot(assetRoot);

kctx.scene(scenes.preload, preloadScene);
kctx.scene(scenes.game, gameScene);

kctx.go(scenes.preload);
