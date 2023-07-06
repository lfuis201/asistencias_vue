<template>
  <v-app>
    <v-app-bar
      app
      color="deep-purple accent-4"
      dark
      elevation="20"
      
    >
      <div class="d-flex align-center" >
        <router-link to="/" class="router-link">
          <div class="shrink mr-2">
            <v-icon size="24">mdi-star</v-icon>
            
          </div>
          
        </router-link>

        
      </div>

      <template v-slot:extension>
        <v-tabs v-model="activeTab">
          <v-tab v-for="tab in tabs" :key="tab.id" @click="navigateToUserTab(tab.id)">
            {{ tab.title }}
          </v-tab>
        </v-tabs>
    
        <!-- Contenido de cada pestaña -->
        <v-tabs-items v-model="activeTab">
          <v-tab-item v-for="tab in tabs" :key="tab.id">
            <v-card flat>
              <!-- Contenido de la pestaña -->
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </template>

      <v-spacer></v-spacer>
      <!-- Enlace a la ruta raíz '/' -->
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    tab: null,
      activeTab: null,
      tabs: [
        { id: 1, title: 'Usuarios' },
        { id: 2, title: 'Profesores' },
        { id: 3, title: 'Alumnos' },
        { id: 4, title: 'Cursos' },
        { id: 5, title: 'Secciones' },
        { id: 6, title: 'Secciones de alumnos' },
        { id: 7, title: 'Secciones de profesores' },
        { id: 8, title: 'Asistencia' },
      ],
  }),

  methods: {
    navigateToUserTab(tabId) {
      if (tabId === 1) { // Reemplaza '2' con el ID del tab de 'User'
        this.$router.push('/user');
      }
      if (tabId === 2) { // Reemplaza '2' con el ID del tab de 'User'
        this.$router.push('/profesor');
      }
      if (tabId === 3) { // Reemplaza '2' con el ID del tab de 'User'
        this.$router.push('/alumno');
      }
      if (tabId === 4) { // Reemplaza '2' con el ID del tab de 'User'
        this.$router.push('/curso');
      }
      if (tabId === 5) { // Reemplaza '2' con el ID del tab de 'User'
        this.$router.push('/secciones');
      }
      if (tabId === 6) { // Reemplaza '2' con el ID del tab de 'User'
        this.$router.push('/alumno_seccion');
      }
      if (tabId === 7) { // Reemplaza '2' con el ID del tab de 'User'
        this.$router.push('/profesor_seccion');
      }
      if (tabId === 8) { // Reemplaza '2' con el ID del tab de 'User'
        this.$router.push('/asistencia');
      }
    },
  },

};
</script>

