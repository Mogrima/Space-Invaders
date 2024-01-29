export class SoundController {
    constructor() {
        this.space = document.getElementById('space');
        this.explosionEnemy = document.getElementById('explosionEnemy');
        this.explosionBoss = document.getElementById('explosionBoss');
    }

    mainSound() {
        this.space.currentTime = 0;
        this.space.loop = true;
        this.space.volume = 0.1;
        this.space.play();
    }

    SmallExplosion() {
        this.explosionEnemy.currentTime = 0;
        this.explosionEnemy.play();
    }

    BigExplosion() {
        this.explosionBoss.currentTime = 0;
        this.explosionBoss.play();
    }
}