export default class Volume {
    constructor() {
        this.sound = document.getElementById('sound');
        this.soundValue = 10;
        this.explosionEnemy = document.getElementById('explosionValue');
        this.explosionEnemyValue = 10;
        this.explosionBoss = document.getElementById('explosionBossValue');
        this.explosionBossValue = 20;
        this.laser = document.getElementById('laserVolume');
        this.laserValue = 10;

        this.sound.addEventListener('input', e => {
            this.soundValue = this.sound.value;
        });

        this.explosionEnemy.addEventListener('input', e => {
            this.explosionEnemyValue = this.explosionEnemy.value;
        });

        this.explosionBoss.addEventListener('input', e => {
            this.explosionBossValue = this.explosionBoss.value;
        });

        this.laser.addEventListener('input', e => {
            this.laserValue = this.laser.value;
        });
    }
}