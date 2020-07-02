<template>
	<div class="cart">
		<vue-headful v-if="lang === 'en'" title="Cart | Lastorder" description="Home page of hackamarket" />
		<vue-headful v-if="lang === 'es'" title="Carrito | Lastorder" description="Home page of hackamarket" />
		<vue-headful v-if="lang === 'gl'" title="Carrito | Lastorder" description="Home page of hackamarket" />

		<menucustom />

		<header v-if="cart !== null">
			<h1 v-show="lang === 'en'">Cart</h1>
			<h1 v-show="lang === 'es'">Carrito</h1>
			<h1 v-show="lang === 'gl'">Carrito</h1>

			<router-link :to="{ name: 'Search' }" v-show="cart.length === 0" :class="{ error: errorIn === 'empty' }">
				<h1 v-show="lang === 'en'">Add items to cart</h1>
				<h1 v-show="lang === 'es'">Añade platos al carro</h1>
				<h1 v-show="lang === 'gl'">Añade pratos ao carrito</h1>
			</router-link>
		</header>

		<header v-if="cart === null">
			<router-link :to="{ name: 'Search' }">
				<h1 v-show="lang === 'en'">Add items to cart</h1>
				<h1 v-show="lang === 'es'">Añade platos al carro</h1>
				<h1 v-show="lang === 'gl'">Añade pratos ao carrito</h1>
			</router-link>
		</header>

		<main v-if="cart !== null">
			<nav>
				<label for="table">
					<span v-show="lang === 'en'">Table number:</span>
					<span v-show="lang === 'es'">Número de la mesa:</span>
					<span v-show="lang === 'gl'">Número da mesa:</span>
				</label>
				<input
					type="Number"
					min="1"
					:class="{ errorHere: errorIn === 'tableNumber' }"
					name="table"
					id="table"
					v-model="tableNumber"
				/>

				<button class="submit" @click="checkout()">
					<span v-show="lang === 'en'">Checkout cart</span>
					<span v-show="lang === 'es'">Realizar pedido</span>
					<span v-show="lang === 'gl'">Realizar pedido</span>
				</button>

				<button class="cancel" @click="deleteCart()">
					<span v-show="lang === 'en'">Cancel cart</span>
					<span v-show="lang === 'es'">Cancelar pedido</span>
					<span v-show="lang === 'gl'">Cancelar pedido</span>
				</button>
				<p class="error" v-show="this.error">{{ error }}</p>
			</nav>

			<div v-show="cart.length > 0">
				<p v-show="lang === 'en'">Price</p>
				<p v-show="lang === 'es'">Precio</p>
				<p v-show="lang === 'gl'">Precio</p>
			</div>

			<ul>
				<li v-for="plate in cart" :key="plate.id">
					<figure v-if="plate.photo" :style="{ 'background-image': `url(${imgUrl + plate.photo})` }">
						<router-link :to="{ name: 'Menu', params: { lang: lang, id: plate.id_shop } }"></router-link>
					</figure>

					<figure v-if="!plate.photo">
						<router-link :to="{ name: 'Menu', params: { lang: lang, id: plate.id_shop } }"></router-link>
					</figure>

					<div class="text">
						<router-link :to="{ name: 'Menu', params: { lang: lang, id: plate.id_shop } }">
							<h2>{{ plate.name }}</h2>
						</router-link>

						<div>
							<select
								v-show="!input"
								v-model="plate.ammount"
								@change="updatePlateAmmount(plate.id_plate, plate.ammount)"
							>
								<option value="1">
									<span v-if="lang === 'en'">Ammo.: 1</span>
									<span v-if="lang === 'es'">Cant.: 1</span>
									<span v-if="lang === 'gl'">Cant.: 1</span>
								</option>
								<option value="2">
									<span v-if="lang === 'en'">Ammo.: 2</span>
									<span v-if="lang === 'es'">Cant.: 2</span>
									<span v-if="lang === 'gl'">Cant.: 2</span>
								</option>
								<option value="3">
									<span v-if="lang === 'en'">Ammo.: 3</span>
									<span v-if="lang === 'es'">Cant.: 3</span>
									<span v-if="lang === 'gl'">Cant.: 3</span>
								</option>
								<option value="4">
									<span v-if="lang === 'en'">Ammo.: 4</span>
									<span v-if="lang === 'es'">Cant.: 4</span>
									<span v-if="lang === 'gl'">Cant.: 4</span>
								</option>
								<option value="5">
									<span v-if="lang === 'en'">Ammo.: 5</span>
									<span v-if="lang === 'es'">Cant.: 5</span>
									<span v-if="lang === 'gl'">Cant.: 5</span>
								</option>
								<option value="6">
									<span v-if="lang === 'en'">Ammo.: 6</span>
									<span v-if="lang === 'es'">Cant.: 6</span>
									<span v-if="lang === 'gl'">Cant.: 6</span>
								</option>
								<option value="7">
									<span v-if="lang === 'en'">Ammo.: 7</span>
									<span v-if="lang === 'es'">Cant.: 7</span>
									<span v-if="lang === 'gl'">Cant.: 7</span>
								</option>
								<option value="8">
									<span v-if="lang === 'en'">Ammo.: 8</span>
									<span v-if="lang === 'es'">Cant.: 8</span>
									<span v-if="lang === 'gl'">Cant.: 8</span>
								</option>
								<option value="9">
									<span v-if="lang === 'en'">Ammo.: 9</span>
									<span v-if="lang === 'es'">Cant.: 9</span>
									<span v-if="lang === 'gl'">Cant.: 9</span>
								</option>
								<option value>
									<span v-if="lang === 'en'">Ammo.: >10</span>
									<span v-if="lang === 'es'">Cant.: >10</span>
									<span v-if="lang === 'gl'">Cant.: >10</span>
								</option>
							</select>
							<form>
								<input v-show="input" type="number" min="0" v-model="plate.ammount" placeholder="?" />
								<button v-show="input" @click="updatePlateAmmount(plate.id_plate, plate.ammount)">
									<p v-show="lang === 'en'">Update</p>
									<p v-show="lang === 'es'">Actualizar</p>
									<p v-show="lang === 'gl'">Actualizar</p>
								</button>
							</form>

							<p @click="deletePlate(plate.id_plate)" v-show="lang === 'en'">Delete</p>
							<p @click="deletePlate(plate.id_plate)" v-show="lang === 'es'">Eliminar</p>
							<p @click="deletePlate(plate.id_plate)" v-show="lang === 'gl'">Eliminar</p>
						</div>

						<h3>{{ plate.prize }}€</h3>
					</div>
				</li>
			</ul>
		</main>
		<footercustom />
	</div>
