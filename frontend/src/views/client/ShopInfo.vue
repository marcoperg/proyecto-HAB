<template>
	<div class="shopInfo">
		<menucustom />
		<header>
			<div class="titleAndReviews">
				<h1>{{shop.name}}</h1>
				<div class="reviews">
					<starrate :rate="shop.average_rate" />
					<p>
						{{numberOfReviews}}
						<span v-show="lang==='en'">reviews</span>
						<span v-show="lang==='es'">opiniones</span>
						<span v-show="lang==='gl'">opinións</span>
					</p>
				</div>
			</div>

			<p class="address info">
				<a :href="`http://maps.google.com/maps?q=${shop.latitude},${shop.longitude}`" target="_blank">
					<img src="@/assets/icons/pin.png" alt="map ping" />
					{{shop.line1}} {{shop.line2}} {{shop.city}} {{shop.state}} {{shop.country}}
				</a>
			</p>

			<p class="phone info">
				<img src="@/assets/icons/phone.png" alt="phone" />
				<a :href="'tel:' + shop.tlf">{{shop.tlf}}</a>
			</p>

			<p class="email info">
				<img src="@/assets/icons/email.png" alt="phone" />
				<a :href="'mailto:' + shop.email">{{shop.email}}</a>
			</p>
		</header>
		<main>
			<lightbox :imgs="imgsArray" :visible="visible" :index="index" @hide="visible = false"></lightbox>
			<ul class="images">
				<li class="image" v-for="(photo, index) in shop.photos" :key="photo.id">
					<figure
						@click="displayPhoto(index)"
						:style="{'background-image': `url(${imgUrl + photo.name})`}"
					></figure>
				</li>
			</ul>

			<div class="infoPanel">
				<div>
					<article class="contact">
						<h2 v-show="lang==='en'">Contact</h2>
						<h2 v-show="lang==='es'">Contacto</h2>
						<h2 v-show="lang==='gl'">Contacto</h2>

						<p class="phone contact">
							<a :href="'tel:' + shop.tlf">
								<img src="@/assets/icons/phone.png" alt="phone" />
								<span>{{shop.tlf}}</span>
							</a>
						</p>

						<p class="email contact">
							<a :href="'mailto:' + shop.email">
								<img src="@/assets/icons/email.png" alt="phone" />
								<span>{{shop.email}}</span>
							</a>
						</p>
					</article>

					<router-link class="menu" :to="{name: 'Menu', params: {lang: lang, id: shop.id}}">
						<article class="menu">
							<h2 v-show="lang==='en'">Menu</h2>
							<h2 v-show="lang==='es'">Menú</h2>
							<h2 v-show="lang==='gl'">Menú</h2>

							<ul>
								<li v-for="plate in menu" :key="plate.id">
									<p>{{plate.name}}</p>
									<p>{{plate.prize}}€</p>
								</li>
							</ul>
						</article>
					</router-link>
				</div>

				<article class="location">
					<h2 v-show="lang==='en'">Location</h2>
					<h2 v-show="lang==='es'">Ubicación</h2>
					<h2 v-show="lang==='gl'">Ubicación</h2>

					<gmaps-map class="map" :options="mapOptions">
						<gmaps-marker :visible="visibleMarker" :position="markerPosition" :label="shop.name" />
					</gmaps-map>

					<p class="address location">
						<a :href="`http://maps.google.com/maps?q=${shop.latitude},${shop.longitude}`" target="_blank">
							<img src="@/assets/icons/pin.png" alt="map ping" />
							{{shop.line1}} {{shop.line2}} {{shop.city}} {{shop.state}} {{shop.country}}
						</a>
					</p>

					<p v-if="geo" class="distance">
						<img src="@/assets/icons/distance.png" alt="map ping" />

						<span v-show="lang==='es'">A</span>
						<span v-show="lang==='gl'">A</span>
						{{distance(geo.latitude, geo.longitude, shop.latitude, shop.longitude)}}km
						<span
							v-show="lang==='en'"
						>from you</span>
						<span v-show="lang==='es'">de ti</span>
						<span v-show="lang==='gl'">de ti</span>
					</p>
				</article>

				<div>
					<article>
						<h2 v-show="lang==='en'">Reviews</h2>
						<h2 v-show="lang==='es'">Opiniones</h2>
						<h2 v-show="lang==='gl'">Opinións</h2>

						<div class="reviews">
							<starrate :rate="shop.average_rate" />
							<p>
								{{numberOfReviews}}
								<span v-show="lang==='en'">reviews</span>
								<span v-show="lang==='es'">opiniones</span>
								<span v-show="lang==='gl'">opinións</span>
							</p>
						</div>
					</article>

					<article class="order">
						<h2 v-show="lang==='en'">Make an order</h2>
						<h2 v-show="lang==='es'">Realizar un pedido</h2>
						<h2 v-show="lang==='gl'">Realizar un pedido</h2>

						<router-link :to="{name: 'Menu', params: {lang: lang, id: shop.id}}">
							<span v-show="lang==='en'">Make an order</span>
							<span v-show="lang==='es'">Realizar un pedido</span>
							<span v-show="lang==='gl'">Realizar un pedido</span>
						</router-link>
					</article>
				</div>
			</div>
			<shopreviews
				:numberOfReviews="numberOfReviews"
				:reviews="shop.rates"
				@write="newReview=true"
				:lang="lang"
			/>
			<transition name="fade">
				<newreview v-show="newReview" :id="shop.id" @cancel="newReview=false" :lang="lang" />
			</transition>
		</main>
		<footercustom />
	</div>
