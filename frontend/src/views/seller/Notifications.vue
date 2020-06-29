<template>
	<div class="notifications">
		<menucustom />

		<main>
			<h1 v-show="lang === 'en'">Notifications of shop #{{ shopId }}</h1>
			<h1 v-show="lang === 'es'">Pedido</h1>
			<h1 v-show="lang === 'gl'">Pedido</h1>

			<ul>
				<li v-for="msg in msgs" :key="msg.id">
					<ordernotification v-if="msg.type === 'order'" :data="msg" :lang="lang" />
					<waiternotification v-if="msg.type === 'waiter'" :data="msg" :lang="lang" />
				</li>
			</ul>
		</main>

		<footercustom />
	</div>
</template>

<script>
// Import modules
import Swal from 'sweetalert2';

// Components
import menucustom from '@/components/MenuCustom.vue';
import footercustom from '@/components/FooterCustom.vue';
import ordernotification from '@/components/seller/notifications/OrderNotification.vue';
import waiternotification from '@/components/seller/notifications/WaiterNotification.vue';

export default {
	name: 'Notifications',
	components: {
		menucustom,
		footercustom,
		ordernotification,
		waiternotification
	},
	data() {
		return {
			connection: null,
			text: '',
			msgs: []
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		},
		userData() {
			return isLoggedIn();
		},
		shopId() {
			return this.$route.params.id;
		}
	},
	methods: {
		send(msg) {
			this.connection.send(msg);
		},
		onmessage(event) {
			const data = JSON.parse(event.data);

			if (data.shopId == this.shopId) {
				console.log(data);
				this.msgs.unshift(data);
			}
		}
	},
	created() {
		const url = process.env.VUE_APP_BACKEND_WEBSOCKET_URL;

		// Socket listeners
		this.connection = new WebSocket(url);
		this.connection.msgs = [];

		this.connection.onmessage = this.onmessage;

		this.connection.onopen = function(event) {
			console.log('Successfully connected to the echo websocket server...');
		};
	}
};
</script>

<style scoped>
.notifications {
	position: relative;
	min-height: 100vh;
}

main {
	color: black;
	padding-bottom: 10rem;
}

h1 {
	margin: 1rem;
}

li {
	margin: 2rem 0;
}
</style>
