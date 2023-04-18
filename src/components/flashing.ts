import kctx from '@/lib/kctx';
import { Comp, GameObj } from 'kaboom';

export interface FlashingComp extends Comp {
  disableFlashing: boolean;
}

function flashing(
  interval: number,
  options?: {
    disable: boolean;
  }
): FlashingComp {
  let pauseFlashing = options?.disable || false;
  let animationTimer = 0;
  return {
    disableFlashing: pauseFlashing,
    update: function (this: GameObj<FlashingComp>) {
      if (this.disableFlashing) {
        this.hidden = false;
        animationTimer = 0;
        return;
      }

      animationTimer += kctx.dt();

      if (animationTimer <= interval) {
        this.hidden = true;
      } else if (animationTimer > interval && animationTimer <= interval * 2) {
        this.hidden = false;
      } else {
        animationTimer = 0;
      }
    },
  };
}

export default flashing;
