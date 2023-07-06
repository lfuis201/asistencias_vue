<template>
    <div>
      <v-data-table :items="profesores" :headers="columnas" item-key="id">
        <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>CRUD Profesores</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Nuevo Profesor
                  </v-btn>
                </template>

                <v-card>
                    <v-card-title>
                      <span class="text-h5">Crear Usuario</span>
                    </v-card-title>
        
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="nickname"
                              placeholder="Ingresa tu nickname"
                              label="Nickname"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
    
                              v-model="password"
                              label="Password"
                              type="password"
                              placeholder="Ingresa tu contraseña"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="nombre"
                              placeholder="Ingresa tu nombre"
                              label="Nombre"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="apellido"
                              placeholder="Ingresa tu apellido"
                              label="Apellido"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-select
                            v-model="genero"
                            :items="generoOptions"
                            label="Género"
                          ></v-select>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                              <v-text-field
                              v-model="correo"
                              label="Correo Electrónico"
                              type="email"
                              placeholder="ejemplo@dominio.com"
    
                            ></v-text-field>
                          </v-col>
    
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="telefono"
                              label="Telefono"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="direccion"
                              label="Direccion"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="dni"
                              label="Dni"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="edad"
                              label="Edad"
                            ></v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                            v-model="departamento"
                            label="Departamento"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-file-input
    
                            v-model="foto"
                            accept="image/png"
                            label="Foto"
                          ></v-file-input>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
        
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="createProfesor"
                      >
                        Crear
                      </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog
                v-model="dialogEditarProfesor"
                max-width="500px"
            >
                

                <v-card>
                    <v-card-title>
                      <span class="text-h5">Editar Usuario</span>
                    </v-card-title>
        
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="profesor.nickname"
                              placeholder="Ingresa tu nickname"
                              label="Nickname"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
    
                              v-model="usuario.password"
                              label="Password"
                              type="password"
                              placeholder="Ingresa tu contraseña"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="usuario.nombre"
                              placeholder="Ingresa tu nombre"
                              label="Nombre"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="usuario.apellido"
                              placeholder="Ingresa tu apellido"
                              label="Apellido"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-select
                            v-model="usuario.genero"
                            :items="generoOptions"
                            label="Género"
                          ></v-select>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                              <v-text-field
                              v-model="usuario.correo"
                              label="Correo Electrónico"
                              type="email"
                              placeholder="ejemplo@dominio.com"
    
                            ></v-text-field>
                          </v-col>
    
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="usuario.telefono"
                              label="Telefono"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="usuario.direccion"
                              label="Direccion"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="usuario.dni"
                              label="Dni"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="usuario.edad"
                              label="Edad"
                            ></v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                            v-model="profesor.departamento"
                            label="Departamento"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-file-input
    
                            v-model="usuario.foto"
                            accept="image/png"
                            label="Foto"
                          ></v-file-input>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
        
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogEditarProfesor= false"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="updateProfesor"
                      >
                        Actualizar
                      </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-toolbar>

        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
          <td>
            <v-icon
              small
              class="mr-2"
              color="primary"
              @click="editarProfesor(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              color="error"
              @click="eliminarProfesor(item)"
            >
              mdi-delete
            </v-icon>
          </td>
        </template>

      </v-data-table>

      
      <h1>{{ resultado }}</h1>
      <button @click="obtenerUsuario(80)">Obtener Usuario</button>

    </div>

   
</template>

