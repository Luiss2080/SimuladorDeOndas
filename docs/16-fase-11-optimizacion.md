# 16. Fase 11: Optimización del Rendimiento

## Introducción
Para garantizar que la simulación corra a 60 FPS estables y fluidos, incluso en dispositivos con recursos limitados, debemos aplicar técnicas de optimización específicas tanto para el renderizado en Canvas como para la ejecución de JavaScript.

## 1. Optimizaciones en el Renderizado Canvas
- **`fillRect` en lugar de `arc`:** Como se mencionó en la Fase 5, dibujar partículas como pequeños rectángulos de 2x2 píxeles es muchísimo más rápido que dibujar círculos con `arc()`, ya que no requiere calcular trazados matemáticos complejos para los bordes curvos.
- **Agrupamiento de estilos:** Cambiar el `fillStyle` o el `strokeStyle` es una de las operaciones más costosas en el contexto de Canvas. Es mejor agrupar todos los elementos que compartan el mismo color y dibujarlos juntos.

## 2. Gestión de Memoria y Garbage Collection
- **Reutilización de objetos:** En el bucle de animación, evita crear nuevos objetos o arrays (`const p = {x, y}`). Reutiliza las estructuras existentes. La creación masiva de objetos efímeros satura el recolector de basura (*Garbage Collector*), provocando tirones (*stuttering*) en la animación.

## 3. Uso de Delta Time
- Asegura que el avance de la física y el tiempo de la onda no dependan de la velocidad de la CPU. Si los FPS caen por debajo de 60, los objetos se moverán a saltos pero mantendrán la velocidad correcta en el tiempo del mundo real.

## 4. Opciones de Escalabilidad (Si la complejidad aumentara)
Si el número de partículas creciera hasta las decenas de miles, se podrían considerar las siguientes tecnologías mencionadas en el plan inicial:
- **OffscreenCanvas:** Permite delegar el renderizado a un hilo separado (*Web Worker*), liberando el hilo principal para la UI.
- **Typed Arrays:** Usar `Float32Array` para almacenar coordenadas de partículas en lugar de arrays de objetos estándar, reduciendo drásticamente la huella de memoria.

## Criterios de Rendimiento
- La tasa de frames debe mantenerse estable en 60 FPS.
- La memoria Heap de JavaScript no debe mostrar un crecimiento continuo en forma de "sierra" (indicativo de creación excesiva de objetos).

## Conclusión
Gracias a la simplificación del stack y el uso de técnicas de bajo nivel en Canvas, el simulador está optimizado por defecto. En la Fase 12 veremos cómo realizar pruebas para asegurar la calidad del software.
