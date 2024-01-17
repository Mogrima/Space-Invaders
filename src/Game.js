import { Player } from "./Classes/Player.js";
import { Projectile } from "./Classes/Projectile.js";
import { Wave } from "./Classes/Wave.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.score = 0;
        this.gameOver = false;
        this.player = new Player(this);

        this.projectilesPool = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();

        this.columns = 7;
        this.rows = 5;
        this.enemySize = 60;

        this.waves = [];
        this.waves.push(new Wave(this));

        window.addEventListener('keydown', e => {
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if (e.key === '1') this.player.shoot();
        });
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) this.keys.splice(index, 1);
        });

    }
    render(context) {
        this.drawStatusText(context);
        this.player.draw(context);
        this.player.update();
        this.projectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        });
        this.waves.forEach(wave => {
            wave.render(context);
        })
    }

    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectiles; i++) {
            this.projectilesPool.push(new Projectile());
        }
    }

    // get free projectile object from the pool
    getProjectile() {
        for (let i = 0; i < this.projectilesPool.length; i++) {
            if (this.projectilesPool[i].free) return this.projectilesPool[i];
        }
    }

    
    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect2.x < rect1.x + rect1.width &&
            rect1.y < rect2.y + rect2.height &&
            rect2.y < rect1.y + rect1.height);
    }

    drawStatusText(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.fillText('Score: ' + this.score, 20, 40);
        if (this.gameOver) {
            context.textAlign = 'center';
            context.font = '100px Impact';
            context.fillText('GAME OVER!', this.width * 0.5, this.height * 0.5);
        }
        context.restore();
    }
}