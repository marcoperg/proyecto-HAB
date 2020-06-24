<template>
	<article :class="{onMap: onMap}">
		<figure
			v-if="shop.photos.length"
			:style="{'background-image': `url(${imgUrl + shop.photos[imgSelector].name})`}"
		>
			<button @click="leftImg()" class="left"></button>

			<div></div>
			<button @click="rightImg()" class="right"></button>

			<p v-show="shop.photos.length">{{imgSelector + 1}} / {{shop.photos.length }}</p>
		</figure>

		<figure v-if="!shop.photos.length"></figure>

		<main>
			<h1>{{shop.name}}</h1>

			<nav class="stars">
				<div>
					<span :class="{active: shop.average_rate >= 1}">★</span>
					<span :class="{active: shop.average_rate >= 2}">★</span>
					<span :class="{active: shop.average_rate >= 3}">★</span>
					<span :class="{active: shop.average_rate >= 4}">★</span>
					<span :class="{active: shop.average_rate >= 5}">★</span>
				</div>
				<p v-show="shop.average_rate !== null">{{round(shop.average_rate, 1)}}</p>

				<p v-show="shop.average_rate === null">---</p>
			</nav>

			<div class="text">
				<p class="description">{{shop.description}}</p>

				<p class="address">
					<span v-show="lang==='en'">Address:</span>
					<span v-show="lang==='es'">Dirección:</span>
					<span v-show="lang==='gl'">Dirección:</span>
					{{shop.line1}} {{shop.line2}} {{shop.city}} {{shop.state}} {{shop.country}}
				</p>

				<p class="comments" v-if="shop.rates.length">
					<img src="@/assets/quote.png" alt="Doble quotes" width="10px" height="10px" />
					"{{shop.rates[random(0, shop.rates.length-1)].comment}}"
				</p>

				<p class="comments" v-if="shop.rates.length">
					<img src="@/assets/quote.png" alt="Doble quotes" width="10px" height="10px" />
					"{{shop.rates[random(0, shop.rates.length-1)].comment}}"
				</p>

				<div class="comments" v-if="!shop.rates.length">
					<p v-show="lang==='en'">None comments</p>
					<p v-show="lang==='es'">No hay comentarios</p>
					<p v-show="lang==='gl'">Non hai comentarios</p>
				</div>

				<button @click="edit(index)">
					<p v-show="lang === 'en'">More info</p>
					<p v-show="lang === 'es'">Más info</p>
					<p v-show="lang === 'gl'">Máis info</p>
				</button>
			</div>
		</main>
	</article>
</template>

<script>
export default {
	name: 'ShopCard',
	props: {
		shop: Object,
		onMap: Boolean,
		lang: String
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
		menu() {
			this.$emit('menu', this.shop.id);
		},
		random(min, max) {
			return Math.floor(Math.random() * max) + min;
		},
		round(value, decimals) {
			if (value) {
				return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
			}
		}
	}
};
</script>

<style scoped>
article {
	display: flex;
	flex-wrap: wrap;
	width: 45rem;
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

/* <STAR RATES STYLES> */
nav.stars {
	display: flex;

	justify-content: flex-start;
	align-items: center;
}

nav.stars p {
	font-size: 1.2rem;
	margin-left: 5px;
}

.stars span {
	font-size: 1.5rem;
}

.stars .active {
	color: lightgreen;
}

nav p {
	font-size: 2rem;
}

button p {
	font-size: 1rem;
}

button {
	font-weight: bold;
	background: #717171;
	border: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
	height: 33px;
	width: 120px;

	cursor: pointer;
}

button:focus {
	outline: none;
}
/* </STAR RATES STYLES> */

@media (max-width: 600px) {
	article {
		width: 320px;
	}
}
</style>

<style scoped src="@/styles/gallery.css"></style>
