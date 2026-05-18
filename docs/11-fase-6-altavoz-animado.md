# 11. Fase 6: Altavoz Animado (SpeakerRenderer)

## Introducción
Para darle un contexto visual al origen del sonido, dibujaremos un altavoz en el lado izquierdo del Canvas. El cono del altavoz debe vibrar al ritmo de la frecuencia y amplitud de la onda, mostrando físicamente cómo se "empuja" el aire.

## Objetivos
- Dibujar la estructura del altavoz en el Canvas.
- Animar el cono del altavoz para que su movimiento sea coherente con la física de la onda en el origen.

## Fundamento Teórico
El cono del altavoz empuja el aire. Su movimiento debe estar en fase con el desplazamiento de las partículas en la posición $x = 0$.
Si la ecuación de desplazamiento es $x\' = A \cdot \cos(kx - \omega t)$, en $x = 0$ el desplazamiento del cono será proporcional a $\cos(-\omega t) = \cos(\omega t)$.

## Código Sugerido (`src/render/SpeakerRenderer.ts`)

```typescript
import { WaveModel } from '../physics/WaveModel';

export class SpeakerRenderer {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public draw(waveModel: WaveModel): void {
        const xBase = 30; // Posición base del altavoz en el eje X
        const yCenter = this.ctx.canvas.height / 2;
        
        // Obtener el desplazamiento de la onda en el origen (x = 0)
        const displacement = waveModel.getDisplacementAt(0);
        
        // 1. Dibujar el cuerpo/imán del altavoz (estático)
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(xBase, yCenter - 30, 20, 60);
        
        // 2. Dibujar el cono (animado)
        this.ctx.fillStyle = '#555';
        this.ctx.beginPath();
        this.ctx.moveTo(xBase + 20, yCenter - 10);
        
        // El borde derecho del cono se desplaza según la onda
        const conoBordeDerecho = xBase + 40 + displacement * 0.3; // Escalado para control visual
        
        this.ctx.lineTo(conoBordeDerecho, yCenter - 50);
        this.ctx.lineTo(conoBordeDerecho, yCenter + 50);
        this.ctx.lineTo(xBase + 20, yCenter + 10);
        this.ctx.closePath();
        this.ctx.fill();
        
        // 3. Dibujar la suspensión/borde del cono
        this.ctx.strokeStyle = '#00bcd4';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(conoBordeDerecho, yCenter - 50);
        this.ctx.lineTo(conoBordeDerecho, yCenter + 50);
        this.ctx.stroke();
    }
}
```

## Criterios de Aceptación
- El altavoz se dibuja en el extremo izquierdo.
- El cono vibra horizontalmente de forma visible.
- Al aumentar la amplitud en los controles, el rango de movimiento del cono aumenta.
- Al aumentar la frecuencia, el cono vibra más rápido.

## Conclusión
El altavoz añade un gran valor pedagógico al mostrar la causa mecánica de la onda. En la Fase 7 añadiremos la gráfica de presión para complementar la visualización de las partículas.
