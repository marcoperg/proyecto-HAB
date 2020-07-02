<template>
	<div class="home">
		<vue-headful title="Home | Lastorder" description="Home page of hackamarket" />

		<menucustom />
		<header>
			<!-- <UPPER TEXT (one tittle for language)> -->
			<h1 v-show="lang === 'en'">
				Discover the restaurants and coffee shops of your region and ask for your order from your phone.
			</h1>

			<h1 v-show="lang === 'es'">
				Descubre los restaurantes y cafeterías de tu zona y realiza tu pedido desde tu móvil
			</h1>

			<h1 v-show="lang === 'gl'">
				Descobre os restaurantes e cafeterías da túa zona e realiza o teu pedido dende o teu móbil
			</h1>
			<!-- </UPPER TEXT> -->

			<!-- <SEARCH FORM> -->
			<form @keypress.enter="sumbitSearch()" :class="{ focus: searchFocus }">
				<input
					type="text"
					@focus="searchFocus = true"
					v-model="search"
					placeholder="Search restaurant"
					v-if="lang === 'en'"
				/>
				<input
					type="text"
					@focus="searchFocus = true"
					v-model="search"
					placeholder="Buscar restaurante"
					v-if="lang === 'es' || lang === 'gl'"
				/>
				<div class="searchRecomendations" v-show="searchFocus"></div>
			</form>

			<div class="background" @click="searchFocus = false" v-show="searchFocus"></div>
			<!-- </SEARCH FORM> -->
		</header>
		<main>
			<h2 v-show="lang === 'en'">Save your time</h2>
			<h2 v-show="lang === 'es'">Ahorra tiempo</h2>
			<h2 v-show="lang === 'gl'">Aforra tempo</h2>

			<ul>
				<li>
					<img src="../assets/time.png" alt="time" width="160px" />
					<p v-show="lang === 'en'">Prepare your order before arriving for a quick visit</p>
					<p v-show="lang === 'es'">Prepara tu orden antes de llegar para una visita rápida</p>
					<p v-show="lang === 'gl'">Prepara a túa orde antes de chegar para unha visita rápida</p>
				</li>

				<li>
					<img src="../assets/food1.jpg" alt="Food" width="160px" />
					<p v-show="lang === 'en'">Eat in excellent restaurant even if you don't have the time to a long order</p>
					<p v-show="lang === 'es'">Come en restaurantes de calidad incluso si no tienes tiempo para un pedido largo</p>
					<p v-show="lang === 'gl'">Come en restaurantes de calidade incluso si non tes tempo para un pedido longo</p>
				</li>
			</ul>

			<h2 class="organize" v-show="lang === 'en'">Organize your establishment</h2>
			<h2 class="organize" v-show="lang === 'es'">Organiza tu establecimiento</h2>
			<h2 class="organize" v-show="lang === 'gl'">Organiza a teu establecemento</h2>

			<ul>
				<li>
					<img src="../assets/menu.png" alt="Menu" width="160px" />
					<p v-show="lang === 'en'">
						Upload your menu to our platform and let every client consult it anywhere anytime
					</p>
					<p v-show="lang === 'es'">
						Sube tu menú a nuestra plataforma y permite a tus clientes consultarlo en cualquier momento
					</p>
					<p v-show="lang === 'gl'">
						Sube o teu menú á nosa plataforma e permite aos teus clientes consultalo en calquera momento
					</p>
				</li>

				<li>
					<img src="../assets/waiter.png" alt="Waiter" width="160px" />
					<p v-show="lang === 'en'">Let your client call your waiters from the tables</p>
					<p v-show="lang === 'es'">Permite a tus clientes llamar a tus camareros desde sus mesas</p>
					<p v-show="lang === 'gl'">Permite aos teus clientes chamar aos teus camareiros dende as súas mesas</p>
				</li>
			</ul>
		</main>
		<footercustom />
	</div>
</template>

<script>
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
			search: '',
			searchFocus: false
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		}
	},
	methods: {
		sumbitSearch() {
			this.$router.push({ name: 'Search', query: { q: this.search } });
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

h1 {
	color: black;
	font-size: 20px;
	width: 35rem;
	margin: 0 auto;
}

header {
	padding: 9rem 0;
	height: 30rem;
	background: #699b61;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

/* <SEARCH FORM STYLES> */
.background {
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	height: 100vh;
	z-index: 15;
	background: rgba(0, 0, 0, 0.7);
}

input {
	font-size: 1rem;

	padding: 0 4rem;
	width: 40rem;
	height: 3rem;

	background: #c4c4c4 url('../assets/icons/search.png') no-repeat 2%;
	background-size: 2.2rem;

	border: 0;
	border-radius: 1rem;
}

form.focus input {
	border-radius: 1rem 1rem 0 0;
	background-color: white;
}

form {
	margin: 0 auto;
	width: 40rem;

	position: relative;
}

form.focus {
	z-index: 20;
}

input:focus {
	outline: none;
}

.searchRecomendations {
	border-radius: 0 0 1rem 1rem;

	position: absolute;
	background: white;
	height: 10rem;
	width: 40rem;
}
/* </SEARCH FORM STYLES> */

/* <Cards styles> */
ul {
	list-style: none;
	width: 50rem;
	margin: 2rem auto;

	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
}

li {
	color: black;
	margin: 1rem 0;
	width: 200px;
	background: #c4c4c4;
	border-radius: 1rem;
	padding: 1rem;
}

li img {
	border-radius: 1rem;
	margin-bottom: 1rem;
}

/* </Cards styles> */

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
</style>
