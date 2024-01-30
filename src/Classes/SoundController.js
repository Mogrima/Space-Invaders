import Volume from "../Settings.js";

export class SoundController {
    constructor() {
        this.space = document.getElementById('space');
        this.explosionEnemy = document.getElementById('explosionEnemy');
        this.explosionBoss = document.getElementById('explosionBoss');
        this.cooldown = document.getElementById('cooldown');
        this.laser = document.getElementById('laser');
        this.volume = new Volume();
    }

    mainSound() {
        this.space.currentTime = 0;
        this.space.loop = true;
        this.space.volume = this.volume.soundValue / 100;
        this.space.play();
    }

    SmallExplosion() {
        this.explosionEnemy.currentTime = 0;
        this.explosionEnemy.volume = this.volume.explosionEnemyValue / 100;
        this.explosionEnemy.play();
    }

    BigExplosion() {
        this.explosionBoss.currentTime = 0;
        this.explosionBoss.volume = this.volume.explosionBossValue / 100;
        this.explosionBoss.play();
    }

    Cooldown() {
        this.cooldown.currentTime = 0;
        this.cooldown.volume = 0.1;
        this.cooldown.play();
    }

    Laser() {
        this.laser.loop = true;
        this.laser.volume = this.volume.laserValue / 100;
        this.laser.play();
    }
}