</template>

<script>
import { getHeader } from '../../auth';

// Import modules
import axios from 'axios';
import Swal from 'sweetalert2';

// Components
import menucustom from '@/components/MenuCustom.vue';
import footercustom from '@/components/FooterCustom.vue';
import plateview from '@/components/client/PlateView.vue';

export default {
	name: 'Cart',
	components: {
		menucustom,
		footercustom,
		plateview
	},
	data() {
		return {
			imgUrl: process.env.VUE_APP_BACKEND_URL + '/uploads/',
			input: false,
			tableNumber: null,
			error: '',
			errorIn: null,

			originalCart: [],
			cart: null
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		}
	},
	methods: {
		async getCart() {
			const response = await axios.get(process.env.VUE_APP_BACKEND_URL + '/visits/', {
				headers: getHeader()
			});

			return response.data.data;
		},

		async updatePlateAmmount(id, ammount) {
			try {
				if (ammount === '') {
					this.input = true;
				} else {
					const response = await axios.post(
						process.env.VUE_APP_BACKEND_URL + `/visits/`,
						{
							plate_id: id,
							ammount: ammount
						},
						{
							headers: getHeader()
						}
					);
					location.reload();
				}
			} catch (error) {
				console.log(error.response);
			}
		},

		async checkout() {
			console.log(this.tableNumber);
			try {
				if (this.validateForm()) {
					const response = await axios.post(
						process.env.VUE_APP_BACKEND_URL + `/visits/checkout`,
						{
							table_id: this.tableNumber
						},
						{
							headers: getHeader()
						}
					);

					this.error = '';

					let title = '';

					if (this.lang === 'en') {
						title = 'Checkout successful';
					} else if (this.lang === 'es') {
						title = 'Pedido realizado correctamente';
					} else if (this.lang === 'gl') {
						title = 'Pedido realizado correctamente';
					}

					Swal.fire({
						title: title,
						icon: 'success',
						showConfirmButton: false,
						timer: 1500
					}).then(async () => {
						await this.sendorder();
						this.$router.push({
							name: 'InShopPanel',
							params: { lang: this.lang, id: this.cart[0].id_shop, tableNumber: this.tableNumber }
						});
					});
				}
			} catch (error) {
				console.log(error.response);
			}
		},

		validateForm() {
			if (!this.cart.length) {
				let message = '';

				if (this.lang === 'en') {
					message = 'The cart is empty';
				} else if (this.lang === 'es') {
					message = 'El carrito está vacío';
				} else if (this.lang === 'gl') {
					message = 'O carrito está valeiro';
				}

				this.errorIn = 'empty';
				this.error = message;
				return false;
			} else if (this.tableNumber === null) {
				let message = '';

				if (this.lang === 'en') {
					message = 'The table number must be filled';
				} else if (this.lang === 'es') {
					message = 'El número de mesa es obligatorio';
				} else if (this.lang === 'gl') {
					message = 'O número de mesa é obrigatorio';
				}

				this.errorIn = 'tableNumber';
				this.error = message;
				return false;
			} else {
				return true;
			}
		},

		async deleteCart() {
			try {
				const response = await axios.delete(process.env.VUE_APP_BACKEND_URL + `/visits/`, {
					headers: getHeader()
				});
				location.reload();
			} catch (error) {
				console.log(error.response);
			}
		},

		async deletePlate(id) {
			try {
				console.log(id);
				const response = await axios.delete(process.env.VUE_APP_BACKEND_URL + `/visits/${id}/remove`, {
					data: {
						reduce_completly: true
					},
					headers: getHeader()
				});
				location.reload();
			} catch (error) {
				console.log(error.response);
			}
		},

		async sendorder() {
			console.log('object');

			const connection = await new Promise(function(resolve, reject) {
				var server = new WebSocket(process.env.VUE_APP_BACKEND_WEBSOCKET_URL);
				server.onopen = function() {
					resolve(server);
				};
				server.onerror = function(err) {
					reject(err);
				};
			});

			console.log(this.cart[0].id_shop);
			connection.send(
				JSON.stringify({
					type: 'order',
					shopId: this.cart[0].id_shop,
					plates: [...this.cart],
					tableNumber: this.tableNumber
				})
			);
		}
	},
	async created() {
		this.cart = await this.getCart();
		for (const plate of this.cart) {
			if (plate.ammount >= 10) {
				this.input = true;
			}
		}

		console.log(this.cart);
		this.originalCart = JSON.parse(JSON.stringify(this.cart));
	}
};
</script>

