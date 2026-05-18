# 06. Fase 1: Setup del Proyecto

## Introducción
En esta fase inicial configuraremos el entorno de desarrollo utilizando Vite y TypeScript, y crearemos la estructura de carpetas necesaria para el proyecto.

## Objetivos
- Inicializar un proyecto con Vite y TypeScript.
- Crear la estructura de carpetas definida en el documento 04.
- Crear el archivo `index.html` básico y el archivo de estilos inicial.

## Pasos para el Setup

### 1. Inicializar el proyecto con Vite
Abre la terminal en la carpeta raíz del proyecto y ejecuta:

```bash
npx create-vite@latest . --template vanilla-ts
```

*(Nota: El `.` indica que se creará en la carpeta actual. Si pregunta si deseas vaciar la carpeta, asegúrate de no borrar la carpeta `/docs`).*

### 2. Instalar dependencias
Instala las dependencias básicas que genera Vite:

```bash
npm install
```

### 3. Crear la estructura de carpetas
Crea las siguientes carpetas dentro de `/src`:

```bash
mkdir -p src/assets/styles src/core src/physics src/render src/audio src/ui src/utils
```

### 4. Configurar `index.html`
Reemplaza el contenido de `index.html` con la estructura básica para el simulador:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulador de Ondas Sonoras</title>
    <link rel="stylesheet" href="/src/assets/styles/global.css">
</head>
<body>
    <div id="app">
        <header>
            <h1>Simulador de Ondas Sonoras</h1>
        </header>
        
        <main>
            <!-- Área de simulación -->
            <div class="canvas-container">
                <canvas id="simulationCanvas"></canvas>
            </div>
            
            <!-- Panel de controles -->
            <section class="controls-panel">
                <!-- Los controles se detallarán en la Fase 9 -->
            </section>
        </main>
    </div>
    <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

### 5. Crear archivo de estilos globales
Crea el archivo `src/assets/styles/global.css` y añade las variables básicas:

```css
:root {
    --bg-color: #1a1a1a;
    --text-color: #e0e0e0;
    --accent-color: #00bcd4;
    --canvas-bg: #111;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: sans-serif;
    margin: 0;
    padding: 0;
}

#app {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.canvas-container {
    background-color: var(--canvas-bg);
    border: 1px solid #333;
    border-radius: 8px;
    overflow: hidden;
}
```

## Criterios de Aceptación
- El proyecto compila y corre con `npm run dev`.
- Se visualiza el título y el área del canvas (aunque esté vacía).
- No hay errores en la consola del navegador.

## Conclusión
Completada esta fase, tenemos el esqueleto del proyecto listo para empezar a programar el motor de animación en la Fase 2.
