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
		component: () => import('../views/Login.vue')
	},
	{
		path: '/:lang/registration',
		name: 'Signup',
		component: () => import('../views/Signup.vue')
	},
	{
		path: '/:lang/profile',
		name: 'Profile',
		component: () => import('../views/Profile.vue')
	},
	{
		path: '/:lang/cart',
		name: 'Cart',
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

// Before Each function for redirecting to english page if not language especificated
router.beforeEach((to, from, next) => {
	const path = to.path.split('/');
	if (!(path.includes('es') || path.includes('en') || path.includes('gl'))) {
		next('/en' + to.path);
	} else {
		next();
	}
});

export default router;
