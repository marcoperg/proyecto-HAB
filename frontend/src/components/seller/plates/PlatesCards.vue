<template>
	<ul>
		<li v-for="(plate, index) in plates" :key="plate.id">
			<figure>
				<div v-for="photo in plate.photos" :key="photo.id">
					<img :src="imgUrl + photo.name" alt="Plate picture" />
				</div>
				<button @click="addPhoto(plate.id)" class="addPhoto"></button>
			</figure>

			<h1>{{plate.name}}</h1>

			<p>{{plate.description}}</p>

			<h2>{{plate.prize}}€</h2>
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
			console.log(response.data.data);
			return response.data.data;
		},
		remove(id) {
			this.$emit('remove', id);
		},
		edit(data) {
			this.$emit('edit', data);
		},
		addPhoto(id) {
			this.$emit('addPhoto', id);
		}
	},
	async created() {
		this.plates = await this.getPlates();
	}
};
</script>

<style scoped>
ul {
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	align-items: center;
	justify-content: flex-start;
}

li {
	padding: 1rem;
	margin: 0.5rem;
	background: #c4c4c4;
	height: 375px;
	width: 265px;
	border-radius: 1.5rem;
}

li figure {
	width: 205px;
	height: 115px;
	background: #363636;
	margin: 1rem auto;

	overflow-y: scroll;
	overflow-x: hidden;
	scrollbar-width: 1px;
}

li figure div {
	width: 205px;
	height: 115px;
}

li figure div img {
	max-width: 100%;
	max-height: 100%;
}

h1,
p {
	color: black;
	margin: 1rem 0;
}

nav {
	display: flex;
	justify-content: space-around;
	align-items: center;
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
	width: 80px;

	cursor: pointer;
}

button.addPhoto {
	width: 205px;
	height: 115px;
	background: url('../../../assets/icons/add.png');
	background-size: 50px 50px;
	background-repeat: no-repeat;
	background-position: center;
}
</style>