import Vue from 'vue';
import App from './App.vue';
import router from './router';
import dotenv from 'dotenv';
import x5GMaps from 'x5-gmaps';
import vueHeadful from 'vue-headful';

dotenv.config();
Vue.component('vue-headful', vueHeadful);

Vue.use(x5GMaps, 'AIzaSyBRotiGE9V1foKsGA291dO4bT5WL4Un9zg');

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app');
