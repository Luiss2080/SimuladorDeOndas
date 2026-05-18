# 18. Fase 13: Despliegue (Deployment)

## Introducción
Una vez que el simulador está desarrollado y probado, el último paso es publicarlo para que los alumnos y profesores puedan acceder a él a través de internet de manera gratuita.

## 1. Construcción del Proyecto (Build)
Antes de desplegar, debemos compilar el código TypeScript a JavaScript nativo altamente optimizado y minificado. Ejecuta en la terminal:

```bash
npm run build
```

Vite generará una carpeta llamada `/dist` (o `/build`) con todos los archivos estáticos necesarios.

## 2. Opciones de Despliegue

### Opción A: GitHub Pages (Recomendado por simplicidad)
Es gratuito y se integra directamente con el repositorio de GitHub.

1. Añade la propiedad `base` en tu `vite.config.ts` con el nombre de tu repositorio:
   ```typescript
   export default {
     base: '/nombre-del-repositorio/'
   }
   ```
2. Instala el paquete de ayuda: `npm install -D gh-pages`.
3. Añade este script en `package.json`: `"deploy": "gh-pages -d dist"`.
4. Ejecuta `npm run build` y luego `npm run deploy`.

### Opción B: Vercel o Netlify
Son plataformas modernas que ofrecen despliegue automático (CI/CD) conectándose a tu repositorio.

1. Crea una cuenta en Vercel o Netlify.
2. Importa el proyecto desde tu cuenta de GitHub.
3. La plataforma detectará automáticamente que es un proyecto de Vite y configurará los comandos:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Cada vez que hagas `git push` a la rama principal, el sitio se actualizará solo.

## Conclusión
Con el despliegue completado, el simulador de ondas sonoras está listo para ser utilizado en aulas o para estudio personal. Su peso mínimo garantiza que cargará de forma instantánea incluso en conexiones móviles lentas.
