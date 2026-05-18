# 04. Estructura de Carpetas del Proyecto

## Introducción
Una estructura de carpetas organizada es clave para la mantenibilidad y escalabilidad del proyecto. Dado que hemos optado por un enfoque sin frameworks (Vanilla), la estructura será limpia y directa, agrupando los archivos por su responsabilidad.

## Estructura Propuesta

A continuación se presenta la estructura de directorios recomendada para el proyecto:

```text
/simulador-de-ondas
│
├── /docs                   # Documentación técnica (estos archivos)
│
├── /src                    # Código fuente del proyecto
│   ├── /assets             # Recursos estáticos
│   │   └── /styles         # Archivos CSS
│   │       └── global.css  # Estilos globales y variables
│   │
│   ├── /core               # Motor de simulación y bucle principal
│   │   ├── Engine.ts       # Controla requestAnimationFrame y delta time
│   │   └── State.ts        # Estado de la aplicación
│   │
│   ├── /physics            # Modelos matemáticos y físicos
│   │   ├── WaveModel.ts    # Ecuaciones de la onda
│   │   └── Particles.ts    # Sistema de partículas
│   │
│   ├── /render             # Todo lo relacionado con dibujo en Canvas
│   │   ├── Renderer.ts     # Orquestador de renderizado
│   │   ├── WaveArtist.ts   # Dibujo de ondas (gradientes)
│   │   └── ParticleArtist.ts # Dibujo de partículas
│   │
│   ├── /audio              # Motor de sonido
│   │   └── AudioManager.ts # Integración con Web Audio API
│   │
│   ├── /ui                 # Controladores de la interfaz de usuario
│   │   └── Controls.ts     # Manejo de sliders y botones
│   │
│   ├── /utils              # Funciones de ayuda (helpers)
│   │   └── MathUtils.ts    # Conversiones y cálculos matemáticos
│   │
│   └── main.ts             # Punto de entrada de la aplicación
│
├── index.html              # Estructura HTML principal
├── package.json            # Dependencias y scripts de Vite
├── tsconfig.json           # Configuración de TypeScript
└── vite.config.ts          # Configuración de Vite
```

## Descripción de Directorios Clave

- **/core:** Es el cerebro de la aplicación. Mantiene el bucle de animación y el estado.
- **/physics:** Contiene la lógica física pura (las matemáticas). No debe contener nada relacionado con el DOM ni con Canvas.
- **/render:** Contiene la lógica de visualización. Recibe datos del modelo físico y los plasma en el Canvas.
- **/ui:** Separa la lógica de interacción del usuario del resto del sistema.

## Buenas Prácticas
- **Archivos pequeños y enfocados:** Cada archivo debe tener una única responsabilidad (Principio de Responsabilidad Única).
- **Independencia de la Física:** La física debe poder calcularse sin necesidad de que exista una interfaz gráfica (facilita pruebas unitarias).

## Conclusión
Esta estructura modular permite que el proyecto crezca sin convertirse en un código difícil de entender, facilitando la localización de errores y futuras mejoras.
