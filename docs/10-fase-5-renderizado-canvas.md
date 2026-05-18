# 10. Fase 5: Renderizado Canvas (CanvasRenderer)

## Introducción
En esta fase uniremos la física con lo visual. Crearemos el sistema que toma las posiciones de las partículas y el estado de la onda para dibujarlos en el elemento `<canvas>`.

## Objetivos
- Crear la clase `CanvasRenderer` en `src/render/Renderer.ts`.
- Implementar el borrado del canvas en cada frame.
- Dibujar las partículas de forma eficiente.
- Dibujar las ondas usando gradientes o áreas de color para representar la presión.

## Código Sugerido (`src/render/Renderer.ts`)

```typescript
import { ParticleSystem } from '../physics/Particles';
import { WaveModel } from '../physics/WaveModel';

export class CanvasRenderer {
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!;
        this.width = canvas.width;
        this.height = canvas.height;
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    // Dibujar las partículas
    public drawParticles(particleSystem: ParticleSystem): void {
        const particles = particleSystem.getParticles();
        this.ctx.fillStyle = '#00bcd4'; // Color celeste para las partículas
        
        // Optimización: Usar rectángulos pequeños en lugar de arcos es mucho más rápido
        for (const p of particles) {
            this.ctx.fillRect(p.currentX, p.currentY, 2, 2);
        }
    }

    // Dibujar las ondas (representación de presión)
    public drawWaves(waveModel: WaveModel): void {
        const resolution = 4; // Ancho de cada banda vertical en píxeles
        
        for (let x = 0; x < this.width; x += resolution) {
            const pressure = waveModel.getPressureAt(x);
            
            // Normalizar la presión para calcular la opacidad (alpha)
            // Asumiendo que la amplitud máxima es conocida
            const alpha = Math.min(Math.abs(pressure) / 50, 1); 
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
            this.ctx.fillRect(x, 0, resolution, this.height);
        }
    }
}
```

## Estrategias de Optimización
- **`fillRect` vs `arc`:** Dibujar miles de círculos con `arc()` requiere muchos recursos de CPU porque cada uno genera un nuevo trazo (*path*). Usar `fillRect(x, y, 2, 2)` dibuja píxeles directamente y es el método más rápido en Canvas 2D para sistemas de partículas masivos.
- **Doble Buffer:** El navegador ya implementa doble buffer de forma nativa con el elemento Canvas, por lo que no es necesario crearlo manualmente a menos que se hagan operaciones de composición muy complejas.

## Criterios de Aceptación
- El Canvas se limpia correctamente en cada frame.
- Las partículas se visualizan como una cuadrícula que oscila de izquierda a derecha.
- Las ondas de presión se ven como bandas que se desplazan simulando el sonido.

## Conclusión
Con el renderizado base funcionando, la simulación ya es visible y funcional. En la Fase 6 añadiremos el altavoz animado para darle más contexto visual al origen de la onda.
