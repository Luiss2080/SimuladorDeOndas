export class MotorSimulacion {
    constructor(callbackActualizacion) {
        this.estaCorriendo = false;
        this.ultimoTiempo = 0;
        this.callbackActualizacion = callbackActualizacion;
    }

    iniciar() {
        if (this.estaCorriendo) return;
        this.estaCorriendo = true;
        this.ultimoTiempo = performance.now();
        this.bucle(this.ultimoTiempo);
    }

    detener() {
        this.estaCorriendo = false;
    }

    bucle = (tiempoActual) => {
        if (!this.estaCorriendo) return;

        const tiempoDelta = (tiempoActual - this.ultimoTiempo) / 1000;
        this.ultimoTiempo = tiempoActual;

        // Limitar el delta para evitar saltos si se congela la pestaña
        const deltaLimitado = Math.min(tiempoDelta, 0.1);

        this.callbackActualizacion(deltaLimitado);

        requestAnimationFrame(this.bucle);
    }
}
