import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/:lang/',
		name: 'Home',
		component: Home
	},
	{
		path: '/:lang/login',
		name: 'Login',
		component: () => import('../views/About.vue')
	},
	{
		path: '/about',
		name: 'About',

		component: () => import('../views/About.vue')
	},
	{
		path: '*',
		name: '404 Error',
		component: () => import('../views/Error404.vue')
	}
];

const router = new VueRouter({
	routes
});

export default router;
