export class Projectile {
    constructor() {
        this.width = 4;
        this.height = 20;
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
        }
    }
    start() {
        this.free = false;
    }
    reset() {
        this.free = true;
    }
}