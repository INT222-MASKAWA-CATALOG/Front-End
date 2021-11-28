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
		path: '/editproduct',
		name: 'EditProduct',
		component: () => import(/* webpackChunkName: "addproduct" */ '../views/EditProduct.vue')
	},
	{
		path: '/managesys',
		name: 'ManageSystem',
		component: () => import(/* webpackChunkName: "managesystem" */ '../views/ManageSystem.vue')
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import(/* webpackChunkName: "managesystem" */ '../views/Profile.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
