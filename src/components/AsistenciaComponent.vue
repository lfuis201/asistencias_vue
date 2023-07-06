<template>
  <div class="camera-container">
    <v-snackbar v-model="snackbar" :timeout="3000">{{ snackbarText }}</v-snackbar>

    <div class="camera-wrapper">
      <video ref="video" width="640" height="480" autoplay></video>
    </div>
    <div class="form-wrapper">
      <v-text-field v-model="dniNumber" label="DNI" outlined></v-text-field>
      <v-text-field v-model="fecha" label="Fecha" outlined :value="getCurrentDate"></v-text-field>
      <v-text-field v-model="idHorario" label="ID Horario" outlined></v-text-field>
      <v-btn @click="captureAndSend" color="primary">Capturar imagen y enviar</v-btn>
    </div>
    
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
        capturedImage: null,
        dniNumber: '',
        fecha: '',
        idHorario: '',
        snackbar: false,
        snackbarText: 'Asistencia creada',
      
    };
  },
  mounted() {
    this.initializeCamera();
    
    this.fecha = this.getCurrentDate();
  },
  methods: {
    async initializeCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = this.$refs.video;
        videoElement.srcObject = stream;
        videoElement.play();
      } catch (error) {
        console.error('No se pudo acceder a la cámara:', error);
      }
    },
    capture() {
        const videoElement = this.$refs.video;
        const canvasElement = document.createElement('canvas');
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        const context = canvasElement.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        const imageUrl = canvasElement.toDataURL('image/png');
        this.capturedImage = imageUrl;
    },
    
    
    captureAndSend() {
       this.capture();

      fetch(this.capturedImage)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'photo.png', { type: 'image/png' });

          const formData = new FormData();
          formData.append('fecha', this.fecha);
          formData.append('id_horario', this.idHorario);
          formData.append('dni', this.dniNumber);
          formData.append('foto', file);

          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };

          axios.post('http://127.0.0.1:5050/create_asistencia', formData, config)
            .then((response) => {
              const content = response.data;
              console.log(content);
              if (content.estado) {
                this.snackbarText = 'Asistencia creada correctamente';
              } else {
                this.snackbarText = 'No eres la persona';
              }
              this.snackbar = true;
            })
            .catch((error) => {
              if (error.response) {
                console.error('Error en la respuesta del servidor:', error.response.data);
              } else {
                console.error('Error al enviar los datos de asistencia:', error);
              }
            });
        })
        .catch((error) => {
          console.error('Error al obtener el blob de la imagen:', error);
        });
    },
    
    getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>

<style scoped>
.camera-container {
  display: flex;
  align-items: flex-start;
  
  padding: 20px; /* Ajusta el valor según tu preferencia */
}

.camera-wrapper {
  margin-right: 20px; /* Ajusta el valor según tu preferencia */
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: auto;
  margin-bottom: auto;
}

.v-input__control {
  width: 300px; /* Ajusta el ancho según tus necesidades */
  margin-bottom: 1rem;
}

.v-btn {
  margin-top: 1rem; /* Ajusta el valor según tu preferencia */
}
</style>
