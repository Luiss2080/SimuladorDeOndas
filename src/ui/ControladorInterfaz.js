export class ControladorInterfaz {
    constructor(modeloOnda, gestorAudio, motorSimulacion, renderizador) {
        this.modeloOnda = modeloOnda;
        this.gestorAudio = gestorAudio;
        this.motorSimulacion = motorSimulacion;
        this.renderizador = renderizador;
        this.configurarEventos();
    }

    configurarEventos() {
        const sliderFrecuencia = document.getElementById('sliderFrecuencia');
        const valorFrecuencia = document.getElementById('valorFrecuencia');
        
        sliderFrecuencia.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            this.modeloOnda.setFrecuencia(val);
            this.gestorAudio.setFrecuencia(val * 100); 
            valorFrecuencia.innerText = val.toFixed(1);
        });

        const sliderAmplitud = document.getElementById('sliderAmplitud');
        const valorAmplitud = document.getElementById('valorAmplitud');

        sliderAmplitud.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            this.modeloOnda.setAmplitud(val);
            this.gestorAudio.setVolumen(val / 100);
            valorAmplitud.innerText = val.toString();
        });

        const checkSonido = document.getElementById('checkSonido');
        checkSonido.addEventListener('change', (e) => {
            const checked = e.target.checked;
            if (checked) {
                this.gestorAudio.iniciarTono(parseFloat(sliderFrecuencia.value) * 100);
            } else {
                this.gestorAudio.detenerTono();
            }
        });

        const btnPlayPause = document.getElementById('btnPlayPause');
        btnPlayPause.addEventListener('click', () => {
            if (this.motorSimulacion.estaCorriendo) {
                this.motorSimulacion.detener();
                btnPlayPause.innerText = 'Reanudar';
            } else {
                this.motorSimulacion.iniciar();
                btnPlayPause.innerText = 'Pausar';
            }
        });

        // --- NUEVOS EVENTOS PARA COINCIDIR CON LA IMAGEN ---

        // Control de mostrar/ocultar gráfica
        const checkGraficas = document.getElementById('checkGraficas');
        checkGraficas.addEventListener('change', (e) => {
            this.renderizador.setMostrarGrafica(e.target.checked);
        });

        // Control de modo de visualización (Ondas, Partículas, Ambos)
        const radiosModoVista = document.querySelectorAll('input[name="modoVista"]');
        radiosModoVista.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const valor = e.target.value;
                if (valor === 'ondas') {
                    this.renderizador.setOpcionesVisualizacion(true, false);
                } else if (valor === 'particulas') {
                    this.renderizador.setOpcionesVisualizacion(false, true);
                } else if (valor === 'ambos') {
                    this.renderizador.setOpcionesVisualizacion(true, true);
                }
            });
        });
    }
}
