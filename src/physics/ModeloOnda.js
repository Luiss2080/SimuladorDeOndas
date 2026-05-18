export class ModeloOnda {
    constructor() {
        this.amplitud = 50; // En unidades visuales
        this.frecuencia = 2; // En Hz
        this.velocidad = 343; // Velocidad del sonido m/s
        this.tiempo = 0;
        this.modo = 'continuo'; // 'continuo' o 'pulso'
        this.tiempoInicioPulso = 0;
    }

    actualizar(tiempoDelta, factorVelocidad = 1) {
        this.tiempo += tiempoDelta * factorVelocidad;
        
        // Evitar que el tiempo crezca infinitamente en modo continuo
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

    setModo(modo) {
        this.modo = modo;
        if (modo === 'pulso') {
            this.tiempoInicioPulso = this.tiempo;
        }
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

    // Ecuación de Presión
    getPresionEn(x) {
        if (this.modo === 'continuo') {
            return this.amplitud * Math.sin(this.k * x - this.omega * this.tiempo);
        } else {
            // MODO PULSO: Pulso gaussiano que se desplaza
            const tRelativo = this.tiempo - this.tiempoInicioPulso;
            // Simulamos la posición del centro del pulso
            const xCentro = tRelativo * 200; // Velocidad visual en pixeles/segundo
            const anchoPulso = 40; // Qué tan ancho es el pulso
            
            return this.amplitud * Math.exp(-Math.pow(x - xCentro, 2) / Math.pow(anchoPulso, 2));
        }
    }

    // Desplazamiento longitudinal de partículas
    getDesplazamientoEn(x) {
        if (this.modo === 'continuo') {
            return this.amplitud * Math.cos(this.k * x - this.omega * this.tiempo);
        } else {
            // En el pulso, las partículas se mueven en la dirección de la onda y luego regresan
            const tRelativo = this.tiempo - this.tiempoInicioPulso;
            const xCentro = tRelativo * 200;
            const anchoPulso = 40;
            
            return this.amplitud * Math.exp(-Math.pow(x - xCentro, 2) / Math.pow(anchoPulso, 2));
        }
    }
}
