<template>
    <div>
      <v-data-table :items="alumno_seccion" :headers="columnas" item-key="id">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>CRUD Alumno Seccion</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
  
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  Nuevo AlumnoSeccion
                </v-btn>
              </template>
  
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
  
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="nuevoSeccion.id_alumno" label="ID Alumno" placeholder="Ingresa el ID del Alumno"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="nuevoSeccion.id_seccion" label="ID Seccion" placeholder="Ingresa el ID de la Seccion"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
  
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="createSeccion">Crear</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
  
            <v-dialog v-model="dialogEditarAlumnoSeccion" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Editar Alumno Seccion</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="seccionEditado.id_alumno" label="ID Alumno" placeholder="Ingresa el ID del Alumno"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="seccionEditado.id_seccion" label="ID Seccion" placeholder="Ingresa el ID de la Sección"></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialogEditarAlumnoSeccion = false">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="updateSeccion">Actualizar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
  
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
          <td>
            <v-icon small class="mr-2" @click="editarSeccion(item)">mdi-pencil</v-icon>
            <v-icon small @click="eliminarSeccion(item)">mdi-delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        alumno_seccion: [],
        dialog: false,
        dialogEditarAlumnoSeccion: false,
        formTitle: '',
        nuevoSeccion: {
          id_alumno: '',
          id_seccion: '',
        },
        seccionEditado: {
          id_alumno: '',
          id_seccion: '',
        },
        columnas: [
          { text: 'ID', value: 'id_alumno_seccion' },
          { text: 'ID Alumno', value: 'id_alumno' }, 
          { text: 'ID Seccion', value: 'id_seccion' },
          { text: 'Acciones', value: 'actions', sortable: false },
        ],
      };
    },
    created() {
      this.getSeccion();
    },
    methods: {
      getSeccion() {
        axios
          .get('http://127.0.0.1:5050/get_alumnoseccion')
          .then((response) => {
            this.alumno_seccion = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      createSeccion() {
        const datosSeccion = {
          id_alumno: this.nuevoSeccion.id_alumno,
          id_seccion: this.nuevoSeccion.id_seccion,
        };
  
        axios
          .post('http://127.0.0.1:5050/create_alumnoseccion', datosSeccion)
          .then(() => {
            this.dialog = false;
            this.getSeccion();
            this.nuevoSeccion = {
              id_alumno: '',
              id_seccion: '',
            };
          })
          .catch((error) => {
            console.error(error);
          });
      },
      editarSeccion(item) {
        this.seccionEditado = { ...item };
        this.dialogEditarAlumnoSeccion = true;
      },
      updateSeccion() {
        const { id_alumno_seccion,id_alumno,id_seccion } = this.seccionEditado;
        const datosSeccion = {
          id_alumno_seccion,
          id_alumno,
          id_seccion,
        };
  
        axios
          .patch('http://127.0.0.1:5050/update_alumnoseccion', datosSeccion)
          .then(() => {
            this.dialogEditarAlumnoSeccion = false;
            this.getSeccion();
            this.seccionEditado = {
                id_alumno_seccion: '',
                id_alumno: '',
                id_seccion: '',
                };
          })
          .catch((error) => {
            console.error(error);
          });
      },
      eliminarSeccion(item) {
        axios
          .delete('http://127.0.0.1:5050/delete_alumnoseccion', { data: { id_alumno_seccion: item.id_alumno_seccion } })
          .then(() => {
            this.getSeccion();
          })
          .catch((error) => {
            console.error(error);
          });
      },
      close() {
        this.dialog = false;
        this.dialogEditarAlumnoSeccion = false;
        this.seccionEditado = {
          id_alumno: '',
          id_seccion: '',
        };
        this.nuevoSeccion = {
          id_alumno:'',
          id_seccion:'',
        };
      },
    },
  };
  </script>