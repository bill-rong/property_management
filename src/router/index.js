import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import AdminHome from '../views/AdminHome.vue'
Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/adminHome',
    name: 'adminHome',
    component: AdminHome
  }
]

const router = new VueRouter({
  routes
})

export default router
