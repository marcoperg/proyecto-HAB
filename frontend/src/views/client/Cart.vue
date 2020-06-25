<template>
	<div class="cart">
		<menucustom />
		<header>
			<h1 v-show="lang==='en'">Cart</h1>
			<h1 v-show="lang==='es'">Carrito</h1>
			<h1 v-show="lang==='gl'">Carrito</h1>

			<router-link :to="{name: 'Home'}">
				<h1 v-show="lang==='en'">Add items to cart</h1>
				<h1 v-show="lang==='es'">Añade platos al carro</h1>
				<h1 v-show="lang==='gl'">Añade pratos ao carrito</h1>
			</router-link>
		</header>

		<main>
			<p v-show="lang==='en'">Price</p>
			<p v-show="lang==='es'">Precio</p>
			<p v-show="lang==='gl'">Precio</p>
			<ul>
				<li v-for="plate in cart" :key="plate.id">
					<figure v-if="plate.photo" :style="{'background-image': `url(${imgUrl + plate.photo})`}">
						<router-link :to="{name: 'Menu', params: {lang: lang, id: plate.id_shop}}"></router-link>
					</figure>

					<figure v-if="!plate.photo">
						<router-link :to="{name: 'Menu', params: {lang: lang, id: plate.id_shop}}"></router-link>
					</figure>

					<div class="text">
						<h2>{{plate.name}}</h2>

						<div>
							<select
								v-show="!input"
								v-model="plate.ammount"
								@change="updatePlateAmmount(plate.id_plate, plate.ammount)"
							>
								<option value="1">Cant.: 1</option>
								<option value="2">Cant.: 2</option>
								<option value="3">Cant.: 3</option>
								<option value="4">Cant.: 4</option>
								<option value="5">Cant.: 5</option>
								<option value="6">Cant.: 6</option>
								<option value="7">Cant.: 7</option>
								<option value="8">Cant.: 8</option>
								<option value="9">Cant.: 9</option>
								<option value="+10">Cant.: +10</option>
							</select>

							<input v-show="input" type="text" v-model="plate.ammount" />
							<button v-show="input" @click="updatePlateAmmount(plate.id_plate, plate.ammount)">
								<p v-show="lang==='en'">Update</p>
								<p v-show="lang==='es'">Actualizar</p>
								<p v-show="lang==='gl'">Actualizar</p>
							</button>

							<p @click="deletePlate(plate.id_plate)" v-show="lang==='en'">Delete</p>
							<p @click="deletePlate(plate.id_plate)" v-show="lang==='es'">Eliminar</p>
							<p @click="deletePlate(plate.id_plate)" v-show="lang==='gl'">Eliminar</p>
						</div>

						<h3>{{plate.prize}}€</h3>
					</div>
				</li>
			</ul>

			<nav>
				<label for="table">
					<span v-show="lang==='en'">Table number:</span>
					<span v-show="lang==='es'">Número de la mesa:</span>
					<span v-show="lang==='gl'">Número da mesa:</span>
				</label>
				<input type="Number" name="table" id="table" v-model="tableNumber" />

				<button class="cancel" @click="deleteCart()">
					<span v-show="lang==='en'">Cancel cart</span>
					<span v-show="lang==='es'">Cancelar pedido</span>
					<span v-show="lang==='gl'">Cancelar pedido</span>
				</button>

				<button class="submit" @click="checkout()">
					<span v-show="lang==='en'">Checkout cart</span>
					<span v-show="lang==='es'">Hacer pedido</span>
					<span v-show="lang==='gl'">Facer pedido</span>
				</button>
			</nav>
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

			originalCart: [],
			cart: []
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
				if (ammount === '+10') {
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
			try {
				const response = await axios.post(
					process.env.VUE_APP_BACKEND_URL + `/visits/checkout`,
					{
						table_id: this.tableNumber
					},
					{
						headers: getHeader()
					}
				);

				location.reload();
			} catch (error) {
				console.log(error.response);
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
		}
	},
	async created() {
		this.cart = await this.getCart();
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

main > p {
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

li .text div {
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
	margin: 0 auto;
	max-width: 600px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding-bottom: 10rem;
}

nav label {
	padding: 0 5rem;
}

nav input {
	border: 3px solid black;
	height: 3rem;
	font-size: 1.5rem;
	margin: 1rem 10rem;
}

nav button {
	border: 0;
	font-weight: bold;
	margin: 1rem;
	padding: 1rem 5rem;
	border-radius: 0.4em;
	cursor: pointer;
	border: 3px solid black;
}

.submit {
	background: black;
	color: white;
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
