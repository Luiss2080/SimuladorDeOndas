export class SistemaParticulas {
    constructor(modeloOnda, ancho, alto, espaciado) {
        this.modeloOnda = modeloOnda;
        this.particulas = [];
        this.inicializarParticulas(ancho, alto, espaciado);
    }

    inicializarParticulas(ancho, alto, espaciado) {
        for (let x = 0; x < ancho; x += espaciado) {
            for (let y = 0; y < alto; y += espaciado) {
                this.particulas.push({
                    xOriginal: x,
                    yOriginal: y,
                    xActual: x,
                    yActual: y
                });
            }
        }
    }

    actualizar() {
        for (const p of this.particulas) {
            // Obtenemos el desplazamiento en base a la posición original
            const desplazamiento = this.modeloOnda.getDesplazamientoEn(p.xOriginal);
            p.xActual = p.xOriginal + desplazamiento;
        }
    }

    getParticulas() {
        return this.particulas;
    }
}
