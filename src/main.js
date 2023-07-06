import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import HelloWorld from './components/HelloWorld'
import UserComponent from './components/UserComponent'
import ProfesorComponent from './components/ProfesorComponent'
import AlumnoComponent from './components/AlumnoComponent'
import CursoComponent from './components/CursoComponent'
import SeccionComponent from './components/SeccionComponent'
import AlumnoSeccionComponent from './components/AlumnoSeccionComponent'
import ProfesorSeccionComponent from './components/ProfesorSeccionComponent'
import AsistenciaComponent from './components/AsistenciaComponent'

import NotfoundComponent from './components/NotfoundComponent'

Vue.config.productionTip = false;
Vue.use(VueRouter)
Vue.use(VueRouter)

const routes = [
      {
        path: '/user',
        component: UserComponent
      },
      {
        path: '/',
        component: HelloWorld 
      },
      {
        path: '/alumno',
        component: AlumnoComponent 
      },
      {
        path: '/profesor',
        component: ProfesorComponent 
      },
      {
        path: '/curso',
        component: CursoComponent 
      },
      {
        path: '/secciones',
        component: SeccionComponent 
      },
      {
        path: '/alumno_seccion',
        component: AlumnoSeccionComponent 
      },
      {
        path: '/profesor_seccion',
        component: ProfesorSeccionComponent 
      },
      {
        path: '/asistencia',
        component: AsistenciaComponent 
      },
      {
        path: '*',
        component: NotfoundComponent
      }
]

// Crea una instancia de VueRouter con las rutas definidas
const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')