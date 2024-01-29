export class SoundController {
    constructor() {
        this.space = document.getElementById('space');
        this.explosionEnemy = document.getElementById('explosionEnemy');
        this.explosionBoss = document.getElementById('explosionBoss');
        this.cooldown = document.getElementById('cooldown');
        this.laser = document.getElementById('laser');
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

    Cooldown() {
        this.cooldown.currentTime = 0;
        this.cooldown.volume = 0.1;
        this.cooldown.play();
    }

    Laser() {
        this.laser.loop = true;
        this.laser.volume = 0.1;
        this.laser.play();
    }
}