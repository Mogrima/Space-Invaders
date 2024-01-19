export class Enemy {
    constructor(game, positionX, positionY) {
        this.game = game;
        this.width = this.game.enemySize;
        this.height = this.game.enemySize;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.markedForDeletion = false;
    }

    draw(context) {
        context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
                this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(x, y) {
        this.x = x + this.positionX;
        this.y = y + this.positionY;

        this.game.projectilesPool.forEach(projectile => {
            if (!projectile.free && this.game.checkCollision(this, projectile)) {
                this.markedForDeletion = true;
                projectile.reset();
                if (!this.game.gameOver) this.game.score++;
            }
        });

        if (this.game.checkCollision(this, this.game.player)) {
            this.markedForDeletion = true;
            if (!this.game.gameOver && this.game.score > 0) {
                this.game.score--;
            }
            this.game.player.lives--;
            if (this.game.player.lives < 1) this.game.gameOver = true;
        }

        if (this.y + this.height > this.game.height) {
            this.game.gameOver = true;
            this.markedForDeletion = true;
        }
    }
}