export class ModeloOnda {
    constructor() {
        this.amplitud = 50; // En unidades visuales
        this.frecuencia = 2; // En Hz
        this.velocidad = 343; // Velocidad del sonido m/s
        this.tiempo = 0;
    }

    actualizar(tiempoDelta, factorVelocidad = 1) {
        this.tiempo += tiempoDelta * factorVelocidad;
        
        // Evitar que el tiempo crezca infinitamente
        const periodo = 1 / this.frecuencia;
        if (this.tiempo > periodo * 100) {
            this.tiempo = this.tiempo % periodo;
        }
    }

    setFrecuencia(f) {
        this.frecuencia = f;
    }

    setAmplitud(a) {
        this.amplitud = a;
    }

    get omega() {
        return 2 * Math.PI * this.frecuencia;
    }

    get longitudOnda() {
        return this.velocidad / this.frecuencia;
    }

    get k() {
        return (2 * Math.PI) / this.longitudOnda;
    }

    // Ecuación de Presión: P(x,t) = A * sin(kx - wt)
    getPresionEn(x) {
        return this.amplitud * Math.sin(this.k * x - this.omega * this.tiempo);
    }

    // Desplazamiento longitudinal de partículas: x' = A * cos(kx - wt)
    getDesplazamientoEn(x) {
        return this.amplitud * Math.cos(this.k * x - this.omega * this.tiempo);
    }
}
