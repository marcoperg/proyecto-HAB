<template>
	<article :class="{ onMap: onMap }">
		<figure v-if="shop.photos.length" :style="{ 'background-image': `url(${imgUrl + shop.photos[imgSelector].name})` }">
			<button @click="leftImg()" class="left"></button>
			<button @click="rightImg()" class="right"></button>

			<router-link :to="{ name: 'ShopInfo', params: { lang: lang, id: shop.id } }"></router-link>

			<p v-show="shop.photos.length">{{ imgSelector + 1 }} / {{ shop.photos.length }}</p>
		</figure>

		<figure v-if="!shop.photos.length">
			<router-link :to="{ name: 'ShopInfo', params: { lang: lang, id: shop.id } }"></router-link>
		</figure>

		<main>
			<router-link :to="{ name: 'ShopInfo', params: { lang: lang, id: shop.id } }">
				<h1>{{ shop.name }}</h1>
			</router-link>

			<starrate :rate="shop.average_rate" />

			<div class="text">
				<p class="description">{{ shop.description }}</p>

				<p class="address">
					<img src="@/assets/icons/pin.png" alt />
					{{ shop.line1 }} {{ shop.line2 }} {{ shop.city }} {{ shop.state }} {{ shop.country }}
				</p>

				<p class="comments" v-if="shop.rates.length">
					<img src="@/assets/quote.png" alt="Doble quotes" width="10px" height="10px" />
					"{{ shop.rates[random(0, shop.rates.length - 1)].comment }}"
				</p>

				<p class="comments" v-if="shop.rates.length">
					<img src="@/assets/quote.png" alt="Doble quotes" width="10px" height="10px" />
					"{{ shop.rates[random(0, shop.rates.length - 1)].comment }}"
				</p>

				<div class="comments" v-if="!shop.rates.length">
					<p v-show="lang === 'en'">None comments</p>
					<p v-show="lang === 'es'">No hay comentarios</p>
					<p v-show="lang === 'gl'">Non hai comentarios</p>
				</div>
			</div>
		</main>
	</article>
</template>

<script>
import starrate from '@/components/StarRate.vue';

export default {
	name: 'ShopCard',
	props: {
		shop: Object,
		onMap: Boolean,
		lang: String
	},
	components: {
		starrate
	},
	data() {
		return {
			imgUrl: process.env.VUE_APP_BACKEND_URL + '/uploads/',
			imgSelector: 0
		};
	},
	methods: {
		leftImg() {
			if (this.shop.photos[this.imgSelector - 1]) {
				this.imgSelector--;
			} else if (this.imgSelector === 0) {
				this.imgSelector = this.shop.photos.length - 1;
			}
		},
		rightImg() {
			if (this.shop.photos[this.imgSelector + 1]) {
				this.imgSelector++;
			} else if (this.imgSelector === this.shop.photos.length - 1) {
				this.imgSelector = 0;
			}
		},

		random(min, max) {
			return Math.floor(Math.random() * max) + min;
		}
	}
};
</script>

<style scoped>
article {
	display: flex;
	flex-wrap: wrap;
	width: 55rem;
	padding: 1rem;

	border: 1px solid #bfbfbf;
	background: white;
	box-shadow: 0.2px 0.2px 0.2px #aaaaaa;
	border-radius: 10px;
}

figure {
	margin-right: 16px;
}

h1 {
	color: black;
	text-align: left;
	margin: 5px 0;
}

main {
	flex-grow: 1;
	display: flex;
	flex-wrap: wrap;

	flex-direction: column;
}

.text {
	width: 100%;
	flex-grow: 1;
}

p.description {
	font-size: 1.1rem;
	color: black;
	margin: 1rem 0;
}

p.address {
	text-align: start;
	padding-bottom: 1rem;
	border-bottom: 1px solid lightgrey;
}

p.address img {
	width: 1rem;
}

.comments img {
	position: relative;
	top: -5px;
	margin-right: 5px;
}

.comments {
	height: 20px;
	text-align: left;
}

.comments:last-of-type {
	border-bottom: 1px solid lightgrey;
	margin-bottom: 1rem;
}

@media (max-width: 600px) {
	article {
		width: 320px;
	}

	figure {
		margin: 0 auto;
	}
}
</style>
<style scoped src="@/styles/gallery.css"></style>
