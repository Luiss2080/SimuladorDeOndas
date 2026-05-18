# 13. Fase 8: Audio Web API (AudioEngine)

## Introducción
El simulador no estaría completo sin la capacidad de escuchar el tono que se está visualizando. Utilizaremos la Web Audio API nativa del navegador para generar un sonido puro (onda senoidal) cuya frecuencia corresponda exactamente a la de la onda visualizada.

## Objetivos
- Inicializar el `AudioContext`.
- Crear un `OscillatorNode` de tipo senoidal.
- Controlar el volumen mediante un `GainNode`.
- Sincronizar los parámetros de audio con los de la simulación visual.

## Código Sugerido (`src/audio/AudioManager.ts`)

```typescript
export class AudioManager {
    private audioCtx: AudioContext | null = null;
    private oscillator: OscillatorNode | null = null;
    private gainNode: GainNode | null = null;
    private isPlaying: boolean = false;

    constructor() {}

    private init(): void {
        // Inicialización perezosa (lazy) para cumplir con políticas de autoplay
        this.audioCtx = new AudioContext();
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.connect(this.audioCtx.destination);
        this.gainNode.gain.value = 0.1; // Volumen prudente por defecto
    }

    public startTone(frequency: number): void {
        if (!this.audioCtx) this.init();
        
        if (this.isPlaying) return;
        
        this.oscillator = this.audioCtx!.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = frequency;
        
        this.oscillator.connect(this.gainNode!);
        this.oscillator.start();
        this.isPlaying = true;
    }

    public stopTone(): void {
        if (!this.isPlaying || !this.oscillator) return;
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.isPlaying = false;
    }

    public setFrequency(frequency: number): void {
        if (this.oscillator && this.audioCtx) {
            // Transición suave para evitar ruidos de "click"
            this.oscillator.frequency.setTargetAtTime(frequency, this.audioCtx.currentTime, 0.01);
        }
    }

    public setVolume(volume: number): void {
        if (this.gainNode && this.audioCtx) {
            this.gainNode.gain.setTargetAtTime(volume, this.audioCtx.currentTime, 0.01);
        }
    }
}
```

## Buenas Prácticas y Solución de Problemas
- **Políticas de Autoplay:** Los navegadores modernos prohíben emitir sonido sin una acción previa del usuario. Asegúrate de llamar a `startTone` como respuesta directa a un evento `click` o `input` del usuario.
- **Transiciones Suaves:** El método `setTargetAtTime` es crucial. Si cambias el valor de la frecuencia abruptamente asignando `oscillator.frequency.value = x`, el usuario escuchará chasquidos molestos debido a discontinuidades en la onda de audio.

## Criterios de Aceptación
- El simulador genera sonido senoidal puro.
- El sonido se detiene y arranca correctamente.
- La altura del tono (frecuencia) responde en tiempo real a los cambios del usuario.

## Conclusión
Con el audio funcionando, el simulador ya ofrece una experiencia multimodal (visual y auditiva). En la Fase 9 crearemos el panel de controles para interactuar con el sistema.
