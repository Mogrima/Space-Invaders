"use strict";

import { Game } from "./src/Game.js";

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const startDisplay = this.document.getElementById('startDisplay');
    const startButton = this.document.getElementById('startButton');
    canvas.width = 600;
    canvas.height = 700;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.font = '30px Impact';

    const game = new Game(canvas);
    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx, deltaTime);
        requestAnimationFrame(animate);
    }


    function startGame() {
        startDisplay.style.display = 'none';
        lastTime = 0;
        game.restart();
        animate(0);
    }

    startButton.addEventListener('click', startGame);
});