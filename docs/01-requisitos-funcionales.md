# 01. Requisitos Funcionales y No Funcionales

## Introducción
Este documento detalla los requisitos que debe cumplir el simulador de ondas sonoras para garantizar una experiencia de usuario interactiva, educativa y de alto rendimiento.

## Requisitos Funcionales (RF)

### RF1: Generación y Control de Ondas
- El sistema debe permitir al usuario ajustar la **frecuencia** de la onda mediante un control deslizante (slider).
- El sistema debe permitir al usuario ajustar la **amplitud** de la onda mediante un control deslizante.
- El sistema debe permitir pausar y reanudar la simulación.
- El sistema debe permitir reiniciar la simulación a su estado inicial.
- El sistema debe ofrecer un "Modo Lento" para observar el movimiento detallado.

### RF2: Visualización
- **Ondas:** Mostrar la propagación de frentes de onda (compresión y rarefacción) usando gradientes o áreas de color.
- **Partículas:** Mostrar partículas de aire representadas como puntos que oscilan longitudinalmente.
- **Modos de Vista:** El usuario debe poder alternar entre ver:
  - Solo Ondas.
  - Solo Partículas.
  - Ambas representaciones superpuestas.
- **Gráfica de Presión:** Mostrar una gráfica en tiempo real que represente la presión en función de la posición o el tiempo.

### RF3: Audio
- El sistema debe reproducir un tono audible que corresponda a la frecuencia de la onda visualizada.
- El usuario debe poder activar o desactivar la reproducción del tono.

## Requisitos No Funcionales (RNF)

### RNF1: Rendimiento
- La simulación debe ejecutarse a una tasa de refresco constante de **60 FPS** en navegadores modernos.
- El tiempo de respuesta de los controles debe ser menor a 50ms (sensación de tiempo real).

### RNF2: Compatibilidad y Accesibilidad
- El simulador debe ser completamente funcional en navegadores modernos (Chrome, Firefox, Safari, Edge).
- La interfaz debe ser responsiva y adaptarse a diferentes tamaños de pantalla.

### RNF3: Simplicidad
- El diseño debe ser limpio y no sobrecargado, facilitando el uso por estudiantes.

## Ejemplos de Uso
- **Caso 1:** El usuario aumenta la frecuencia. El tono se vuelve más agudo y las longitudes de onda en la visualización se acortan (más frentes de onda en pantalla).
- **Caso 2:** El usuario disminuye la amplitud. El sonido se vuelve más tenue y el movimiento de las partículas es menos pronunciado.

## Conclusión
El cumplimiento de estos requisitos garantizará que el simulador sea una herramienta efectiva para la enseñanza de la física de ondas, combinando interactividad y rigor visual.
