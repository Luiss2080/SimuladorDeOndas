import { MotorSimulacion } from './core/MotorSimulacion.js';
import { ModeloOnda } from './physics/ModeloOnda.js';
import { SistemaParticulas } from './physics/SistemaParticulas.js';
import { Renderizador } from './render/Renderizador.js';
import { GestorAudio } from './audio/GestorAudio.js';
import { ControladorInterfaz } from './ui/ControladorInterfaz.js';

console.log('Iniciando Simulador de Ondas Sonoras Académico...');

// 1. Inicializar el modelo físico de la onda
const modeloOnda = new ModeloOnda();

// 2. Inicializar el sistema de partículas (ancho: 800, alto: 400, espaciado: 15)
const sistemaParticulas = new SistemaParticulas(modeloOnda, 800, 400, 15);

// 3. Inicializar el renderizador visual (PixiJS)
const renderizador = new Renderizador('contenedorCanvas');
renderizador.inicializarVistaParticulas(sistemaParticulas);

// 4. Inicializar el gestor de audio
const gestorAudio = new GestorAudio();

// 5. Inicializar el motor de simulación con el bucle principal
const motor = new MotorSimulacion((delta) => {
    modeloOnda.actualizar(delta);
    sistemaParticulas.actualizar();
    
    // Pasamos tanto el sistema de partículas como el modelo de onda para dibujar las ondas y gráficas
    renderizador.actualizar(sistemaParticulas, modeloOnda);
});

// 6. Inicializar el controlador de la interfaz de usuario (pasamos el renderizador para controlar las opciones de visualización)
new ControladorInterfaz(modeloOnda, gestorAudio, motor, renderizador);

// 7. Arrancar la simulación
motor.iniciar();
