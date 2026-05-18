export class Engine {
    constructor(updateCallback) {
        this.isRunning = false;
        this.lastTime = 0;
        this.updateCallback = updateCallback;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.loop(this.lastTime);
    }

    stop() {
        this.isRunning = false;
    }

    loop = (currentTime) => {
        if (!this.isRunning) return;

        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Limitar el delta time máximo para evitar saltos bruscos
        const clampedDelta = Math.min(deltaTime, 0.1);

        this.updateCallback(clampedDelta);

        requestAnimationFrame(this.loop);
    }
}
