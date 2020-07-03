<template>
	<div class="home">
		<vue-headful v-if="lang === 'en'" title="Search | Lastorder" description="Home page of hackamarket" />
		<vue-headful v-if="lang === 'es'" title="Búsqueda | Lastorder" description="Home page of hackamarket" />
		<vue-headful v-if="lang === 'gl'" title="Búsqueda | Lastorder" description="Home page of hackamarket" />

		<menucustom />

		<main>
			<!-- <UPPER TEXT (one tittle for language)> -->
			<h1 v-show="lang === 'en'">Search restaurants in your region</h1>

			<h1 v-show="lang === 'es'">Busca restaurantes en tu región</h1>

			<h1 v-show="lang === 'gl'">Busca restaurantes na túa rexión</h1>
			<!-- </UPPER TEXT> -->

			<!-- <SEARCH FORM> -->
			<form @keypress.enter="search()">
				<input type="text" v-model="searchQuery" placeholder="Search restaurant" v-show="lang === 'en'" />
				<input
					type="text"
					v-model="searchQuery"
					placeholder="Buscar restaurante"
					v-show="lang === 'es' || lang === 'gl'"
				/>
			</form>

			<div class="modeselector">
				<button @click="changeMode('name')" class="option" :class="{ selected: searchMode === 'name' }">
					<p v-show="lang === 'en'">Name</p>
					<p v-show="lang === 'es'">Nombre</p>
					<p v-show="lang === 'gl'">Nome</p>
				</button>

				<button @click="changeMode('city')" class="option" :class="{ selected: searchMode === 'city' }">
					<p v-show="lang === 'en'">City</p>
					<p v-show="lang === 'es'">Ciudad</p>
					<p v-show="lang === 'gl'">Cidade</p>
				</button>
			</div>
			<!-- </SEARCH FORM> -->

			<loadingspinner v-show="loading" />
			<div class="display" v-show="!loading">
				<nav v-show="searchResults.length">
					<mapsearch :lang="lang" :shops="searchResults" />
				</nav>
				<ul>
					<li v-for="shop in searchResults" :key="shop.id">
						<shopcard :shop="shop" :lang="lang" v-on:menu="displayMenu" />
					</li>
				</ul>
			</div>
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
import shopcard from '@/components/client/ShopCard.vue';
import mapsearch from '@/components/client/MapSearch.vue';
import loadingspinner from '@/components/LoadingSpinner.vue';

export default {
	name: 'Search',
	components: {
		menucustom,
		footercustom,
		shopcard,
		mapsearch,
		loadingspinner
	},
	data() {
		return {
			searchQuery: this.$route.query.q,
			searchResults: [],
			loading: false
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		},
		searchMode() {
			// Must be 'name' or 'city'
			return this.$route.query.m;
		}
	},
	methods: {
		async search() {
			try {
				if (this.$route.query.q !== this.searchQuery) {
					this.$router.replace({ query: { q: this.searchQuery, m: this.searchMode } });
				}

				this.searchResults = [];
				const url = process.env.VUE_APP_BACKEND_URL + '/shops';

				const results = await axios.get(url + `?${this.searchMode}=` + this.searchQuery);

				for (const shop of results.data.data) {
					const extraInfo = await axios.get(url + '/' + shop.id);

					this.searchResults.push(extraInfo.data.data);
				}
			} catch (error) {
				console.log(error.response);
			}
		},

		displayMenu(id) {
			console.log(id);
		},

		changeMode(mode) {
			this.$router.replace({ query: { q: this.searchQuery, m: mode } });
			this.search();
		}
	},

	async created() {
		if (this.searchQuery) {
			this.loading = true;
			await this.search();
			this.loading = false;
		}
	}
};
</script>

<style scoped>
.home {
	position: relative;
	min-height: 100vh;
	color: black;
}

main {
	padding-bottom: 80px;
}

input {
	font-size: 1rem;

	margin: 1rem 0 2rem;
	padding: 0 4rem;
	width: 40rem;
	height: 3rem;

	background: #c4c4c4 url('../../assets/icons/search.png') no-repeat 2%;
	background-size: 2.2rem;

	border: 0;
	border-radius: 1rem;
}

.display {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	background: rgb(233, 233, 233);
	min-height: 100vh;
	padding: 1rem;
}

.display nav {
	border: 1px solid #bfbfbf;
	background: white;
	box-shadow: 0.2px 0.2px 0.2px #aaaaaa;
	border-radius: 10px;
	width: 20rem;
	background: white;
}

ul {
	margin: 1rem;
	list-style: none;
}

li {
	padding-bottom: 1rem;
}

@media (max-width: 600px) {
	h1 {
		width: 90%;
		margin: 0 auto;
	}

	input {
		width: 80%;
	}

	ul {
		width: 100%;
	}

	.display {
		padding: 0;
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

/* <Side nav styles> */
.display > nav > div {
	margin: 1rem;
	border-bottom: 1px solid black;
}
/* </Side nav styles> */

/* <Mode selector styles> */
.modeselector {
	display: flex;
	justify-content: center;
	margin: 0 0 1rem;
}
button {
	cursor: pointer;
	font-size: 1rem;
	margin: 4rem auto;
	padding: 0 4rem;
	width: 20rem;
	height: 3rem;
	background: #6b6b6b;
	background: #699b61;
	font-weight: bolder;
	border: 0;
	border-radius: 1rem;
}

button:focus {
	outline: none;
}

.option {
	padding: 0 0.5rem;
	margin: 0 1rem;
	width: 136px;
	height: 50px;
	background: #dedede;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}

.option img {
	width: 43px;
	height: 42px;
}

.option.selected {
	border: 2px solid black;
	background: #c4c4c4;
}
/* </Mode selector styles> */
</style>
