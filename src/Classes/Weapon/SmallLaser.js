import { Laser } from "./Laser.js";

export class SmallLaser extends Laser {
    constructor(game) {
        super(game);
        this.width = 5;
        this.damage = 0.3;
    }

    render(context) {
        super.render(context);
    }
}