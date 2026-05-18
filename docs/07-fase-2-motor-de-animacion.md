# 07. Fase 2: Motor de Animación (SimulationEngine)

## Introducción
El motor de animación es el núcleo que mantiene viva la simulación. Utilizaremos `requestAnimationFrame` para crear un bucle continuo que actualice la física y redibuje la escena a 60 FPS.

## Objetivos
- Crear la clase `Engine` en `src/core/Engine.ts`.
- Implementar el cálculo del *delta time* para que la animación sea independiente de la velocidad del procesador.
- Proveer métodos para pausar, reanudar y detener la simulación.

## Fundamento Teórico: Delta Time
El *delta time* es el tiempo transcurrido entre el frame actual y el anterior. Si multiplicamos el movimiento de los objetos por este valor, nos aseguramos de que se muevan a la misma velocidad física sin importar si el juego corre a 30 FPS o a 60 FPS.

## Código Sugerido (`src/core/Engine.ts`)

```typescript
export class Engine {
    private isRunning: boolean = false;
    private lastTime: number = 0;
    private updateCallback: (deltaTime: number) => void;

    constructor(updateCallback: (deltaTime: number) => void) {
        this.updateCallback = updateCallback;
    }

    public start(): void {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.loop(this.lastTime);
    }

    public stop(): void {
        this.isRunning = false;
    }

    private loop = (currentTime: number): void => {
        if (!this.isRunning) return;

        // Calcular delta time en segundos
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Limitar el delta time máximo para evitar saltos bruscos
        const clampedDelta = Math.min(deltaTime, 0.1);

        // Ejecutar la actualización de la física y el render
        this.updateCallback(clampedDelta);

        // Solicitar el siguiente frame
        requestAnimationFrame(this.loop);
    }
}
```

## Cómo Usarlo en `main.ts`

```typescript
import { Engine } from './core/Engine';

const updateSimulation = (deltaTime: number) => {
    // Aquí irá la llamada a actualizar física y renderizar
    // console.log(`Frame actualizado. Delta: ${deltaTime}s`);
};

const engine = new Engine(updateSimulation);
engine.start();
```

## Criterios de Aceptación
- El bucle se ejecuta continuamente.
- El cálculo de *delta time* es cercano a `0.016` segundos (para 60 FPS).
- La animación se detiene al llamar a `engine.stop()`.

## Conclusión
Con el motor de animación funcionando, estamos listos para implementar el modelo matemático de la onda en la Fase 3, donde usaremos el `deltaTime` para avanzar el tiempo de la onda.
