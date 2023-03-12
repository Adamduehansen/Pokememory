import kctx from './kctx';
import scenes from './scenes';
import gameScene from './gameScene';
import preloadScene from './preloadScene';

const assetRoot =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

kctx.loadRoot(assetRoot);

kctx.scene(scenes.preload, preloadScene);
kctx.scene(scenes.game, gameScene);

kctx.go(scenes.preload);
