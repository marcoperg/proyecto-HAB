<template>
	<div class="notifications">
		<vue-headful v-if="lang === 'en'" title="Notifications | Lastorder" description="Home page of hackamarket" />
		<vue-headful v-if="lang === 'es'" title="Notificaciones | Lastorder" description="Home page of hackamarket" />
		<vue-headful v-if="lang === 'gl'" title="Notificacións | Lastorder" description="Home page of hackamarket" />

		<menucustom />

		<main>
			<h1 v-show="lang === 'en'">Notifications of shop #{{ shopId }}</h1>
			<h1 v-show="lang === 'es'">Notificaciones de la tienda #{{ shopId }}</h1>
			<h1 v-show="lang === 'gl'">Notificacións da tenda #{{ shopId }}</h1>

			<div class="notificationscolumns">
				<div class="ordernotifications">
					<h2 v-show="lang === 'en'">Orders</h2>
					<h2 v-show="lang === 'es'">Pedidos</h2>
					<h2 v-show="lang === 'gl'">Pedidos</h2>

					<ul>
						<li v-for="msg in msgs" :key="msg.id">
							<ordernotification v-if="msg.type === 'order'" :data="msg" :lang="lang" />
						</li>
					</ul>
				</div>

				<div class="waiternotifications">
					<h2 v-show="lang === 'en'">Waiter calls from tables</h2>
					<h2 v-show="lang === 'es'">Llamadas al camarero desde las mesas</h2>
					<h2 v-show="lang === 'gl'">Chamadas ao camareiro dende las mesas</h2>
					<ul>
						<li v-for="msg in msgs" :key="msg.id">
							<waiternotification v-if="msg.type === 'waiter'" :data="msg" :lang="lang" />
						</li>
					</ul>
				</div>
			</div>
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

ul {
	list-style: none;
	width: 50vw;
}

li {
	margin: 2rem 0;
}

.notificationscolumns {
	margin-top: 2rem;
	display: flex;
	justify-content: space-evenly;
}

.notificationscolumns div {
	position: relative;
	min-height: 100%;
}
</style>
