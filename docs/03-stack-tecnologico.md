# 03. Stack Tecnológico Recomendado

## Introducción
Este documento detalla las tecnologías seleccionadas para el desarrollo del simulador. La selección se ha realizado priorizando la **eficiencia en el rendimiento** y la **baja complejidad** en la implementación.

## Frontend Core

### 1. Vite
- **Uso:** Empaquetador y servidor de desarrollo.
- **Ventajas:** Es extremadamente rápido, ligero y ofrece recarga en caliente (HMR) casi instantánea. No añade complejidad innecesaria a la configuración del proyecto.

### 2. TypeScript (ES2025)
- **Uso:** Lenguaje de programación principal.
- **Ventajas:** Aporta tipado estático, lo que reduce errores en tiempo de desarrollo. Al compilar a JavaScript moderno, se aprovechan las últimas características del lenguaje sin sobrecarga de rendimiento.

### 3. HTML5 Canvas (2D Context)
- **Uso:** Renderizado de la simulación (ondas y partículas).
- **Ventajas:** Es el método más eficiente en el navegador para dibujar miles de elementos o animaciones complejas sin el overhead del DOM.

## UI y Estilos

### 4. CSS Vanilla (Variables CSS)
- **Uso:** Estilización de la interfaz de usuario.
- **Ventajas:** Al no usar frameworks como Tailwind o Bootstrap, reducimos el número de dependencias y el peso del proyecto. Las variables CSS permiten un mantenimiento sencillo de colores y tamaños.

## Audio

### 5. Web Audio API
- **Uso:** Generación del sonido en tiempo real.
- **Ventajas:** Permite crear osciladores y nodos de ganancia directamente en el navegador sin necesidad de cargar archivos de audio pesados. Es precisa y de baja latencia.

## Justificación de Simplificaciones (Vs. Propuesta Original)

- **Sin React ni Zustand:** Para una simulación que requiere actualizaciones a 60 FPS, React puede introducir latencia debido a su sistema de reconciliación. El uso de TypeScript puro permite manipular el Canvas y el estado de forma directa y mucho más rápida.
- **Sin Tailwind CSS:** Se evita la configuración de un compilador de CSS adicional, manteniendo el proyecto con la mínima cantidad de dependencias posibles.
- **Gráfica de Presión en Canvas Propio:** En lugar de importar librerías pesadas como Chart.js, dibujar una onda senoidal simple en un canvas secundario es trivial y consume una fracción de los recursos.

## Conclusión
Este stack minimalista pero potente garantiza que el simulador sea ligero, rápido de cargar y extremadamente eficiente en su ejecución, cumpliendo con los objetivos pedagógicos y de rendimiento.
