import { Laser } from "./Laser.js";

export class BigLaser extends Laser {
    constructor(game) {
        super(game);
        this.width = 25;
        this.damage = 0.7;
    }

    render(context) {
        super.render(context);
    }
}