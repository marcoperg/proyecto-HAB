<template>
	<div class="home">
		<vue-headful title="Home | Lastorder" description="Home page of hackamarket" />

		<menucustom />

		<div class="bigPic">
			<transition-group name="fade" tag="div">
				<div v-for="i in [imgSelector]" :key="i">
					<figure :style="{ 'background-image': `url(${bigImgUrl})` }" class="big">
						<button @click="leftImg()" class="left"></button>
						<button @click="rightImg()" class="right"></button>

						<p>{{ imgSelector + 1 }} / {{ foodImgLength }}</p>
					</figure>
				</div>
			</transition-group>
		</div>

		<header>
			<!-- <UPPER TEXT (one tittle for language)> -->
			<p
				v-show="lang === 'en'"
			>Discover the restaurants and coffee shops of your region and ask for your order from your phone.</p>

			<p
				v-show="lang === 'es'"
			>Descubre los restaurantes y cafeterías de tu zona y realiza tu pedido desde tu móvil</p>

			<p
				v-show="lang === 'gl'"
			>Descobre os restaurantes e cafeterías da túa zona e realiza o teu pedido dende o teu móbil</p>
			<!-- </UPPER TEXT> -->

			<!-- <SEARCH FORM> -->
			<form @keypress.enter="sumbitSearch()" :class="{ focus: searchFocus }">
				<input
					type="text"
					@focus="searchFocus = true"
					v-model="search"
					placeholder="Search restaurant"
					v-if="lang === 'en'"
				/>
				<input
					type="text"
					@focus="searchFocus = true"
					v-model="search"
					placeholder="Buscar restaurante"
					v-if="lang === 'es' || lang === 'gl'"
				/>
				<div class="searchRecomendations" v-show="searchFocus">
					<button @click="nearMe()">
						<img src="@/assets/icons/pin.png" alt="Pin location" />
						<p v-show="lang === 'en'">Near me</p>
						<p v-show="lang === 'es'">Cerca de mí</p>
						<p v-show="lang === 'gl'">Cerca de min</p>
					</button>
				</div>
			</form>

			<div class="background" @click="searchFocus = false" v-show="searchFocus"></div>
			<!-- </SEARCH FORM> -->
		</header>
		<main>
			<h1 v-show="lang === 'en'">Advantages of our platform</h1>
			<h1 v-show="lang === 'es'">Ventajas de nuestra plataforma</h1>
			<h1 v-show="lang === 'gl'">Vantaxes da nosa plataforma</h1>

			<h2 v-show="lang === 'en'">For clientes</h2>
			<h2 v-show="lang === 'es'">Para clientes</h2>
			<h2 v-show="lang === 'gl'">Para clientes</h2>

			<ul>
				<li>
					<img src="../assets/time.png" alt="time" width="160px" />
					<p v-show="lang === 'en'">Prepare your order before arriving for a quick visit</p>
					<p v-show="lang === 'es'">Prepara tu orden antes de llegar para una visita rápida</p>
					<p v-show="lang === 'gl'">Prepara a túa orde antes de chegar para unha visita rápida</p>
				</li>

				<li>
					<img src="../assets/food/food0.jpeg" alt="Food" width="160px" />
					<p
						v-show="lang === 'en'"
					>Eat in excellent restaurant even if you don't have the time to a long order</p>
					<p
						v-show="lang === 'es'"
					>Come en restaurantes de calidad incluso si no tienes tiempo para un pedido largo</p>
					<p
						v-show="lang === 'gl'"
					>Come en restaurantes de calidade incluso si non tes tempo para un pedido longo</p>
				</li>

				<li>
					<img src="../assets/table.png" alt="time" width="160px" />
					<p v-show="lang === 'en'">Call a waiter without moving from the table</p>
					<p v-show="lang === 'es'">Llama a un camarero sin levantarte de la mesa</p>
					<p v-show="lang === 'gl'">Chama a un camareiro sin levantarte da mesa</p>
				</li>
			</ul>

			<h2 class="organize" v-show="lang === 'en'">If you own a restaurant</h2>
			<h2 class="organize" v-show="lang === 'es'">Si eres dueño de un restaurante</h2>
			<h2 class="organize" v-show="lang === 'gl'">Si eres dono dun restaurante</h2>

			<ul>
				<li>
					<img src="../assets/menu.png" alt="Menu" width="160px" />
					<p
						v-show="lang === 'en'"
					>Upload your menu to our platform and let every client consult it anywhere anytime</p>
					<p
						v-show="lang === 'es'"
					>Sube tu menú a nuestra plataforma y permite a tus clientes consultarlo en cualquier momento</p>
					<p
						v-show="lang === 'gl'"
					>Sube o teu menú á nosa plataforma e permite aos teus clientes consultalo en calquera momento</p>
				</li>

				<li>
					<img src="../assets/waiter.png" alt="Waiter" width="160px" />
					<p v-show="lang === 'en'">Let your client call your waiters from the tables</p>
					<p v-show="lang === 'es'">Permite a tus clientes llamar a tus camareros desde sus mesas</p>
					<p
						v-show="lang === 'gl'"
					>Permite aos teus clientes chamar aos teus camareiros dende as súas mesas</p>
				</li>

				<li>
					<img src="../assets/shop.png" alt="Waiter" width="160px" />
					<p v-show="lang === 'en'">Organize all your restaurants in one place</p>
					<p v-show="lang === 'es'">Organiza todos tus restaurantes desde un solo sitio</p>
					<p v-show="lang === 'gl'">Organiza todos os teus restaurantes dende en único sitio</p>
				</li>
			</ul>
		</main>
		<!-- <footercustom /> -->
	</div>
</template>

<script>
// Import modules
import axios from 'axios';

// Components
import menucustom from '@/components/MenuCustom.vue';
import footercustom from '@/components/FooterCustom.vue';

export default {
	name: 'Home',
	components: {
		menucustom,
		footercustom
	},
	data() {
		return {
			search: '',
			searchFocus: false,
			imgSelector: 0,
			foodImgLength: 6
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		},

		bigImgUrl() {
			return require(`../assets/food/food${this.imgSelector}.jpeg`);
		}
	},
	methods: {
		sumbitSearch() {
			this.$router.push({ name: 'Search', query: { q: this.search, m: 'name' } });
		},

		async nearMe() {
			let geo = null;

			navigator.geolocation.getCurrentPosition(async (location) => {
				geo = location.coords;
				const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geo.latitude},${geo.longitude}&sensor=true&key=${process.env.VUE_APP_GOOGLE_API_KEY}`;

				const city = (await axios.get(url)).data.results[4].formatted_address.split(',')[0];

				this.$router.push({
					name: 'Search',
					query: {
						q: city,
						m: 'city'
					}
				});
			});
		},

		leftImg() {
			if (this.imgSelector > 0) {
				this.imgSelector--;
			} else if (this.imgSelector === 0) {
				this.imgSelector = this.foodImgLength - 1;
			}
		},
		rightImg() {
			if (this.imgSelector < this.foodImgLength - 1) {
				this.imgSelector++;
			} else if (this.imgSelector === this.foodImgLength - 1) {
				this.imgSelector = 0;
			}
		}
	},
	created() {
		setInterval(() => {
			this.rightImg();
		}, 10000);
	}
};
</script>

<style scoped src="@/styles/landing.css"></style>
<style scoped src="@/styles/gallery.css"></style>
