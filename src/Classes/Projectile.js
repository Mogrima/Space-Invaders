export class Projectile {
    constructor() {
        this.width = 8;
        this.height = 40;
        this.x = 0;
        this.y = 0;
        this.speed = 20;
        this.free = true;
    }

    draw(context) {
        if (!this.free) {
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    update() {
        if (!this.free) {
            this.y -= this.speed;
            if (this.y < -this.height) this.reset();
        }
    }
    start(x, y) {
        this.free = false;
        this.x = x - this.width * 0.5;
        this.y = y;
    }
    reset() {
        this.free = true;
    }
}