# 08. Fase 3: Modelo de Onda (WaveModel)

## Introducción
En esta fase implementaremos las fórmulas matemáticas descritas en el documento 05 dentro de una clase que mantendrá el estado de la onda.

## Objetivos
- Crear la clase `WaveModel` en `src/physics/WaveModel.ts`.
- Implementar los cálculos de frecuencia angular, número de onda y longitud de onda.
- Proveer un método para obtener la presión y el desplazamiento en cualquier punto $x$.

## Código Sugerido (`src/physics/WaveModel.ts`)

```typescript
export class WaveModel {
    // Parámetros físicos
    private amplitude: number = 50; // En unidades visuales
    private frequency: number = 2;   // En Hz
    private speed: number = 343;     // Velocidad del sonido m/s
    
    // Estado
    private time: number = 0;
    
    constructor() {}

    // Actualizar el tiempo de la onda
    public update(deltaTime: number, speedFactor: number = 1): void {
        this.time += deltaTime * speedFactor;
        
        // Evitar que el tiempo crezca infinitamente (opcional pero recomendado)
        const period = 1 / this.frequency;
        if (this.time > period * 100) {
            this.time = this.time % period;
        }
    }

    public setFrequency(f: number): void {
        this.frequency = f;
    }

    public setAmplitude(a: number): void {
        this.amplitude = a;
    }

    private get omega(): number {
        return 2 * Math.PI * this.frequency;
    }

    private get wavelength(): number {
        return this.speed / this.frequency;
    }

    private get k(): number {
        return (2 * Math.PI) / this.wavelength;
    }

    // Ecuación de Presión: P(x,t) = A * sin(kx - wt)
    public getPressureAt(x: number): number {
        return this.amplitude * Math.sin(this.k * x - this.omega * this.time);
    }

    // Desplazamiento longitudinal de partículas: x' = A * cos(kx - wt)
    public getDisplacementAt(x: number): number {
        return this.amplitude * Math.cos(this.k * x - this.omega * this.time);
    }
}
```

## Riesgos y Estrategias
- **Precisión Numérica:** Si `time` crece mucho, las funciones trigonométricas pueden perder precisión.
  - *Estrategia:* Aplicar la operación módulo con respecto al periodo mantiene los valores en un rango seguro sin alterar el resultado físico.

## Criterios de Aceptación
- Al llamar a `getPressureAt(x)` con un $x$ fijo y avanzando el tiempo, el resultado oscila suavemente entre $-A$ y $+A$.
- Al aumentar la frecuencia, se observa que los ciclos se repiten a menor distancia espacial.

## Conclusión
El `WaveModel` está listo. Ahora podemos usarlo en la Fase 4 para mover las partículas del aire según el desplazamiento calculado aquí.
