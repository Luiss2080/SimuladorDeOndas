# 15. Fase 10: Estado Global (StateStore)

## Introducción
Para que los diferentes módulos (UI, Render, Audio) puedan comunicarse y compartir información sobre el estado de la simulación (frecuencia, amplitud, si está pausado, etc.), necesitamos un sistema de estado centralizado. Dado que evitamos librerías como Zustand o Redux para mantener la simplicidad, crearemos un almacén de estado sencillo utilizando TypeScript puro.

## Objetivos
- Crear la clase `State` en `src/core/State.ts`.
- Implementar un patrón de suscripción simple (Pub/Sub) para notificar a los componentes cuando el estado cambie.

## Código Sugerido (`src/core/State.ts`)

```typescript
export interface AppState {
    frequency: number;
    amplitude: number;
    isPlaying: boolean;
    showWaves: boolean;
    showParticles: boolean;
    playSound: boolean;
}

export class StateStore {
    private state: AppState;
    private listeners: Array<(state: AppState) => void> = [];

    constructor(initialState: AppState) {
        this.state = initialState;
    }

    public getState(): AppState {
        // Devolvemos una copia para evitar mutaciones accidentales desde fuera
        return { ...this.state }; 
    }

    public setState(newState: Partial<AppState>): void {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    public subscribe(listener: (state: AppState) => void): () => void {
        this.listeners.push(listener);
        // Devolvemos una función para desuscribirse
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notify(): void {
        for (const listener of this.listeners) {
            listener(this.state);
        }
    }
}

// Instancia única para toda la aplicación (Patrón Singleton)
export const globalState = new StateStore({
    frequency: 2,
    amplitude: 50,
    isPlaying: true,
    showWaves: true,
    showParticles: true,
    playSound: false
});
```

## Ventajas de este Enfoque
- **Cero peso:** No añade ni un solo kilobyte al tamaño del proyecto final.
- **Reactividad controlada:** Los componentes solo se actualizan cuando es necesario mediante la función `subscribe`.
- **Mantenibilidad:** Todo el estado de la aplicación está definido en una sola interfaz (`AppState`).

## Criterios de Aceptación
- Al modificar el estado desde los controles, el renderizador y el motor de audio reaccionan de inmediato.
- El sistema de suscripción funciona sin generar fugas de memoria.

## Conclusión
Con el estado global gestionado de forma nativa, el flujo de datos de la aplicación es predecible y fácil de seguir. En la Fase 11 abordaremos estrategias de optimización para asegurar que la simulación rinda al máximo.
