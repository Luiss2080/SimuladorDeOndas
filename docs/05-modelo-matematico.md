# 05. Modelo Matemático de la Onda Sonora

## Introducción
Para simular el comportamiento de una onda sonora de manera realista, debemos aplicar las ecuaciones físicas que describen el movimiento armónico simple y la propagación de ondas longitudinales. Este documento detalla el modelo matemático que se implementará en el código.

## 1. Función de Onda (Presión)
La presión acústica $P$ en un punto $x$ y en un tiempo $t$ se describe mediante la función de onda senoidal:

$$P(x,t) = A \cdot \sin(kx - \omega t)$$

Donde:
- $P(x,t)$ es la presión instantánea.
- $A$ es la amplitud de la onda (máximo desplazamiento o presión).
- $k$ es el número de onda.
- $\omega$ es la frecuencia angular.
- $x$ es la posición en el espacio.
- $t$ es el tiempo.

## 2. Número de Onda ($k$)
El número de onda relaciona la longitud de onda con el espacio:

$$k = \frac{2\pi}{\lambda}$$

## 3. Frecuencia Angular ($\omega$)
La frecuencia angular relaciona la frecuencia en Hertz ($f$) con el tiempo:

$$\omega = 2\pi f$$

Donde $f$ es la frecuencia seleccionada por el usuario en el slider.

## 4. Longitud de Onda ($\lambda$)
La distancia entre dos crestas sucesivas de la onda:

$$\lambda = \frac{v}{f}$$

## 5. Velocidad del Sonido ($v$)
La velocidad de propagación de la onda en el aire. A temperatura ambiente ($20^\circ C$):

$$v \approx 343 \text{ m/s}$$

## 6. Movimiento Longitudinal de Partículas
A diferencia de las ondas en el agua (transversales), las ondas sonoras son longitudinales. Las partículas de aire oscilan en la misma dirección en la que se propaga la onda.
La posición desplazada $x'$ de una partícula que originalmente estaba en $x$ es:

$$x' = x + A \cdot \cos(kx - \omega t)$$

*(Usamos coseno para el desplazamiento si la presión usa seno, debido a la relación de fase de $90^\circ$ entre desplazamiento y presión).*

## 7. Compresión y Rarefacción
- **Compresión:** Zonas donde las partículas están más juntas (alta presión). Ocurre cuando la derivada del desplazamiento respecto a $x$ es negativa.
- **Rarefacción:** Zonas donde las partículas están más separadas (baja presión).

## 8. Conversión entre Píxeles y Unidades Físicas
Para que la simulación sea visualmente comprensible, debemos escalar las unidades físicas a píxeles.
- Ejemplo: $100 \text{ píxeles} = 1 \text{ metro}$.
- Si la longitud de onda real es muy grande (ej. $343\text{m/s} / 440\text{Hz} \approx 0.78\text{m}$), debemos ajustar la escala visual para que quepan varias ondas en el Canvas.

## 9. Muestreo Temporal
En el código, el tiempo $t$ avanzará en cada frame basado en el *delta time* (tiempo transcurrido entre frames):
`t += deltaTime * speedFactor;`

## 10. Sincronización entre Audio y Animación
La frecuencia $f$ usada en el oscilador de la Web Audio API debe ser exactamente la misma $f$ usada en las ecuaciones matemáticas del Canvas para que el sonido y la animación sean coherentes.

## Conclusión
Estas ecuaciones son la base del archivo `WaveModel.ts`. Su correcta implementación garantizará que el simulador no solo se vea bonito, sino que sea físicamente coherente.
