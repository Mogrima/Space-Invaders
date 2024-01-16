import { Player } from "./Classes/Player.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.player = new Player(this);

        window.addEventListener('keydown', e => {
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
        });
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) this.keys.splice(index, 1);
        });

    }
    render(context) {
        this.player.draw(context);
        this.player.update();
    }
}