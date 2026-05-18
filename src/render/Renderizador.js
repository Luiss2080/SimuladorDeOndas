export class Renderizador {
    constructor(contenedorId) {
        const contenedor = document.getElementById(contenedorId);
        
        // Inicializar la aplicación PixiJS
        this.app = new PIXI.Application({
            width: 800,
            height: 400,
            backgroundColor: 0x030712,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        contenedor.appendChild(this.app.view);

        // Capa para las ondas (Fondo)
        this.capaOndas = new PIXI.Graphics();
        this.app.stage.addChild(this.capaOndas);

        // Crear un contenedor de partículas para máximo rendimiento
        this.contenedorParticulas = new PIXI.ParticleContainer(3000, {
            position: true,
            alpha: false,
            scale: false,
            rotate: false,
            uvs: false,
        });
        this.app.stage.addChild(this.contenedorParticulas);

        // Capa para la gráfica de presión (Al frente)
        this.capaGrafica = new PIXI.Graphics();
        this.app.stage.addChild(this.capaGrafica);

        this.spritesParticulas = [];
        
        // Estados de visualización
        this.mostrarOndas = true;
        this.mostrarParticulas = true;
        this.mostrarGrafica = true;
    }

    inicializarVistaParticulas(sistemaParticulas) {
        const particulas = sistemaParticulas.getParticulas();
        
        const canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 2;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff'; // Partículas blancas como en la imagen
        ctx.fillRect(0, 0, 2, 2);
        
        const textura = PIXI.Texture.from(canvas);

        for (const p of particulas) {
            const sprite = new PIXI.Sprite(textura);
            sprite.x = p.xActual;
            sprite.y = p.yActual;
            this.contenedorParticulas.addChild(sprite);
            this.spritesParticulas.push(sprite);
        }
    }

    actualizar(sistemaParticulas, modeloOnda) {
        const particulas = sistemaParticulas.getParticulas();
        
        // 1. Renderizar Partículas
        if (this.mostrarParticulas) {
            this.contenedorParticulas.visible = true;
            for (let i = 0; i < particulas.length; i++) {
                this.spritesParticulas[i].x = particulas[i].xActual;
            }
        } else {
            this.contenedorParticulas.visible = false;
        }

        // 2. Renderizar Ondas (Efecto de compresión y rarefacción en escala de grises)
        this.capaOndas.clear();
        if (this.mostrarOndas) {
            const resolucion = 4; // Ancho de cada banda
            for (let x = 0; x < 800; x += resolucion) {
                const presion = modeloOnda.getPresionEn(x);
                
                // Mapear la presión (-amplitud a +amplitud) a un valor de gris (0 a 255)
                const factor = (presion + modeloOnda.amplitud) / (modeloOnda.amplitud * 2);
                const valorGris = Math.floor(factor * 255);
                
                // Crear color RGB en escala de grises
                const color = (valorGris << 16) | (valorGris << 8) | valorGris;
                
                this.capaOndas.beginFill(color, 0.4); // Opacidad para no saturar
                this.capaOndas.drawRect(x, 0, resolucion, 400);
                this.capaOndas.endFill();
            }
        }

        // 3. Renderizar Gráfica de Presión
        this.capaGrafica.clear();
        if (this.mostrarGrafica) {
            const xInicio = 100;
            const yCentro = 300;
            const anchoGrafica = 600;
            const altoGrafica = 100;

            // Fondo de la gráfica (vidrio esmerilado oscuro)
            this.capaGrafica.beginFill(0x0f172a, 0.8);
            this.capaGrafica.lineStyle(1, 0x334155, 1);
            this.capaGrafica.drawRoundedRect(xInicio - 10, yCentro - 50, anchoGrafica + 20, altoGrafica, 8);
            this.capaGrafica.endFill();

            // Eje central
            this.capaGrafica.lineStyle(1, 0x475569, 1);
            this.capaGrafica.moveTo(xInicio, yCentro);
            this.capaGrafica.lineTo(xInicio + anchoGrafica, yCentro);

            // Dibujar la curva senoidal de presión
            this.capaGrafica.lineStyle(2, 0x0ea5e9, 1); // Línea cyan
            
            let primerPunto = true;
            for (let x = xInicio; x < xInicio + anchoGrafica; x++) {
                const presion = modeloOnda.getPresionEn(x);
                // Invertimos la presión para que positivo sea arriba
                const y = yCentro - (presion / modeloOnda.amplitud) * 40; 
                
                if (primerPunto) {
                    this.capaGrafica.moveTo(x, y);
                    primerPunto = false;
                } else {
                    this.capaGrafica.lineTo(x, y);
                }
            }
        }
    }

    setOpcionesVisualizacion(mostrarOndas, mostrarParticulas) {
        this.mostrarOndas = mostrarOndas;
        this.mostrarParticulas = mostrarParticulas;
    }

    setMostrarGrafica(mostrar) {
        this.mostrarGrafica = mostrar;
    }
}
