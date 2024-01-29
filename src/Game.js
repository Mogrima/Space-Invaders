import { Player } from "./Classes/Player.js";
import { Projectile } from "./Classes/Projectile.js";
import { Wave } from "./Classes/Wave.js";
import { Boss } from "./Classes/Enemies/Boss.js";

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
        this.numberOfProjectiles = 15;
        this.createProjectiles();
        this.fired = false;

        this.columns = 2;
        this.rows = 2;
        this.enemySize = 80;

        this.waves = [];
        this.waveCount = 1;
        this.bossArray = [];
        this.bossLives = 10;

        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 120;

        this.restart();

        window.addEventListener('keydown', e => {
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if (e.key === '1' && !this.fired) this.player.shoot();
            this.fired = true;
            if ((e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') &&
                this.gameOver) this.restart();
        });
        window.addEventListener('keyup', e => {
            this.fired = false;
            const index = this.keys.indexOf(e.key);
            if (index > -1) this.keys.splice(index, 1);
        });

    }
    render(context, deltaTime) {
        if (this.spriteTimer > this.spriteInterval) {
            this.spriteUpdate = true;
            this.spriteTimer = 0;
        } else {
            this.spriteUpdate = false;
            this.spriteTimer += deltaTime;
        }
        this.drawStatusText(context);
        this.projectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        });
        this.player.draw(context);
        this.player.update();
        this.bossArray.forEach(boss => {
            boss.draw(context);
            boss.update();
        });
        this.bossArray = this.bossArray.filter(object => !object.markedForDeletion);
        this.waves.forEach(wave => {
            wave.render(context);
            if (wave.enemies.length < 1 &&
                !wave.nextWaveTrigger &&
                !this.gameOver) {
                    this.newWave();
                    wave.nextWaveTrigger = true;
                }
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
        context.fillText('Wave: ' + this.waveCount, 20, 80);
        for (let i = 0; i < this.player.maxLives; i++) {
            context.strokeRect(20 + 20 * i, 100, 10, 15);
        }
        for (let i = 0; i < this.player.lives; i++) {
            context.fillRect(20 + 20 * i, 100, 10, 15);
        }
        // energy
        context.save();
        this.player.cooldown ? context.fillStyle = 'red' :
        context.fillStyle = 'gold';
        for (let i = 0; i < this.player.energy; i++) {
            context.fillRect(20 + 2 * i, 130, 2, 15);
        }
        context.restore();
        if (this.gameOver) {
            context.textAlign = 'center';
            context.font = '100px Impact';
            context.fillText('GAME OVER!', this.width * 0.5, this.height * 0.5);
            context.font = '20px Impact';
            context.fillText('Press R to restart!', this.width * 0.5, this.height * 0.5 + 30);
        }
        context.restore();
    }

    newWave() {
        this.waveCount++;
        if (this.player.lives < this.player.maxLives) this.player.lives++;
        if (this.waveCount % 2 === 0) {
            this.bossArray.push(new Boss(this, this.bossLives));

        } else {
            if (Math.random() < 0.5 &&
            this.columns * this.enemySize < this.width * 0.8) {
            this.columns++;
        } else if (this.rows * this.enemySize < this.height * 0.6) {
            this.rows++;
            }
            this.waves.push(new Wave(this));
        }
        
        this.waves = this.waves.filter(object => !object.markedForDeletion);
    }

    restart() {
        this.player.restart();
        this.columns = 2;
        this.rows = 2;
        this.waves = [];
        this.bossArray = [];
        this.bossLives = 10;
        this.waves.push(new Wave(this));
        this.waveCount = 1;
        this.score = 0;
        this.gameOver = false;
    }
}