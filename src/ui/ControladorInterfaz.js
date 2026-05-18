export class ControladorInterfaz {
    constructor(modeloOnda, gestorAudio, motorSimulacion) {
        this.modeloOnda = modeloOnda;
        this.gestorAudio = gestorAudio;
        this.motorSimulacion = motorSimulacion;
        this.configurarEventos();
    }

    configurarEventos() {
        const sliderFrecuencia = document.getElementById('sliderFrecuencia');
        const valorFrecuencia = document.getElementById('valorFrecuencia');
        
        sliderFrecuencia.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            this.modeloOnda.setFrecuencia(val);
            
            // Multiplicamos por 100 para que sea audible
            this.gestorAudio.setFrecuencia(val * 100); 
            
            valorFrecuencia.innerText = val.toFixed(1);
        });

        const sliderAmplitud = document.getElementById('sliderAmplitud');
        const valorAmplitud = document.getElementById('valorAmplitud');

        sliderAmplitud.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            this.modeloOnda.setAmplitud(val);
            this.gestorAudio.setVolumen(val / 100); // Normalizar a 0-1
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
    }
}