<script>
import axios from 'axios';
export default {
    
    data() {
        return {
            dialog: false,
            dialogEditarProfesor: false,
            generoOptions: ['Masculino', 'Femenino', 'Otros'],
            profesores: [],
            resultado: '',
            profesor: {
              nickname: '',
              id_profesor: '',
              id_usuario: '',
              departamento : ''
            },

            usuario: {
              id_usuario:'',
              nickname: '',
              password: '',
              nombre: '',
              apellido: '',
              edad: '',
              genero: '',
              correo : '',
              telefono: '',
              direccion: '',
              dni: '',
              foto: null
            },
            
        };
    },
    methods:{
      
      close () {
        this.dialog = false
        
      },
      obtenerUsuario(id) {
        // Realizar la solicitud POST al endpoint
        axios
          .post('http://127.0.0.1:5050/user', {
            id_usuario: id
          })
          .then(response => {
            // Obtener el resultado de la solicitud
            const data = response.data;
          // Mostrar el resultado en un elemento h1
            
            this.resultado = JSON.stringify(data);
            console.log(this.resultado);

            console.log(data);

            const firstItem = data[0];
            const idUsuario = firstItem.id_usuario;
            console.log(idUsuario);
            
          })
          .catch(error => {
            console.error(error);
          });
      },

      editarProfesor(item) {
        this.dialogEditarProfesor = true;
        this.profesor = { ...item };
        
       

        // Realizar la solicitud POST al endpoint
        axios.post('http://127.0.0.1:5050/user', {
          id_usuario: item.id_user
        })
          .then(response => {
          // Asignar los valores de la respuesta al objeto usuario
            const data = response.data;
            
          // Mostrar el resultado en un elemento h1
        

            const firstItem = data[0];

            this.usuario.id_usuario = firstItem.id_usuario;
            this.profesor.nickname = firstItem.nickname;
            this.usuario.password = firstItem.password;
            this.usuario.nombre = firstItem.nombre;
            this.usuario.apellido = firstItem.apellido;
            this.usuario.edad = firstItem.edad;
            this.usuario.genero = firstItem.genero;
            this.usuario.correo = firstItem.correo;
            this.usuario.telefono = firstItem.telefono;
            this.usuario.direccion = firstItem.direccion;
            this.usuario.dni = firstItem.dni;
            this.usuario.foto = firstItem.foto;
          })
          .catch(error => {
            console.error(error);
          });
      },

      
      createProfesor() {
        // Prepare the form data
        const formData = new FormData();
        formData.append('foto', this.foto);
        formData.append('nickname', this.nickname);
        formData.append('password', this.password);
        formData.append('nombre', this.nombre);
        formData.append('apellido', this.apellido);
        formData.append('edad', this.edad);
        formData.append('genero', this.genero);
        formData.append('correo_electronico', this.correo);
        formData.append('telefono', this.telefono);
        formData.append('direccion', this.direccion);
        formData.append('dni', this.dni);
        formData.append('departamento', this.departamento);

        // Make the POST request
        axios.post('http://127.0.0.1:5050/create_profesor', formData)
          .then(response => {
            // Handle the response here
            console.log(response.data);
            this.get_profesores();
            this.close;
          })
          .catch(error => {
            // Handle the error here
            console.error(error);
          });
      },

      updateProfesor() {
        // Prepare the data to send in the request
        const formData = new FormData();
        
        formData.append('nickname', this.profesor.nickname);
        formData.append('password', this.usuario.password);
        formData.append('nombre', this.usuario.nombre);
        formData.append('apellido', this.usuario.apellido);
        formData.append('edad', this.usuario.edad);
        formData.append('genero', this.usuario.genero);
        formData.append('correo_electronico', this.usuario.correo);
        formData.append('telefono', this.usuario.telefono);
        formData.append('direccion', this.usuario.direccion);
        formData.append('departamento', this.profesor.departamento);
        formData.append('foto', this.usuario.foto);
        formData.append('id_profesor', this.profesor.id);

        // Make the HTTP request
        axios.patch('http://127.0.0.1:5050/update_profesor', formData)
          .then(response => {
            // Handle the response
            console.log(response.data);
            this.get_profesores();
            this.dialogEditarProfesor = false;
            // Do something with the response if needed
          })
          .catch(error => {
            // Handle the error
            console.error(error);
            // Do something with the error if needed
          });
      },

      eliminarProfesor(item) {
        // Realiza la lógica para eliminar el usuario
        // Puedes utilizar el ID del usuario o cualquier otra propiedad única para identificarlo
        // Por ejemplo, si tienes un ID único para cada usuario, podrías hacer algo como:
        const profesorId = item.id;
        
        // Luego, puedes hacer la llamada a la API para eliminar el usuario
        axios.delete('http://127.0.0.1:5050/delete_profesor', { data: { id_profesor:  profesorId } })
        .then(response => {
          // Realizar cualquier acción adicional después de borrar el usuario
          console.log(response.data);
          this.get_profesores();
          
        })
        .catch(error => {
          // Manejar el error
          console.error(error);
        });
      },

      actualizarListaUsuarios(usuarioId) {
        const index = this.profesores.findIndex(usuario => usuario.id === usuarioId);
        if (index !== -1) {
          this.profesores.splice(index, 1);
        }
      },

      get_profesores(){
        axios.get('http://127.0.0.1:5050/get_profesores')
        .then(response => {
          this.profesores = response.data.map(user => {
          return {
            id:user.id_profesor,
            departamento: user.departamento,
            nombre: user.nombre,
            apellido: user.apellido,
            id_user : user.id_usuario
            
            
          };
        });
        })
        .catch(error => {
          // Manejar el error
          console.error(error);
        });
      }
      
    },

    computed: {
    
    columnas() {
        return [
            { text: 'ID', value: 'id' },
            { text: 'Deaprtamento', value: 'departamento' },
            { text: 'Nombre', value: 'nombre' },
            { text: 'Apellido', value: 'apellido' },
            { text: 'Id_user', value: 'id_user' },
            { text: 'Acciones', value: 'actions', sortable: false }

            ];
        }
    },


    created() {
      this.get_profesores();
    },


}
</script>