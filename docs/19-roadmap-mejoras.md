# 19. Roadmap de Mejoras Futuras

## Introducción
Aunque el simulador actual cumple con todos los requisitos para replicar de forma eficiente la sección de ondas sonoras de PhET, siempre hay espacio para expandir sus capacidades pedagógicas y técnicas en futuras versiones.

## Mejoras Propuestas

### 1. Física Avanzada
- **Interferencia de Ondas:** Añadir un segundo altavoz para visualizar patrones de interferencia constructiva y destructiva (zonas de silencio y de volumen reforzado).
- **Efecto Doppler:** Permitir mover el altavoz por la pantalla para simular el cambio de tono que ocurre cuando la fuente emisora está en movimiento.
- **Reflexión y Absorción:** Añadir una "pared" u obstáculo en el canvas para ver cómo rebota la onda y se produce el eco.

### 2. Visualización e Interacción
- **Sonda de Medición:** Permitir al usuario arrastrar un sensor a cualquier punto de la pantalla y que una gráfica secundaria muestre la presión específica en ese punto exacto a lo largo del tiempo.
- **Vista Superior y Lateral:** Añadir un botón para cambiar la perspectiva visual del fenómeno.

### 3. Optimización y Tecnología
- **Uso de Web Workers:** Si se implementa la interferencia con múltiples fuentes, el cálculo matemático se volverá el doble de pesado. Mover ese cálculo a un hilo secundario mantendría la UI a 60 FPS sin importar la carga.
- **PWA (Progressive Web App):** Configurar un Service Worker para que el simulador se pueda instalar en dispositivos móviles y funcione sin conexión a internet en las escuelas.

## Conclusión
Este Roadmap sirve como guía para el crecimiento del proyecto. Al estar construido con una arquitectura modular y limpia (TypeScript puro), añadir cualquiera de estas características no requerirá reescribir el sistema desde cero.
