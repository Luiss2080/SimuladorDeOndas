export class Renderizador {
    constructor(contenedorId) {
        const contenedor = document.getElementById(contenedorId);
        
        // Inicializar la aplicación PixiJS (Librería de alto rendimiento)
        this.app = new PIXI.Application({
            width: 800,
            height: 400,
            backgroundColor: 0x030712, // Coincide con el fondo del CSS
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        contenedor.appendChild(this.app.view);

        // Crear un contenedor de partículas para máximo rendimiento
        this.contenedorParticulas = new PIXI.ParticleContainer(3000, {
            position: true,
            alpha: false,
            scale: false,
            rotate: false,
            uvs: false,
        });

        this.app.stage.addChild(this.contenedorParticulas);
        this.spritesParticulas = [];
    }

    // Inicializar los sprites de Pixi basados en el sistema de partículas
    inicializarVistaParticulas(sistemaParticulas) {
        const particulas = sistemaParticulas.getParticulas();
        
        // Crear una textura pequeña para la partícula (un cuadrado de 2x2)
        const canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 2;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0ea5e9'; // Azul cyan académico
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

    // Actualizar la visualización en cada frame
    actualizar(sistemaParticulas) {
        const particulas = sistemaParticulas.getParticulas();
        
        // Sincronizar las posiciones de los sprites de Pixi con la física
        for (let i = 0; i < particulas.length; i++) {
            this.spritesParticulas[i].x = particulas[i].xActual;
        }
    }
}
