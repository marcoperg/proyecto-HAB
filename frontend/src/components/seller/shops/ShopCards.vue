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

			<div class="text">
				<h1>{{ shop.name }}</h1>

				<p>{{ shop.description }}</p>

				<p>{{ shop.line1 }} {{ shop.line2 }}, {{ shop.city }} {{ shop.state }}, {{ shop.country }}</p>
			</div>

			<nav>
				<button @click="remove(shop.id)" class="remove">
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
	background: #54805a;

	width: 500px;
	border-radius: 1.5rem;
	display: grid;
	grid-template-columns: auto 1fr;
}

li figure {
	width: 205px;
	height: 130px;
	background-color: #363636;
	align-self: center;
}

.text {
	width: 90%;
	margin: 0 auto;
}

h1,
p {
	margin: 1rem 0;
}

button p,
a p {
	color: white;
}

nav {
	grid-column: 1/3;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
}

button,
a {
	font-size: 13.3333px;
	font-weight: bold;
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

button.remove {
	background: #b45c5a;
}

button.remove p {
	color: black;
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

@media (max-width: 600px) {
	li {
		width: 90%;
		grid-template-columns: 1fr;
	}

	nav {
		grid-column: 1/2;
	}
}
</style>

<style scoped src="@/styles/gallery.css"></style>
