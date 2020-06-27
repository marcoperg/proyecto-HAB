<template>
	<div id="nav">
		<header>
			<!-- Botton for toogle menu (only available on mobile) -->
			<button v-show="isMobile()" @click="menu = !menu; search=false" class="openmenu"></button>
			<router-link
				:to="{ name: 'Home', params: { lang: lang } }"
				class="logo"
				v-show="!isMobile() || !search"
			>
				<img src="@/assets/logo/side_by_side_transparent.png" alt="Logo" />
			</router-link>

			<div :class="{active: search}">
				<button @click="search = !search" v-show="!search" class="search"></button>

				<form @keypress.enter="sumbitSearch()">
					<input type="text" v-show="search" v-model="searchQuery" />
				</form>

				<button v-show="search" @click="search = !search" class="closemenu"></button>
			</div>
		</header>

		<transition name="slide-fade">
			<div class="menu" v-show="menu">
				<button v-show="isMobile()" @click="menu = !menu" class="closemenu"></button>

				<!-- <Languge selector> -->
				<div class="langSelector">
					<div class="langtext" v-show="isMobile()">
						<p v-show="lang === 'en'">Change language:</p>
						<p v-show="lang === 'es' || lang === 'gl'">Cambiar idioma:</p>
					</div>

					<div class="lang" @mouseover="languageHover = true" @mouseleave="languageHover = false">
						<router-link :to="{ params: { lang: lang } }" :class="lang"></router-link>

						<transition name="fade">
							<ul v-if="languageHover" @click="languageHover = false">
								<li v-show="lang !== 'en'">
									<router-link :to="{ params: { lang: 'en' } }" class="en"></router-link>
								</li>

								<li v-show="lang !== 'es'">
									<router-link :to="{ params: { lang: 'es' } }" class="es"></router-link>
								</li>

								<li v-show="lang !== 'gl'">
									<router-link :to="{ params: { lang: 'gl' } }" class="gl"></router-link>
								</li>
							</ul>
						</transition>
					</div>
				</div>
				<!-- </Languge selector> -->

				<!-- <User options> -->
				<router-link
					v-show="!userData.logged"
					class="login"
					:to="{ name: 'Login', params: { lang: lang } }"
				>
					<p v-show="lang === 'en'">Log in</p>
					<p v-show="lang === 'es' || lang === 'gl'">Iniciar Sesión</p>
				</router-link>

				<router-link
					v-show="userData.logged"
					class="login"
					:to="{ name: 'Cart', params: { lang: lang } }"
				>
					<p v-show="lang === 'en'">Cart</p>
					<p v-show="lang === 'es' || lang === 'gl'">Carrito</p>
				</router-link>

				<div class="background" v-show="userMenu || search" @click="userMenu=false; search=false"></div>

				<div class="useroptions" v-show="userData.logged">
					<h1 @click="userMenu = !userMenu" v-show="!isMobile()"></h1>

					<transition name="fade">
						<ul v-show="userMenu  ||isMobile() ">
							<li class="linkButton">
								<router-link :to="{name: 'Profile'}">
									<p v-show="lang === 'en'">Profile</p>
									<p v-show="lang === 'es'">Perfil</p>
									<p v-show="lang === 'gl'">Pechar sesión</p>
								</router-link>
							</li>

							<li class="linkButton" v-show="userData.role === 'seller'">
								<router-link :to="{name: 'SellerShops'}">
									<p v-show="lang === 'en'">My restaurants</p>
									<p v-show="lang === 'es'">Mis Restaurantes</p>
									<p v-show="lang === 'gl'">Os meus restaurantes</p>
								</router-link>
							</li>

							<li class="linkButton" v-show="userData.role === 'seller'">
								<router-link :to="{name: 'SellerPlates'}">
									<p v-show="lang === 'en'">My menus</p>
									<p v-show="lang === 'es'">Mis menús</p>
									<p v-show="lang === 'gl'">Os meus menús</p>
								</router-link>
							</li>

							<li class="linkButton">
								<button @click="logout()">
									<p v-show="lang === 'en'">Log out</p>
									<p v-show="lang === 'es'">Cerrar Sesión</p>
									<p v-show="lang === 'gl'">Pechar sesión</p>
								</button>
							</li>
						</ul>
					</transition>
				</div>

				<!-- </User options> -->
			</div>
		</transition>

		<div class="blank" v-show="isMobile() && menu" @click="menu = !menu"></div>
	</div>
</template>

<script>
import { isLoggedIn, logout } from '../auth';

export default {
	name: 'MenuCustom',
	data() {
		return {
			languageHover: false,
			userMenu: false,
			menu: !this.isMobile(),
			search: false,
			searchQuery: ''
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		},
		userData() {
			return isLoggedIn();
		}
	},
	methods: {
		// Logout function
		logout() {
			logout();
			location.reload();
		},

		// Function checking if on mobile
		isMobile() {
			return screen.width < 700;
		},

		sumbitSearch() {
			this.$router.push({ name: 'Search', query: { q: this.searchQuery } });
		}
	}
};
</script>

<style scoped src="@/styles/languageSelector.css" />
<style scoped src="@/styles/upperMenu.css" />
<style scoped src="@/styles/sidebarMenu.css" />
