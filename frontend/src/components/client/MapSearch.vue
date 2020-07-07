<template>
	<div>
		<nav @click="completeView = true">
			<img src="@/assets/map.png" alt />

			<button class="submit">
				<span v-show="lang === 'en'">See map</span>
				<span v-show="lang === 'es'">Ver mapa</span>
				<span v-show="lang === 'gl'">Ver mapa</span>
			</button>
		</nav>

		<div class="background" v-show="completeView" @click="completeView = false"></div>
		<button v-show="completeView" class="close" @click="completeView = false"></button>
		<gmaps-map v-show="completeView" id="map" :options="mapOptions">
			<gmaps-marker
				v-for="shop in shops"
				:key="shop.id"
				:visible="true"
				:position="{ lat: shop.latitude, lng: shop.longitude }"
				:label="shop.name"
				@click="toShop(shop.id)"
			/>

			<gmaps-marker :visible="true" :position="{ lat: mapOptions.center.lat, lng: mapOptions.center.lng }" />
		</gmaps-map>
	</div>
</template>

<script>
import { gmapsMap, gmapsMarker } from 'x5-gmaps';

export default {
	name: 'MapSearch',
	props: {
		lang: String,
		shops: Array
	},
	components: {
		gmapsMap,
		gmapsMarker
	},
	data() {
		return {
			completeView: false,
			mapOptions: { center: { lat: 43, lng: -8 }, zoom: 14 }
		};
	},
	methods: {
		toShop(id) {
			console.log(id);
			this.$router.push({ name: 'ShopInfo', params: { id: 1 } });
		}
	},
	created() {
		navigator.geolocation.getCurrentPosition((position) => {
			this.$set(this.mapOptions.center, 'lat', position.coords.latitude);
			this.$set(this.mapOptions.center, 'lng', position.coords.longitude);
		});
	}
};
</script>

<style scoped>
nav {
	margin: 2rem auto;
	width: 100%;
	height: 160px;
	cursor: pointer;

	position: relative;
}

nav img {
	width: 100%;
	height: 160px;
}

button {
	width: 8rem;
	height: 2rem;
	background: black;
	color: white;
	font-weight: bolder;
	border: 0;
	border-radius: 0.4em;

	position: absolute;
	top: calc(50% - 1rem);
	left: calc(50% - 4rem);

	cursor: pointer;
}

button:hover {
	background: rgb(51, 51, 51);
}

#map {
	position: fixed;
	width: 97%;
	height: 97vh;
	top: 1.5%;
	left: 1.5%;

	z-index: 10;
}

.background {
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	height: 100vh;
	z-index: 9;
	background: rgba(0, 0, 0, 0.7);
}

button.close {
	display: block;
	background-color: white;
	width: 3.6rem;
	height: 3.6rem;
	background-image: url('../../assets/icons/close.png');
	background-position: center;
	background-repeat: no-repeat;
	background-size: 2rem 2rem;

	position: fixed;
	top: calc(1.5vh - 0.4rem);
	left: calc(98.5% - 3.3rem);
	z-index: 11;
}
</style>
