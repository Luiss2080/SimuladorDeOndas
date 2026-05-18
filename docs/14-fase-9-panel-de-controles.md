# 14. Fase 9: Panel de Controles (UIController)

## Introducción
En esta fase crearemos la interfaz de usuario con la que el alumno interactuará. Dado que no usamos frameworks (como React), manipularemos el DOM directamente utilizando TypeScript de manera limpia y estructurada.

## Objetivos
- Crear los elementos HTML de control (sliders, botones, checkboxes).
- Escuchar eventos del DOM y actualizar los modelos en consecuencia.
- Mantener sincronizadas las etiquetas de texto con los valores de los sliders.

## Estructura HTML sugerida (en `index.html`)

```html
<section class="controls-panel">
    <!-- Control de Frecuencia -->
    <div class="control-group">
        <label for="freqSlider">Frecuencia: <span id="freqValue">2</span> Hz</label>
        <input type="range" id="freqSlider" min="1" max="5" step="0.1" value="2">
    </div>

    <!-- Control de Amplitud -->
    <div class="control-group">
        <label for="ampSlider">Amplitud: <span id="ampValue">50</span></label>
        <input type="range" id="ampSlider" min="10" max="100" step="5" value="50">
    </div>

    <!-- Botones de control -->
    <div class="button-group">
        <button id="playPauseBtn">Pausar</button>
        <button id="resetBtn">Reiniciar</button>
    </div>

    <!-- Opciones de visualización -->
    <div class="checkbox-group">
        <label><input type="checkbox" id="showWaves" checked> Mostrar Ondas</label>
        <label><input type="checkbox" id="showParticles" checked> Mostrar Partículas</label>
        <label><input type="checkbox" id="playSound"> Reproducir Sonido</label>
    </div>
</section>
```

## Código Sugerido (`src/ui/Controls.ts`)

```typescript
import { WaveModel } from '../physics/WaveModel';
import { AudioManager } from '../audio/AudioManager';

export class Controls {
    private waveModel: WaveModel;
    private audioManager: AudioManager;

    constructor(waveModel: WaveModel, audioManager: AudioManager) {
        this.waveModel = waveModel;
        this.audioManager = audioManager;
        this.setupEvents();
    }

    private setupEvents(): void {
        const freqSlider = document.getElementById('freqSlider') as HTMLInputElement;
        const freqValue = document.getElementById('freqValue') as HTMLSpanElement;
        
        freqSlider.addEventListener('input', (e) => {
            const val = parseFloat((e.target as HTMLInputElement).value);
            this.waveModel.setFrequency(val);
            
            // Multiplicamos por 100 para que la frecuencia sea audible (ej. 200Hz - 500Hz)
            this.audioManager.setFrequency(val * 100); 
            
            freqValue.innerText = val.toString();
        });

        const ampSlider = document.getElementById('ampSlider') as HTMLInputElement;
        const ampValue = document.getElementById('ampValue') as HTMLSpanElement;

        ampSlider.addEventListener('input', (e) => {
            const val = parseFloat((e.target as HTMLInputElement).value);
            this.waveModel.setAmplitude(val);
            
            // Normalizamos la amplitud para el volumen del audio (0.0 a 1.0)
            this.audioManager.setVolume(val / 100); 
            
            ampValue.innerText = val.toString();
        });

        const playSound = document.getElementById('playSound') as HTMLInputElement;
        playSound.addEventListener('change', (e) => {
            const checked = (e.target as HTMLInputElement).checked;
            if (checked) {
                this.audioManager.startTone(parseFloat(freqSlider.value) * 100);
            } else {
                this.audioManager.stopTone();
            }
        });
    }
}
```

## Criterios de Aceptación
- Mover los sliders actualiza inmediatamente los valores de texto en pantalla.
- El movimiento de los sliders afecta la velocidad de oscilación y el tamaño de las ondas en el Canvas.
- Activar el checkbox de sonido genera el tono correspondiente de forma inmediata.

## Conclusión
Con el panel de controles terminado, el simulador es 100% interactivo. En la Fase 10 organizaremos cómo se gestiona el estado global de forma sencilla sin usar librerías externas.
