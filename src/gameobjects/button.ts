import kctx from '@/lib/kctx';
import { ColorComp, GameObj, TextComp, Vec2 } from 'kaboom';

function onHoverHandler(this: GameObj<ColorComp>) {
  this.color = kctx.YELLOW;
  kctx.setCursor('pointer');

  const text = this.children[0] as GameObj<TextComp>;
  text.textTransform = {
    color: kctx.BLACK,
  };
}

function onHoverEndHandler(this: GameObj<ColorComp>) {
  this.color = kctx.BLACK;
  kctx.setCursor('auto');

  const text = this.children[0] as GameObj<TextComp>;
  text.textTransform = {
    color: kctx.WHITE,
  };
}

function createButton(options: {
  text: string;
  pos: Vec2;
  onClick: () => void;
  size: {
    w: number;
    h: number;
  };
}) {
  const { text, pos, size, onClick } = options;
  const background = kctx.add([
    kctx.rect(size.w, size.h, {
      radius: 5,
    }),
    kctx.outline(2, kctx.YELLOW),
    kctx.color(kctx.BLACK),
    kctx.pos(pos),
    kctx.anchor('center'),
    kctx.area(),
  ]);

  background.onHover(onHoverHandler.bind(background));
  background.onHoverEnd(onHoverEndHandler.bind(background));

  background.onClick(onClick);

  background.add([
    kctx.text(text, {
      width: background.width,
      align: 'center',
    }),
    kctx.anchor('center'),
  ]);

  return background;
}

export default createButton;
