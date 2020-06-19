<template>
	<div class="home">
		<menucustom />
		<main>
			<!-- <UPPER TEXT> -->
			<h1
				v-show="lang==='en'"
			>Discover the restaurants and cofee shops of your region and ask for your order from your phone.</h1>

			<h1
				v-show="lang==='es'"
			>Descubre los restaurantes y cafeterías de tu zona y realiza tu pedido desde tu móvil</h1>

			<h1
				v-show="lang==='gl'"
			>Descobre os restaurantes e cafeterías da túa zona e realiza o teu pedido dende o teu móbil</h1>
			<!-- </UPPER TEXT> -->

			<form @keypress.enter="sumbitSearch()">
				<input type="text" v-model="search" placeholder="Search restaurant" v-show="lang==='en'" />
				<input
					type="text"
					v-model="search"
					placeholder="Buscar restaurante"
					v-show="lang==='es' || lang==='gl'"
				/>
			</form>

			<h2 v-show="lang==='en'">Save your time</h2>
			<h2 v-show="lang==='es'">Ahorra tiempo</h2>
			<h2 v-show="lang==='gl'">Aforra tempo</h2>

			<ul>
				<li>
					<img src="../assets/time.png" alt="time" width="160px" />
					<p>Prepare your order before arriving for a quick visit</p>
				</li>
				<li>
					<img src="../assets/food1.jpg" alt="Food" width="160px" />
					<p>Eat in excelents restaurant even if you don't have the time to a long order</p>
				</li>
			</ul>

			<h2 class="organize" v-show="lang==='en'">Organize your establishment</h2>
			<h2 class="organize" v-show="lang==='es'">Organiza tu establecimiento</h2>
			<h2 class="organize" v-show="lang==='gl'">Organiza a teu establecemento</h2>

			<ul>
				<li>
					<img src="../assets/menu.png" alt="Menu" width="160px" />
					<p>Upload your menu to our platform and let every client consult it anywhere anytime</p>
				</li>
				<li>
					<img src="../assets/waiter.png" alt="Waiter" width="160px" />
					<p>Let your client call your waiters from the tables</p>
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
			search: ''
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		}
	},
	methods: {
		sumbitSearch() {
			console.log(this.search);
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
	margin: 2rem auto;
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