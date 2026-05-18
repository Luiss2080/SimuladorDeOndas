# 12. Fase 7: Gráfica de Presión (PressureGraph)

## Introducción
Para ayudar a comprender la relación entre el movimiento de las partículas y la presión del aire, añadiremos una gráfica en tiempo real que muestre la curva de presión en función de la posición espacial $x$.

## Objetivos
- Crear un componente que dibuje una curva senoidal basada en el `WaveModel`.
- Asegurar que la gráfica esté perfectamente alineada y sincronizada con la visualización de partículas.

## Fundamento Teórico
La gráfica representará visualmente la función $P(x,t) = A \cdot \sin(kx - \omega t)$ evaluada para cada píxel $x$ en el eje horizontal en el tiempo $t$ actual.

## Código Sugerido (`src/render/PressureGraph.ts`)

```typescript
import { WaveModel } from '../physics/WaveModel';

export class PressureGraph {
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private yCenter: number;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!;
        this.width = canvas.width;
        this.height = canvas.height;
        this.yCenter = this.height / 2;
    }

    public draw(waveModel: WaveModel): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // 1. Dibujar eje horizontal de referencia
        this.ctx.strokeStyle = '#444';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.yCenter);
        this.ctx.lineTo(this.width, this.yCenter);
        this.ctx.stroke();
        
        // 2. Dibujar la curva de presión
        this.ctx.strokeStyle = '#ff9800'; // Color naranja para la gráfica
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        for (let x = 0; x < this.width; x++) {
            const pressure = waveModel.getPressureAt(x);
            
            // En Canvas, el eje Y está invertido (0 arriba). 
            // Restamos la presión para que los valores positivos vayan hacia arriba.
            const y = this.yCenter - pressure;
            
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
    }
}
```

## Ventajas del Enfoque "Vanilla"
- **Sin Dependencias:** Al no usar librerías externas como `Chart.js`, el tamaño del bundle se mantiene mínimo.
- **Rendimiento Máximo:** Un bucle simple que dibuja líneas en Canvas es la forma más rápida de renderizar una señal en tiempo real a 60 FPS sin sobrecarga de memoria.

## Criterios de Aceptación
- La gráfica muestra una onda senoidal continua.
- Al modificar la frecuencia, la longitud de onda en la gráfica cambia proporcionalmente.
- Los picos (máximos) de la gráfica deben coincidir con las zonas de mayor densidad de partículas (compresión).

## Conclusión
La gráfica de presión completa el trío visual: Altavoz (causa), Partículas/Ondas (efecto visual), y Gráfica (representación matemática). En la Fase 8 añadiremos el sonido real usando la Web Audio API.
