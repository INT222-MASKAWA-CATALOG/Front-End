import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import(/* webpackChunkName: "team" */ '../views/Team.vue')
  },
  {
    path: '/addproduct',
    name: 'AddProduct',
    component: () => import(/* webpackChunkName: "addproduct" */ '../views/AddProduct.vue')
  },
  {
    path: '/managesys',
    name: 'ManageSystem',
    component: () => import(/* webpackChunkName: "managesystem" */ '../views/ManageSystem.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
