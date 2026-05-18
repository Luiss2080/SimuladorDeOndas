export class Renderizador {
    constructor(contenedorId) {
        const contenedor = document.getElementById(contenedorId);
        
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

        // --- EFECTO DE LIBRERÍA (PixiJS Filter) ---
        // Aplicamos un filtro de desenfoque a las ondas para que se vean suaves y continuas
        const filtroDesenfoque = new PIXI.filters.BlurFilter();
        filtroDesenfoque.blur = 5; 
        this.capaOndas.filters = [filtroDesenfoque];

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
        
        this.mostrarOndas = true;
        this.mostrarParticulas = true;
        this.mostrarGrafica = true;
    }

    inicializarVistaParticulas(sistemaParticulas) {
        const particulas = sistemaParticulas.getParticulas();
        
        // Crear una textura REDONDA ("Pelotitas" con volumen)
        const canvas = document.createElement('canvas');
        canvas.width = 12;
        canvas.height = 12;
        const ctx = canvas.getContext('2d');
        
        // Gradiente radial para dar efecto de esfera 3D
        const gradiente = ctx.createRadialGradient(4, 4, 1, 6, 6, 5);
        gradiente.addColorStop(0, '#ffffff');
        gradiente.addColorStop(0.8, '#cbd5e1'); // Slate 300
        gradiente.addColorStop(1, '#64748b'); // Slate 500
        
        ctx.beginPath();
        ctx.arc(6, 6, 5, 0, Math.PI * 2);
        ctx.fillStyle = gradiente;
        ctx.fill();
        
        const textura = PIXI.Texture.from(canvas);

        for (const p of particulas) {
            const sprite = new PIXI.Sprite(textura);
            sprite.anchor.set(0.5); // Centrar el sprite
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

        // 2. Renderizar Ondas REDONDEADAS (Círculos concéntricos)
        this.capaOndas.clear();
        if (this.mostrarOndas) {
            const xCentro = 0; // Origen de la onda (Altavoz a la izquierda)
            const yCentro = 200; // Centro vertical
            const resolucion = 8; // Espaciado entre anillos
            
            // Dibujamos círculos concéntricos desde el origen
            for (let r = 0; r < 900; r += resolucion) {
                // Usamos el radio como la distancia 'x' en la fórmula de la onda
                const presion = modeloOnda.getPresionEn(r); 
                
                const factor = (presion + modeloOnda.amplitud) / (modeloOnda.amplitud * 2);
                const valorGris = Math.floor(factor * 255);
                const color = (valorGris << 16) | (valorGris << 8) | valorGris;
                
                // Dibujar el anillo
                this.capaOndas.lineStyle(resolucion, color, 0.6);
                this.capaOndas.drawCircle(xCentro, yCentro, r);
            }
        }

        // 3. Renderizar Gráfica de Presión
        this.capaGrafica.clear();
        if (this.mostrarGrafica) {
            const xInicio = 100;
            const yCentro = 300;
            const anchoGrafica = 600;
            const altoGrafica = 100;

            this.capaGrafica.beginFill(0x0f172a, 0.8);
            this.capaGrafica.lineStyle(1, 0x334155, 1);
            this.capaGrafica.drawRoundedRect(xInicio - 10, yCentro - 50, anchoGrafica + 20, altoGrafica, 8);
            this.capaGrafica.endFill();

            this.capaGrafica.lineStyle(1, 0x475569, 1);
            this.capaGrafica.moveTo(xInicio, yCentro);
            this.capaGrafica.lineTo(xInicio + anchoGrafica, yCentro);

            this.capaGrafica.lineStyle(2, 0x0ea5e9, 1);
            
            let primerPunto = true;
            for (let x = xInicio; x < xInicio + anchoGrafica; x++) {
                // Para la gráfica usamos la presión en el eje X horizontal
                const presion = modeloOnda.getPresionEn(x);
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
