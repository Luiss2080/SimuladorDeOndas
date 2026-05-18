# 17. Fase 12: Testing (Pruebas)

## Introducción
Las pruebas son fundamentales para asegurar que los cálculos físicos sean correctos y que la interfaz responda como se espera. Utilizaremos Vitest para pruebas unitarias y Playwright para pruebas de integración (E2E).

## 1. Pruebas Unitarias (Vitest)
Nos enfocaremos en probar la lógica de negocio aislada del DOM, principalmente el `WaveModel`.

### Ejemplo de Test para `WaveModel`
Crea el archivo `src/tests/WaveModel.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { WaveModel } from '../physics/WaveModel';

describe('WaveModel', () => {
    it('debe calcular la presión correctamente en el origen', () => {
        const model = new WaveModel();
        model.setFrequency(2);
        model.setAmplitude(50);
        
        const pressure = model.getPressureAt(0);
        // En t = 0 y x = 0, sin(0) debe ser 0
        expect(pressure).toBeCloseTo(0);
    });

    it('debe responder a cambios de amplitud', () => {
        const model = new WaveModel();
        model.setAmplitude(100);
        // En t = 0 y x = 0, cos(0) es 1, por lo que el desplazamiento es igual a la amplitud
        expect(model.getDisplacementAt(0)).toBeCloseTo(100);
    });
});
```

## 2. Pruebas de Integración y E2E (Playwright)
Estas pruebas verifican que la UI interactúe correctamente con el sistema simulando acciones del usuario real.

### Ejemplo de Test con Playwright
Crea el archivo `tests/simulator.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('Debe actualizar el texto de frecuencia al mover el slider', async ({ page }) => {
    await page.goto('http://localhost:5173/'); // URL por defecto de Vite
    
    const slider = page.locator('#freqSlider');
    const text = page.locator('#freqValue');
    
    // Simular que el usuario mueve el slider al valor 4
    await slider.fill('4'); 
    
    // Verificar que el texto de la UI se actualizó
    await expect(text).toHaveText('4');
});
```

## 3. Pruebas de Rendimiento (Profiling)
- Se deben usar las herramientas de desarrollo de Chrome (pestaña *Performance*) para grabar el comportamiento del Canvas y verificar que el tiempo de ejecución de la función de renderizado se mantenga muy por debajo de los 16.6ms requeridos para 60 FPS.

## Criterios de Aceptación
- Cobertura de pruebas en las funciones matemáticas críticas del modelo.
- Verificación de que la UI responde a las interacciones básicas sin errores en consola.

## Conclusión
La inclusión de pruebas garantiza que futuras mejoras o refactorizaciones no rompan el comportamiento físico o visual del simulador. En la Fase 13 finalizaremos con el despliegue del proyecto.