</template>

<script>
// Import modules
import axios from 'axios';
import Swal from 'sweetalert2';

// Components
import menucustom from '@/components/MenuCustom.vue';
import footercustom from '@/components/FooterCustom.vue';
import shopreviews from '@/components/client/ShopReviews.vue';
import newreview from '@/components/client/NewReview.vue';
import lightbox from 'vue-easy-lightbox';
import starrate from '@/components/StarRate.vue';
import { gmapsMap, gmapsMarker } from 'x5-gmaps';

export default {
	name: 'ShopInfo',
	components: {
		menucustom,
		footercustom,
		shopreviews,
		newreview,
		lightbox,
		gmapsMap,
		gmapsMarker,
		starrate
	},
	data() {
		return {
			shop: {},
			menu: [],

			visibleMarker: false,

			newReview: false,
			index: 0,
			imgsArray: [],
			visible: false,
			imgUrl: process.env.VUE_APP_BACKEND_URL + '/uploads/',
			mapOptions: {
				center: { lat: 0, lng: 0 },
				zoom: 13
			},
			markerPosition: { lat: 0, lng: 0 },

			geo: null
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		},
		id() {
			return this.$route.params.id;
		},
		numberOfReviews() {
			if (this.shop.rates) {
				return this.shop.rates.length;
			} else {
				return 0;
			}
		}
	},
	methods: {
		// Get info of the shop for display
		async getShopInfo() {
			const url = process.env.VUE_APP_BACKEND_URL + '/shops';

			const data = await axios.get(url + '/' + this.id);
			return data.data.data;
		},

		// Get the menu of the shop
		async getMenuFromShop() {
			const url = process.env.VUE_APP_BACKEND_URL + '/menu/' + this.shop.id;
			const menu = await axios.get(url);

			return menu.data.data;
		},

		// AUXILIARY FUNCTIONS
		// Format photos array for lightbox
		formatMedia() {
			const result = [];

			for (const photo of this.shop.photos) {
				result.push(this.imgUrl + photo.name);
			}

			return result;
		},

		// Display photo of the index `index`
		displayPhoto(index) {
			this.index = index;
			this.visible = true;
		},

		distance(lat1, lon1, lat2, lon2) {
			let p = 0.017453292519943295; // Math.PI / 180
			let c = Math.cos;
			let a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

			return Math.round(12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
		}
	},
	async created() {
		navigator.geolocation.getCurrentPosition((location) => {
			this.geo = location.coords;
		});

		this.shop = await this.getShopInfo();
		this.imgsArray = this.formatMedia();
		this.menu = await this.getMenuFromShop();

		this.mapOptions.center.lat = this.shop.latitude;
		this.mapOptions.center.lng = this.shop.longitude;
		this.markerPosition.lat = this.shop.latitude;
		this.markerPosition.lng = this.shop.longitude;

		this.visibleMarker = true;

		console.log(this.shop);
		console.log(this.geo);
	}
};
</script>

<style scoped src="@/styles/shopScreen.css"></style>