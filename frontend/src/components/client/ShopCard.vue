<template>
	<article :class="{onMap: onMap}">
		<figure v-show="shop.photos.length">
			<button @click="leftImg()" class="left"></button>

			<div v-if="shop.photos[imgSelector]">
				<img :src="imgUrl + shop.photos[imgSelector].name" alt="Shop picture" />
			</div>
			<button @click="rightImg()" class="right"></button>
		</figure>
		<p v-show="shop.photos.length">{{imgSelector + 1}} / {{shop.photos.length }}</p>
		<h1>{{shop.name}}</h1>

		<p>{{shop.description}}</p>

		<p>{{shop.line1}} {{shop.line2}} {{shop.city}} {{shop.state}} {{shop.country}}</p>

		<nav>
			<div class="stars" v-show="shop.average_rate !== null">
				<span :class="{active: shop.average_rate >= 1}">★</span>
				<span :class="{active: shop.average_rate >= 2}">★</span>
				<span :class="{active: shop.average_rate >= 3}">★</span>
				<span :class="{active: shop.average_rate >= 4}">★</span>
				<span :class="{active: shop.average_rate >= 5}">★</span>
			</div>
			<p>{{shop.average_rate}}</p>

			<div v-show="shop.average_rate === null">
				<p></p>
			</div>
		</nav>
	</article>
</template>

<script>
export default {
	name: 'ShopCard',
	props: {
		shop: Object,
		onMap: false
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
		}
	}
};
</script>

<style scoped>
article.onMap {
	background: white;
}

article {
	padding: 1rem;
	margin: 1rem;
	background: #c4c4c4;
	max-height: 600px;
	width: 310px;
	border-radius: 1.5rem;
}

article figure {
	max-width: 300px;
	max-height: 200px;
	background: #363636;
	margin: 1rem auto;
	position: relative;
}

article figure div {
	max-width: 300px;
	max-height: 200px;
}

article figure div img {
	max-width: 300px;
	max-height: 200px;
}

h1,
p {
	color: black;
	margin: 1rem 0;
}

nav {
	display: flex;
	justify-content: center;
	align-items: center;
}

nav p {
	font-size: 1rem;
}

.stars span {
	font-size: 2rem;
}

.stars .active {
	color: yellow;
}

nav p {
	font-size: 2rem;
}

.left,
.right {
	border: 0;
	width: 40px;
	height: 40px;
	padding: 10px;
	background: rgba(255, 255, 255, 0.1);
	background-size: 30px 30px;
	background-repeat: no-repeat;
	background-position: center;
	position: absolute;
	top: calc(50% - 15px);
	cursor: pointer;
}

button:focus {
	outline: none;
}

.left {
	background-image: url('../../assets/icons/left.png');
	left: 0;
}

.right {
	background-image: url('../../assets/icons/right.png');
	right: 0;
}
</style>