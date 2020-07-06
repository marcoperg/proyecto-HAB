<template>
	<div class="panel">
		<vue-headful
			v-if="lang === 'en'"
			title="Request Panel | Lastorder"
			description="Home page of hackamarket"
		/>
		<vue-headful
			v-if="lang === 'es'"
			title="Panel de peticiones | Lastorder"
			description="Home page of hackamarket"
		/>
		<vue-headful
			v-if="lang === 'gl'"
			title="Panel de peticiónss | Lastorder"
			description="Home page of hackamarket"
		/>

		<menucustom />

		<main>
			<nav>
				<label for="table">
					<span v-show="lang === 'en'">Table number:</span>
					<span v-show="lang === 'es'">Número de la mesa:</span>
					<span v-show="lang === 'gl'">Número da mesa:</span>
				</label>
				<input
					type="Number"
					min="1"
					name="table"
					id="table"
					v-model="tableNumber"
					:class="{ error: !tableNumber }"
				/>
			</nav>

			<ul>
				<li>
					<button @click="callWaiter()">
						<img src="@/assets/waiterWhite.png" alt="Waiter" />

						<span v-show="lang === 'en'">Call the waiter</span>
						<span v-show="lang === 'es'">Llamar al camarero</span>
						<span v-show="lang === 'gl'">Chamar ao camarero</span>
					</button>
				</li>

				<li>
					<button @click="pay()">
						<img src="@/assets/pay.png" alt="Pay" />

						<span v-show="lang === 'en'">Pay</span>
						<span v-show="lang === 'es'">Pagar</span>
						<span v-show="lang === 'gl'">Pagar</span>
					</button>
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

export default {
	name: 'InShopPanel',
	components: {
		menucustom,
		footercustom
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		},
		shopId() {
			return this.$route.params.id;
		}
	},
	data() {
		return {
			connection: null,
			tableNumber: this.$route.params.tableNumber
		};
	},
	methods: {
		callWaiter() {
			this.connection.send(JSON.stringify({ type: 'waiter', shopId: this.shopId, tableNumber: this.tableNumber }));
			console.log(JSON.stringify({ type: 'waiter', shopId: this.shopId, tableNumber: this.tableNumber }));

			let title = '';

			if (this.lang === 'en') {
				title = 'Waiter incoming';
			} else if (this.lang === 'es') {
				title = 'Camarero en camino';
			} else if (this.lang === 'gl') {
				title = 'Camarero en camino';
			}

			Swal.fire({
				title: title,
				icon: 'success',
				showConfirmButton: false,
				timer: 1500
			});
		},
		pay() {
			alert('object');
		}
	},
	created() {
		// Socket listeners
		this.connection = new WebSocket(process.env.VUE_APP_BACKEND_WEBSOCKET_URL);
	}
};
</script>

<style scoped>
.panel {
	position: relative;
}

/* <Number selector styles> */
nav {
	margin: 2rem auto 0;
	max-width: 600px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

nav label {
	padding: 0 5rem;
}

nav input {
	width: 45px;
	border: 3px solid black;
	height: 3rem;
	font-size: 1.5rem;
	margin: 1rem 100%;
}
/* </Number selector styles> */

/* <Buttons styles> */
ul {
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	/* width: 80%; */
	justify-content: space-evenly;
	margin: 4rem auto 0;
	min-height: 100vh;
}

li {
	background: black;
	width: 15rem;
	height: 20rem;
	margin-bottom: 3rem;
}

li button {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;

	color: white;
	font-size: 1.3rem;
	font-weight: bold;

	width: 100%;
	height: 100%;
	background: 0;

	cursor: pointer;
}

li button img {
	width: 225px;
	height: 225px;
}

.error {
	border: 3px solid red;
}
/* </Buttons styles> */
</style>
