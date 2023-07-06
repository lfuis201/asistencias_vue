<template>
    <div>
      <v-data-table :items="cursos" :headers="columnas" item-key="id">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>CRUD Cursos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
  
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  Nuevo Curso
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
                        <v-text-field v-model="nuevoCurso.nombre_curso" placeholder="Ingresa el nombre del curso" label="Nombre Curso"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="nuevoCurso.descripcion" label="Descripcion" placeholder="Ingresa la descripcion"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
  
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="createCurso">Crear</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
  
            <v-dialog v-model="dialogEditarCurso" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Editar Curso</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="cursoEditado.nombre_curso" placeholder="Ingresa tu curso" label="Nombre Curso"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="cursoEditado.descripcion" label="Descripcion" placeholder="Ingresa la descripcion"></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialogEditarCurso = false">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="updateCurso">Actualizar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
  
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
          <td>
            <v-icon small class="mr-2" color="primary" @click="editarCurso(item)">mdi-pencil</v-icon>
            <v-icon small color="error" @click="eliminarCurso(item)">mdi-delete</v-icon>
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
        cursos: [],
        dialog: false,
        dialogEditarCurso: false,
        formTitle: 'Crear curso',
        nuevoCurso: {
          nombre_curso: '',
          descripcion: '',
        },
        cursoEditado: {
          nombre_curso: '',
          descripcion: '',
        },
        columnas: [
          { text: 'ID', value: 'id_curso' },
          { text: 'Nombre Curso', value: 'nombre_curso' },
          { text: 'Descripción', value: 'descripcion' },
          { text: 'Acciones', value: 'actions', sortable: false },
        ],
      };
    },
    created() {
      this.getCursos();
    },
    methods: {
      getCursos() {
        axios
          .post('http://127.0.0.1:5050/cursos')
          .then((response) => {
            this.cursos = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      createCurso() {
            const datosCurso = {
                nombre_curso: this.nuevoCurso.nombre_curso,
                descripcion: this.nuevoCurso.descripcion,
            };

            axios
                .put('http://127.0.0.1:5050/curso', datosCurso)
                .then(() => {
                this.dialog = false;
                this.getCursos();
                this.nuevoCurso = {
                    nombre_curso: '',
                    descripcion: '',
                };
                })
                .catch((error) => {
                console.error(error);
                });
            },

      editarCurso(item) {
        this.cursoEditado = { ...item };
        this.dialogEditarCurso = true;
      },
      updateCurso() {
        const { id_curso, nombre_curso, descripcion } = this.cursoEditado;
        const datosCurso = {
            id_curso,
            nombre_curso,
            descripcion,
        };

        axios
            .patch(`http://127.0.0.1:5050/curso`, datosCurso)
            .then(() => {
            this.dialogEditarCurso = false;
            this.getCursos();
            this.cursoEditado = {
                id_curso: '',
                nombre_curso: '',
                descripcion: '',
            };
            })
            .catch((error) => {
            console.error(error);
            });
        },

      eliminarCurso(item) {
        axios
            .delete('http://127.0.0.1:5050/curso', { data: { id_curso: item.id_curso } })
            .then(() => {
            this.getCursos();
            })
            .catch((error) => {
            console.error(error);
            });
        },

      close() {
        this.dialog = false;
        this.dialogEditarCurso = false;
        this.cursoEditado = {
          nombre_curso: '',
          descripcion: '',
        };
        this.nuevoCurso = {
          nombre_curso: '',
          descripcion: '',
        };
      },
    },
  };
  </script>