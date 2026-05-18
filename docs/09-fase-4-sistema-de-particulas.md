# 09. Fase 4: Sistema de Partículas (ParticleSystem)

## Introducción
Para visualizar el sonido como una onda longitudinal, crearemos una malla de partículas que representan las moléculas de aire. Estas partículas oscilarán horizontalmente según el desplazamiento calculado por el `WaveModel`.

## Objetivos
- Crear la clase `ParticleSystem` en `src/physics/Particles.ts`.
- Generar una distribución inicial de partículas (grilla).
- Calcular la nueva posición de cada partícula en cada frame basándose en el modelo de onda.

## Código Sugerido (`src/physics/Particles.ts`)

```typescript
import { WaveModel } from './WaveModel';

interface Particle {
    originalX: number;
    originalY: number;
    currentX: number;
    currentY: number;
}

export class ParticleSystem {
    private particles: Particle[] = [];
    private waveModel: WaveModel;

    constructor(waveModel: WaveModel, width: number, height: number, spacing: number) {
        this.waveModel = waveModel;
        this.initParticles(width, height, spacing);
    }

    // Crear una grilla de partículas
    private initParticles(width: number, height: number, spacing: number): void {
        for (let x = 0; x < width; x += spacing) {
            for (let y = 0; y < height; y += spacing) {
                this.particles.push({
                    originalX: x,
                    originalY: y,
                    currentX: x,
                    currentY: y
                });
            }
        }
    }

    // Actualizar la posición de todas las partículas
    public update(): void {
        for (const p of this.particles) {
            // Obtener el desplazamiento de la onda en la posición original X
            const displacement = this.waveModel.getDisplacementAt(p.originalX);
            
            // Aplicar el movimiento longitudinal (solo en el eje X)
            p.currentX = p.originalX + displacement;
        }
    }

    public getParticles(): Particle[] {
        return this.particles;
    }
}
```

## Estrategias de Optimización
- **Object Pooling implícito:** Las partículas se crean una sola vez en el constructor. En el bucle de actualización (`update`), se modifican las propiedades de los objetos existentes en lugar de crear nuevos. Esto evita pausas por recolección de basura (Garbage Collection).
- **Control de Densidad:** Un espaciado (`spacing`) muy pequeño generará demasiadas partículas. Se debe buscar un equilibrio (ej. espaciado de 10-15 píxeles) para mantener el rendimiento a 60 FPS.

## Criterios de Aceptación
- Las partículas se generan cubriendo el área especificada.
- Al ejecutar `update()`, las coordenadas `currentX` varían respecto a `originalX` siguiendo un patrón senoidal.

## Conclusión
Con las partículas moviéndose en memoria, el siguiente paso (Fase 5) es dibujarlas en la pantalla usando el Renderizador Canvas.
