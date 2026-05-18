export class GestorAudio {
    constructor() {
        this.contextoAudio = null;
        this.oscilador = null;
        this.nodoGanancia = null;
        this.estaReproduciendo = false;
    }

    inicializar() {
        this.contextoAudio = new AudioContext();
        this.nodoGanancia = this.contextoAudio.createGain();
        this.nodoGanancia.connect(this.contextoAudio.destination);
        this.nodoGanancia.gain.value = 0.1; // Volumen bajo por defecto
    }

    iniciarTono(frecuencia) {
        if (!this.contextoAudio) this.inicializar();
        
        if (this.estaReproduciendo) return;
        
        this.oscilador = this.contextoAudio.createOscillator();
        this.oscilador.type = 'sine';
        this.oscilador.frequency.value = frecuencia;
        
        this.oscilador.connect(this.nodoGanancia);
        this.oscilador.start();
        this.estaReproduciendo = true;
    }

    detenerTono() {
        if (!this.estaReproduciendo || !this.oscilador) return;
        this.oscilador.stop();
        this.oscilador.disconnect();
        this.estaReproduciendo = false;
    }

    setFrecuencia(frecuencia) {
        if (this.oscilador && this.contextoAudio) {
            // Cambio suave para evitar ruidos molestos
            this.oscilador.frequency.setTargetAtTime(frecuencia, this.contextoAudio.currentTime, 0.01);
        }
    }

    setVolumen(volumen) {
        if (this.nodoGanancia && this.contextoAudio) {
            this.nodoGanancia.gain.setTargetAtTime(volumen, this.contextoAudio.currentTime, 0.01);
        }
    }
}
