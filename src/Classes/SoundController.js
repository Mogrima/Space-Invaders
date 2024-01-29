export class SoundController {
    constructor() {
        this.space = document.getElementById('space');
    }
    mainSound() {
        this.space.currentTime = 0;
        this.space.loop = true;
        this.space.volume = 0.1;
        this.space.play();
    }
}