<style scoped>
.cart {
	position: relative;
	min-height: 100vh;
	color: black;
}
main {
	padding-bottom: 1px;
}
main > div > p {
	width: 89%;

	text-align: right;
}

a {
	color: black;
}

ul {
	list-style: none;
	display: flex;

	flex-wrap: wrap;
	justify-content: center;
	max-width: 100%;
	margin: 0 auto;
	padding-bottom: 5rem;
	margin-bottom: 10rem;
}

li {
	width: 80%;
	display: flex;
	margin-top: 0.5rem;
	padding-top: 0.5rem;
	justify-content: space-between;
	border-top: 1px solid black;
}

li .text {
	position: relative;
	margin-left: 1rem;
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: column;
}

li .text div,
form {
	display: flex;
}

li .text div > p {
	color: rgb(29, 29, 34);
	margin: 5px;
	padding-left: 5px;
	border-left: 1px solid black;
	cursor: pointer;
}

li .text div p:hover {
	text-decoration: underline;
}

select {
	padding: 5px;
}

input {
	width: 45px;
}

.text > div > button {
	height: 1.3rem;
	margin: auto 3px;
}

li div h3 {
	position: absolute;
	top: 5px;
	right: 10px;
}

figure {
	width: 280px;
	height: 150px;
	background-image: url('../../assets/none.png');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
}

figure a {
	display: block;
	width: 200px;
	height: 120px;
}

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
	border: 3px solid black;
	height: 3rem;
	font-size: 1.5rem;
	margin: 1rem 100%;
}

nav button {
	border: 0;
	font-weight: bold;
	font-size: 0.9rem;
	margin: 1rem auto;
	padding: 0.7rem 4rem;
	border-radius: 0.4em;
	cursor: pointer;
	border: 3px solid black;
}

a h1 {
	margin: 2rem;
}

.submit {
	/* border: 3px solid #3d5e42; */
	background: black;
	color: white;
}

a {
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

.error {
	margin: 1.4rem 3rem 0;
	text-align: left;
	color: red;
	text-align: center;
}

.errorHere {
	border: 3px solid red;
}

@media (max-width: 600px) {
	li {
		flex-wrap: wrap;
	}

	li .text {
		height: 5rem;
	}
}
</style>
