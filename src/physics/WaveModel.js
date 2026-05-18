export class WaveModel {
    constructor() {
        this.amplitude = 50; // En unidades visuales
        this.frequency = 2;   // En Hz
        this.speed = 343;     // Velocidad del sonido m/s
        this.time = 0;
    }

    update(deltaTime, speedFactor = 1) {
        this.time += deltaTime * speedFactor;
        
        // Evitar que el tiempo crezca infinitamente
        const period = 1 / this.frequency;
        if (this.time > period * 100) {
            this.time = this.time % period;
        }
    }

    setFrequency(f) {
        this.frequency = f;
    }

    setAmplitude(a) {
        this.amplitude = a;
    }

    get omega() {
        return 2 * Math.PI * this.frequency;
    }

    get wavelength() {
        return this.speed / this.frequency;
    }

    get k() {
        return (2 * Math.PI) / this.wavelength;
    }

    // Ecuación de Presión: P(x,t) = A * sin(kx - wt)
    getPressureAt(x) {
        return this.amplitude * Math.sin(this.k * x - this.omega * this.time);
    }

    // Desplazamiento longitudinal de partículas: x' = A * cos(kx - wt)
    getDisplacementAt(x) {
        return this.amplitude * Math.cos(this.k * x - this.omega * this.time);
    }
}
