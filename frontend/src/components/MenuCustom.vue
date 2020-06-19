<template>
	<div id="nav">
		<header>
			<!-- Botton for toogle menu (only available on mobile) -->
			<button v-show="isMobile()" @click="menu = !menu" class="openmenu"></button>

			<router-link :to="{ name: 'Home', params: { lang: lang } }" class="logo">
				<img src="@/assets/logo/side_by_side_transparent.png" alt="Logo" />
			</router-link>

			<button v-show="isMobile()" @click="menu = !menu" class="search"></button>
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
				<div class="userOptions">
					<button class="logout" v-show="logged" @click="logout()">
						<p v-show="lang === 'en'">Log out</p>
						<p v-show="lang === 'es'">Cerrar Sesión</p>
						<p v-show="lang === 'gl'">Pechar sesión</p>
					</button>
				</div>

				<router-link v-show="!logged" class="login" :to="{ name: 'Login', params: { lang: lang } }">
					<p v-show="lang === 'en'">Log in</p>
					<p v-show="lang === 'es' || lang === 'gl'">Iniciar Sesión</p>
				</router-link>

				<router-link v-show="logged" class="login" :to="{ name: 'Cart', params: { lang: lang } }">
					<p v-show="lang === 'en'">Cart</p>
					<p v-show="lang === 'es' || lang === 'gl'">Carrito</p>
				</router-link>

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
			menu: !this.isMobile()
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		},
		logged() {
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
		}
	}
};
</script>

<style scoped src="@/styles/languageSelector.css" />
<style scoped src="@/styles/upperMenu.css" />
<style scoped src="@/styles/sidebarMenu.css" />
