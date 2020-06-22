<template>
	<div class="home">
		<menucustom />
		<main>
			<!-- <UPPER TEXT (one tittle for language)> -->
			<h1 v-show="lang==='en'">Search restaurants in your region</h1>

			<h1 v-show="lang==='es'">Busca restaurantes en tu región</h1>

			<h1 v-show="lang==='gl'">Busca restaurantes na túa rexión</h1>
			<!-- </UPPER TEXT> -->

			<!-- <SEARCH FORM> -->
			<form @keypress.enter="search()">
				<input type="text" v-model="searchQuery" placeholder="Search restaurant" v-show="lang==='en'" />
				<input
					type="text"
					v-model="searchQuery"
					placeholder="Buscar restaurante"
					v-show="lang==='es' || lang==='gl'"
				/>
			</form>
			<!-- </SEARCH FORM> -->

			<ul>
				<li v-for="shop in searchResults" :key="shop.id">
					<figure>
						<div v-for="photo in shop.photos" :key="photo.id">
							<img :src="imgUrl + photo.name" alt="Shop picture" />
						</div>
					</figure>

					<h1>{{shop.name}}</h1>

					<p>{{shop.description}}</p>

					<p>{{shop.line1}} {{shop.line2}}, {{shop.city}} {{shop.state}}, {{shop.country}}</p>

					<nav></nav>
				</li>
			</ul>
		</main>
		<footercustom />
	</div>
</template>

<script>
// Get auth functions
import { getHeader, getUserInfo, clean, removeUnchanged } from '@/auth';

// Import modules
import axios from 'axios';
import Swal from 'sweetalert2';

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
			searchQuery: this.$route.query.q,
			searchResults: [],
			imgUrl: process.env.VUE_APP_BACKEND_URL + '/uploads/'
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		}
	},
	methods: {
		async search() {
			try {
				if (this.$route.query.q !== this.searchQuery) {
					this.$router.replace({ query: { q: this.searchQuery } });
				}

				this.searchResults = [];
				const url = process.env.VUE_APP_BACKEND_URL + '/shops';

				const results = await axios.get(url + '?name=' + this.searchQuery);

				for (const shop of results.data.data) {
					const extraInfo = await axios.get(url + '/' + shop.id);
					this.searchResults.push(extraInfo.data.data);
				}
			} catch (error) {
				console.log(error.response);
			}
		}
	},
	async created() {
		if (this.searchQuery) {
			this.search();
		}
	}
};
</script>


<style scoped>
.home {
	position: relative;
	min-height: 100vh;
}

main {
	padding-bottom: 80px;
}

input {
	font-size: 1rem;

	padding: 0 4rem;
	width: 40rem;
	height: 3rem;

	background: #c4c4c4 url('../../assets/icons/search.png') no-repeat 2%;
	background-size: 2.2rem;

	border: 0;
	border-radius: 1rem;
}

/* <Title with middle lines styles> */
h2 {
	color: black;
	margin: 3rem auto 0;
	overflow: hidden;
	text-align: center;
	width: 50rem;
}

h2:before,
h2:after {
	background-color: #000;
	content: '';
	display: inline-block;
	height: 1px;
	position: relative;
	vertical-align: middle;
	width: 50%;

	z-index: -1;
}

h2:before {
	right: 0.5em;
	margin-left: -50%;
}

h2:after {
	left: 0.5em;
	margin-right: -50%;
}
/* </Title with middle lines styles> */

@media (max-width: 600px) {
	h1 {
		width: 90%;
	}

	input {
		width: 80%;
	}

	ul {
		width: 90%;
	}

	h2 {
		width: 90%;
		padding: 1rem;
	}

	h2.organize::after {
		vertical-align: text-top;
	}

	h2.organize::before {
		vertical-align: sub;
	}
}
ul {
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	align-items: center;
	justify-content: space-evenly;
}

li {
	padding: 1rem;
	margin: 1rem;
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
</style>