import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import { isLoggedIn } from '../auth';

Vue.use(VueRouter);

const routes = [
	// Basic routes
	{
		path: '/:lang/',
		name: 'Home',
		component: Home,
		meta: {
			allowAnonymous: true,
			requireRole: ''
		}
	},

	{
		path: '/about',
		name: 'About',

		component: () => import('../views/About.vue'),
		meta: {
			allowAnonymous: true,
			requireRole: ''
		},
		meta: {
			allowAnonymous: true,
			requireRole: ''
		}
	},
	{
		path: '*',
		name: '404 Error',
		component: () => import('../views/Error404.vue'),
		meta: {
			allowAnonymous: true,
			requireRole: ''
		}
	},

	// User routes
	{
		path: '/:lang/login',
		name: 'Login',
		component: () => import('../views/user/Login.vue'),
		meta: {
			allowAnonymous: true,
			requireRole: ''
		}
	},
	{
		path: '/:lang/registration',
		name: 'Signup',
		component: () => import('../views/user/Signup.vue'),
		meta: {
			allowAnonymous: true,
			requireRole: ''
		}
	},
	{
		path: '/:lang/profile',
		name: 'Profile',
		component: () => import('../views/user/Profile.vue'),
		meta: {
			allowAnonymous: false,
			requireRole: ''
		}
	},

	// Seller routes
	{
		path: '/:lang/seller/shops',
		name: 'SellerShops',
		component: () => import('../views/seller/Shops.vue'),
		meta: {
			allowAnonymous: false,
			requireRole: 'seller'
		}
	},
	{
		path: '/:lang/seller/plates',
		name: 'SellerPlates',
		component: () => import('../views/seller/Plates.vue'),
		meta: {
			allowAnonymous: false,
			requireRole: 'seller'
		}
	},
	{
		path: '/:lang/seller/notifications/:id',
		name: 'Notifications',
		component: () => import('../views/seller/Notifications.vue'),
		meta: {
			allowAnonymous: false,
			requireRole: 'seller'
		}
	},

	// Client routes
	{
		path: '/:lang/search',
		name: 'Search',
		component: () => import('../views/client/Search.vue'),
		meta: {
			allowAnonymous: true,
			requireRole: ''
		}
	},
	{
		path: '/:lang/shop/:id',
		name: 'ShopInfo',
		component: () => import('../views/client/ShopInfo.vue'),
		meta: {
			allowAnonymous: true,
			requireRole: ''
		}
	},
	{
		path: '/:lang/shop/:id/menu',
		name: 'Menu',
		component: () => import('../views/client/Menu.vue'),
		meta: {
			allowAnonymous: false,
			requireRole: 'client'
		}
	},
	{
		path: '/:lang/cart',
		name: 'Cart',
		component: () => import('../views/client/Cart.vue'),
		meta: {
			allowAnonymous: false,
			requireRole: 'client'
		}
	},
	{
		path: '/:lang/inshop/:id',
		name: 'InShopPanel',
		component: () => import('../views/client/InShopPanel.vue'),
		meta: {
			allowAnonymous: false,
			requireRole: 'client'
		}
	}
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	// Before Each function for redirecting to english page if not language especificated
	const path = to.path.split('/');
	if (!(path.includes('es') || path.includes('en') || path.includes('gl'))) {
		next('/en' + to.path);
	} else {
		next();
	}
});
router.beforeEach((to, from, next) => {
	if (
		!to.meta.allowAnonymous &&
		!(!to.meta.requireRole || isLoggedIn().role === 'admin' || to.meta.requireRole === isLoggedIn().role)
	) {
		next({
			name: 'Login',
			query: { redirect: to.fullPath },
			params: { lang: to.params.lang }
		});
	} else {
		next();
	}
});

export default router;
