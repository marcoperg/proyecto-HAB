<template>
	<div class="menu">
		<menucustom />
		<header>
			<h1>Menu</h1>
			<router-link :to="{name: 'Cart', params: {lang: lang}}" :class="{empty: !cart.size}">
				<img src="@/assets/icons/cart.png" alt="cart" v-show="!cart.size" />
				<img src="@/assets/icons/cartFull.png" alt="cart" v-show="cart.size" />
				{{cart.size}}
			</router-link>
		</header>

		<main>
			<ul>
				<li
					v-for="(plate, index) in menu"
					:key="plate.id"
					@click="displayPlate(index)"
					:class="{inCart: plate.cart_ammount}"
				>
					<div>
						<h2>{{plate.name}}</h2>
						<p>{{plate.description}}</p>
						<h3>{{plate.cart_ammount}}</h3>
					</div>

					<figure
						v-if="plate.photos.length"
						:style="{'background-image': `url(${imgUrl + plate.photos[0].name})`}"
					></figure>

					<figure v-if="!plate.photos.length"></figure>
				</li>
			</ul>
			<plateview
				v-if="fullView"
				:imgUrl="imgUrl"
				:lang="lang"
				:plate="menu[fullViewIndex]"
				@cancel="fullView=false"
				@add="addToCart"
			/>
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
	name: 'Menu',
	components: {
		menucustom,
		footercustom,
		plateview
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		},
		id() {
			return this.$route.params.id;
		}
	},
	data() {
		return {
			imgUrl: process.env.VUE_APP_BACKEND_URL + '/uploads/',
			menu: [],
			cart: [],
			fullViewIndex: null,
			fullView: false
		};
	},
	methods: {
		async getMenu() {
			try {
				const response = await axios.get(process.env.VUE_APP_BACKEND_URL + '/menu/' + this.id);

				return response.data.data;
			} catch (error) {
				console.log(error.response);
			}
		},
		displayPlate(index) {
			this.fullViewIndex = index;
			this.fullView = true;
		},

		async getCart() {
			const response = await axios.get(process.env.VUE_APP_BACKEND_URL + '/visits/', {
				headers: getHeader()
			});

			return response.data.data;
		},

		async addToCart(data) {
			const response = await axios.post(process.env.VUE_APP_BACKEND_URL + `/visits/`, data, {
				headers: getHeader()
			});

			console.log(response);

			this.error = '';

			let title = '';

			if (this.lang === 'en') {
				title = 'Plate added successfully';
			} else if (this.lang === 'es') {
				title = 'Plato añadido correctamente';
			} else if (this.lang === 'gl') {
				title = 'Prato añadido correctamente';
			}

			Swal.fire({
				title: title,
				icon: 'success',
				showConfirmButton: false,
				timer: 1500
			}).then(() => {
				location.reload();
			});

			console.log(data);
		}
	},
	async created() {
		this.menu = await this.getMenu();
		this.cart = await this.getCart();
		this.cart.size = 0;

		for (let i = 0; i < this.menu.length; i++) {
			for (let j = 0; j < this.cart.length; j++) {
				if (i === 0) this.cart.size += this.cart[j].ammount;

				if (this.menu[i].id === this.cart[j].id_plate) {
					this.$set(this.menu[i], 'cart_ammount', this.cart[j].ammount);
				}
			}
		}

		console.log(this.cart);
		console.log(this.menu);
	}
};
</script>

<style scoped>
.menu {
	color: black;
	position: relative;
	min-height: 100vh;
}

.inCart {
	border: 2.5px solid #4c9141;
	position: relative;
}

.inCart figure {
	height: 154px;
	width: 154px;
}

.inCart h3 {
	background: #4c9141;
	padding: 5px;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 1;
}

header {
	margin: 1rem auto;
	padding: 0 1rem;
	display: flex;
	align-items: flex-end;
	flex-wrap: wrap;
	justify-content: space-between;
	max-width: 1280px;
	background: white;
}

header img {
	width: 30px;
	height: 30px;
}

header a {
	color: black;
	text-decoration: none;
}

main {
	min-height: 100vh;
	border: 1px solid #bfbfbf;
	box-shadow: 0.2px 0.2px 0.2px #aaaaaa;
	padding-top: 1px;
	background: rgb(233, 233, 233);
}

ul {
	list-style: none;
	display: flex;

	flex-wrap: wrap;
	justify-content: center;
	max-width: 100%;
	margin: 0 auto;
}

li {
	border: 1px solid #bfbfbf;
	box-shadow: 0.2px 0.2px 0.2px #aaaaaa;
	background: white;
	margin: 1rem;
	height: 160px;
	width: 450px;
	cursor: pointer;
	display: grid;
	grid-template-columns: 1fr auto;
}

figure {
	position: relative;
	top: 0;
	left: 0;
	width: 158px;
	height: 158px;
	margin: auto;
	background-image: url('../../assets/icons/food.png');
	background-size: cover;
}

li div {
	padding: 1rem;
	align-items: flex-start;
	flex-direction: column;

	display: flex;
}

li:hover {
	border: 1px solid black;
}

li.inCart:hover {
	border: 4px solid #4c9141;
}

li:hover figure {
	width: 152px;
	height: 152px;
}

a:not(.empty) {
	font-weight: 900;
	color: #4c9141;
}
</style>
