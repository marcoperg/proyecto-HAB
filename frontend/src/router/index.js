import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
	// Basic routes
	{
		path: '/:lang/',
		name: 'Home',
		component: Home
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
	},

	// User routes
	{
		path: '/:lang/login',
		name: 'Login',
		component: () => import('../views/user/Login.vue')
	},
	{
		path: '/:lang/registration',
		name: 'Signup',
		component: () => import('../views/user/Signup.vue')
	},
	{
		path: '/:lang/profile',
		name: 'Profile',
		component: () => import('../views/user/Profile.vue')
	},

	// Seller routes
	{
		path: '/:lang/seller/shops',
		name: 'SellerShops',
		component: () => import('../views/seller/Shops.vue')
	},
	{
		path: '/:lang/seller/plates',
		name: 'SellerPlates',
		component: () => import('../views/seller/Plates.vue')
	},
	{
		path: '/:lang/seller/notifications/:id',
		name: 'Notifications',
		component: () => import('../views/seller/Notifications.vue')
	},

	// Client routes
	{
		path: '/:lang/search',
		name: 'Search',
		component: () => import('../views/client/Search.vue')
	},
	{
		path: '/:lang/shop/:id',
		name: 'ShopInfo',
		component: () => import('../views/client/ShopInfo.vue')
	},
	{
		path: '/:lang/shop/:id/menu',
		name: 'Menu',
		component: () => import('../views/client/Menu.vue')
	},
	{
		path: '/:lang/cart',
		name: 'Cart',
		component: () => import('../views/client/Cart.vue')
	},
	{
		path: '/:lang/inshop/:id',
		name: 'InShopPanel',
		component: () => import('../views/client/InShopPanel.vue')
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
