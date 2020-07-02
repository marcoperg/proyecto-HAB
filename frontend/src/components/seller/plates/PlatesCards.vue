<template>
	<ul>
		<li v-for="(plate, index) in plates" :key="plate.id">
			<figure
				v-if="plate.photos.length"
				:style="{ 'background-image': `url(${imgUrl + plate.photos[imgSelector[index]].name})` }"
			>
				<button @click="leftImg(index)" class="left"></button>
				<button @click="rightImg(index)" class="right"></button>

				<button @click="addPhoto(plate.id)" class="addPhoto"></button>
				<p v-show="plate.photos.length">{{ imgSelector[index] + 1 }} / {{ plate.photos.length }}</p>
			</figure>

			<figure v-if="!plate.photos.length">
				<button @click="addPhoto(plate.id)" class="addPhoto"></button>
			</figure>

			<h1>{{ plate.name }}</h1>

			<p>{{ plate.description }}</p>

			<h2>{{ plate.prize }}€</h2>
			<br />
			<nav>
				<button @click="remove(plate.id)">
					<p v-show="lang === 'en'">Remove</p>
					<p v-show="lang === 'es'">Eliminar</p>
					<p v-show="lang === 'gl'">Eliminar</p>
				</button>

				<button @click="edit(plate)">
					<p v-show="lang === 'en'">Edit</p>
					<p v-show="lang === 'es'">Editar</p>
					<p v-show="lang === 'gl'">Editar</p>
				</button>

				<button @click="duplicate(plate)">
					<p v-show="lang === 'en'">Duplicate</p>
					<p v-show="lang === 'es'">Duplicar</p>
					<p v-show="lang === 'gl'">Duplicar</p>
				</button>
			</nav>
		</li>
	</ul>
</template>

<script>
import axios from 'axios';

export default {
	name: 'PlatesCards',
	data() {
		return {
			imgUrl: process.env.VUE_APP_BACKEND_URL + '/uploads/',
			imgSelector: [],
			plates: []
		};
	},
	props: {
		shopId: Number,
		shopIndex: Number,
		lang: String
	},
	methods: {
		async getPlates() {
			const response = await axios.get(process.env.VUE_APP_BACKEND_URL + '/menu/' + this.shopId);
			return response.data.data;
		},

		leftImg(i) {
			if (this.plates[i].photos[this.imgSelector[i] - 1]) {
				this.$set(this.imgSelector, i, this.imgSelector[i] - 1);
			} else if (this.imgSelector[i] === 0) {
				this.$set(this.imgSelector, i, this.plates[i].photos.length - 1);
			}
		},
		rightImg(i) {
			if (this.plates[i].photos[this.imgSelector[i] + 1]) {
				this.$set(this.imgSelector, i, this.imgSelector[i] + 1);
			} else if (this.imgSelector[i] === this.plates[i].photos.length - 1) {
				this.$set(this.imgSelector, i, 0);
			}
		},

		remove(id) {
			this.$emit('remove', id);
		},
		edit(data) {
			this.$emit('edit', data);
		},
		addPhoto(id) {
			this.$emit('addPhoto', id);
		},
		duplicate(data) {
			data.shopIndex = this.shopIndex;
			this.$emit('duplicate', data);
		}
	},
	async created() {
		this.plates = await this.getPlates();

		this.imgSelector = new Array(this.plates.length).fill(0);
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
	justify-content: flex-start;
}

li {
	padding: 1rem;
	margin: 0.5rem;
	/* background: #c4c4c4; */
	background: #54805a;
	min-height: 400px;
	width: 265px;
	border-radius: 1.5rem;
}

li figure {
	width: 205px;
	height: 115px;
	background-color: #363636;
	margin: 1rem auto;
}

h1,
p {
	margin: 1rem 0;
}

button p {
	color: white;
}

nav {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
}

button {
	margin: 5px;
	font-weight: bold;
	/* background: #717171;*/
	background: #000000;
	border: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
	height: 33px;
	width: 80px;

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

button:focus {
	outline: none;
}
</style>

<style scoped src="@/styles/gallery.css"></style>
