<template>
    <div>
      <v-data-table :items="secciones" :headers="columnas" item-key="id">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>CRUD Seccion</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
  
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  Nuevo Seccion
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
                        <v-text-field v-model="nuevoSeccion.id_curso" label="ID Curso" placeholder="Ingresa el ID del curso"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="nuevoSeccion.aula" label="Aula" placeholder="Ingresa el aula"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="nuevoSeccion.nombre_seccion" label="Nombre Sección" placeholder="Ingresa el nombre de la sección"></v-text-field>
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
  
            <v-dialog v-model="dialogEditarSeccion" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Editar Seccion</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="seccionEditado.id_curso" label="ID Curso" placeholder="Ingresa el ID del curso"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="seccionEditado.aula" label="Aula" placeholder="Ingresa el aula"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="seccionEditado.nombre_seccion" label="Nombre Sección" placeholder="Ingresa el nombre de la sección"></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialogEditarSeccion = false">Cancelar</v-btn>
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
        secciones: [],
        dialog: false,
        dialogEditarSeccion: false,
        formTitle: '',
        nuevoSeccion: {
          id_curso: '',
          aula: '',
          nombre_seccion: '',
        },
        seccionEditado: {
          id_curso: '',
          aula: '',
          nombre_seccion: '',
        },
        columnas: [
          { text: 'ID', value: 'id_seccion' },
          { text: 'ID Curso', value: 'id_curso' }, 
          { text: 'Aula', value: 'aula' },
          { text: 'Nombre Sección', value: 'nombre_seccion' },
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
          .post('http://127.0.0.1:5050/seccions')
          .then((response) => {
            this.secciones = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      createSeccion() {
        const datosSeccion = {
          id_curso: this.nuevoSeccion.id_curso,
          aula: this.nuevoSeccion.aula,
          nombre_seccion: this.nuevoSeccion.nombre_seccion,
        };
  
        axios
          .put('http://127.0.0.1:5050/seccion', datosSeccion)
          .then(() => {
            this.dialog = false;
            this.getSeccion();
            this.nuevoSeccion = {
              id_curso: '',
              aula: '',
              nombre_seccion: '',
            };
          })
          .catch((error) => {
            console.error(error);
          });
      },
      editarSeccion(item) {
        this.seccionEditado = { ...item };
        this.dialogEditarSeccion = true;
      },
      updateSeccion() {
        const { id_seccion,nombre_seccion,aula,id_curso } = this.seccionEditado;
        const datosSeccion = {
          id_seccion,
          nombre_seccion,
          aula,
          id_curso,
        };
  
        axios
          .patch('http://127.0.0.1:5050/seccion', datosSeccion)
          .then(() => {
            this.dialogEditarSeccion = false;
            this.getSeccion();
            this.seccionEditado = {
                id_seccion: '',
                nombre_seccion: '',
                aula: '',
                id_curso: '',
            };
          })
          .catch((error) => {
            console.error(error);
          });
      },
      eliminarSeccion(item) {
        axios
          .delete('http://127.0.0.1:5050/seccion', { data: { id_seccion: item.id_seccion } })
          .then(() => {
            this.getSeccion();
          })
          .catch((error) => {
            console.error(error);
          });
      },
      close() {
        this.dialog = false;
        this.dialogEditarSeccion = false;
        this.seccionEditado = {
          id_curso: '',
          aula: '',
          nombre_seccion: '',
        };
        this.nuevoSeccion = {
          id_curso: '',
          aula: '',
          nombre_seccion: '',
        };
      },
    },
  };
  </script>