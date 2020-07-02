<template>
	<ul>
		<li v-for="(shop, index) in shops" :key="shop.id">
			<figure
				v-if="shop.photos.length"
				:style="{ 'background-image': `url(${imgUrl + shop.photos[imgSelector[index]].name})` }"
			>
				<button @click="leftImg(index)" class="left"></button>
				<button @click="rightImg(index)" class="right"></button>

				<button @click="addPhoto(shop.id)" class="addPhoto"></button>
				<p v-show="shop.photos.length">{{ imgSelector[index] + 1 }} / {{ shop.photos.length }}</p>
			</figure>

			<figure v-if="!shop.photos.length">
				<button @click="addPhoto(shop.id)" class="addPhoto"></button>
			</figure>

			<!-- <figure>
				<div v-for="photo in shop.photos" :key="photo.id">
					<img :src="imgUrl + photo.name" alt="Shop picture" />
				</div>
				<button @click="addPhoto(shop.id)" class="addPhoto"></button>
			</figure> -->

			<h1>{{ shop.name }}</h1>

			<p>{{ shop.description }}</p>

			<p>{{ shop.line1 }} {{ shop.line2 }}, {{ shop.city }} {{ shop.state }}, {{ shop.country }}</p>

			<nav>
				<button @click="remove(shop.id)">
					<p v-show="lang === 'en'">Remove</p>
					<p v-show="lang === 'es'">Eliminar</p>
					<p v-show="lang === 'gl'">Eliminar</p>
				</button>

				<button @click="edit(index)">
					<p v-show="lang === 'en'">Edit</p>
					<p v-show="lang === 'es'">Editar</p>
					<p v-show="lang === 'gl'">Editar</p>
				</button>

				<router-link :to="{ name: 'Notifications', params: { lang: lang, id: shop.id } }">
					<p v-show="lang === 'en'">Watch notifications</p>
					<p v-show="lang === 'es'">Ver notificaciones</p>
					<p v-show="lang === 'gl'">Ver notificaciones</p>
				</router-link>
			</nav>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'ShopCards',
	data() {
		return {
			imgUrl: process.env.VUE_APP_BACKEND_URL + '/uploads/',
			imgSelector: new Array(this.shops.length).fill(0)
		};
	},
	props: {
		shops: Array,
		lang: String
	},
	methods: {
		leftImg(i) {
			if (this.shops[i].photos[this.imgSelector[i] - 1]) {
				this.$set(this.imgSelector, i, this.imgSelector[i] - 1);
			} else if (this.imgSelector[i] === 0) {
				this.$set(this.imgSelector, i, this.shops[i].photos.length - 1);
			}
		},
		rightImg(i) {
			if (this.shops[i].photos[this.imgSelector[i] + 1]) {
				this.$set(this.imgSelector, i, this.imgSelector[i] + 1);
			} else if (this.imgSelector[i] === this.shops[i].photos.length - 1) {
				this.$set(this.imgSelector, i, 0);
			}
		},

		remove(id) {
			this.$emit('remove', id);
		},
		edit(index) {
			this.$emit('edit', index);
		},
		addPhoto(id) {
			this.$emit('addPhoto', id);
		}
	}
};
</script>

<style scoped>
ul {
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	color: black;

	align-items: center;
	justify-content: space-evenly;
}

li {
	padding: 1rem;
	margin: 1rem;
	/* background: #c4c4c4; */
	background: #54805a;

	min-height: 450px;
	width: 265px;
	border-radius: 1.5rem;
}

li figure {
	width: 205px;
	height: 130px;
	background-color: #363636;
	margin: 1rem auto;

	/* overflow-y: scroll;
	overflow-x: hidden;
	scrollbar-width: 1px; */
}

/* li figure div {
	width: 205px;
	height: 115px;
}

li figure div img {
	max-width: 100%;
	max-height: 100%;
} */

h1,
p {
	margin: 1rem 0;
}

button p,
a p {
	color: white;
}

nav {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
}

button,
a {
	font-size: 13.3333px;
	font-weight: bold;
	/* background: #717171; */
	background: #000000;

	border: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
	height: 33px;
	width: 80px;
	margin: 1rem;
	text-decoration: none;

	cursor: pointer;
}

button.addPhoto {
	width: 205px;
	height: 115px;
	background: url('../../../assets/icons/add.png');
	background-size: 40px 40px;
	background-repeat: no-repeat;
	background-position: 3px 1px;
}

a {
	width: 150px;
}
</style>

<style scoped src="@/styles/gallery.css"></style>
