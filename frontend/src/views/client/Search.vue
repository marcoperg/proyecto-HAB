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

			<div class="display">
				<nav>
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

export default {
	name: 'Search',
	components: {
		menucustom,
		footercustom,
		shopcard,
		mapsearch
	},
	data() {
		return {
			searchQuery: this.$route.query.q,
			searchResults: []
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

					extraInfo.data.data.latitude -= Math.random() * 3;
					extraInfo.data.data.longitude += Math.random() * 3;

					this.searchResults.push(extraInfo.data.data);
				}

				console.log(this.searchResults);
			} catch (error) {
				console.log(error.response);
			}
		},

		displayMenu(id) {
			console.log(id);
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
</style>