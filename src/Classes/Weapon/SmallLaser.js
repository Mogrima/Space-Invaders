import { Laser } from "./Laser.js";

export class SmallLaser extends Laser {
    constructor(game) {
        super(game);
        this.width = 5;
        this.damage = 0.3;
    }

    render(context) {
        if (this.game.player.energy > 1 && !this.game.player.cooldown) {
            super.render(context);
            this.game.player.frameX = 2;
        }
    }
}