<template>
	<!-- This div has 3 analogous parts, english, spanish and galician -->
	<div class="authForm">
		<!-- English login html -->
		<div class="en" v-if="lang === 'en'">
			<h1>Login</h1>

			<router-link :to="{ name: 'Home', params: { lang: lang } }" class="back">
				<img src="@/assets/icons/back.png" alt="Logo" />
			</router-link>

			<p class="error" v-show="error">Incorrect username or password</p>

			<form @submit.prevent>
				<label for="username">Username:</label>
				<input
					v-model="username"
					type="text"
					id="username"
					name="username"
					placeholder="Type your username or email..."
				/>

				<label for="password">Password:</label>
				<input
					v-model="password"
					type="password"
					id="password"
					name="password"
					placeholder="Type your password..."
				/>

				<button @click="login()">Log in</button>
			</form>
			<p>
				You don't have an account yet?
				<router-link :to="{ name: 'Signup' }">Create one here</router-link>
			</p>
		</div>

		<!-- Spanish login html -->
		<div class="es" v-if="lang === 'es'">
			<h1>Iniciar sesión</h1>

			<router-link :to="{ name: 'Home', params: { lang: lang } }" class="back">
				<img src="@/assets/icons/back.png" alt="Logo" />
			</router-link>

			<p class="error" v-show="error">Usuario o contraseña incorrectos</p>

			<form @submit.prevent>
				<label for="username">Nombre de usuario:</label>
				<input
					v-model="username"
					type="text"
					id="username"
					name="username"
					placeholder="Ingresa tu nombre de usuario o email..."
				/>

				<label for="password">Contraseña:</label>
				<input
					v-model="password"
					type="password"
					id="password"
					name="password"
					placeholder="Ingresa tu contraseña..."
				/>

				<button @click="login()">Iniciar sesión</button>
			</form>
			<p>
				¿No tienes cuenta todavía?
				<router-link :to="{ name: 'Signup' }">Crea una aquí</router-link>
			</p>
		</div>

		<!-- Galician login html -->
		<div class="gl" v-if="lang === 'gl'">
			<h1>Iniciar sesión</h1>

			<router-link :to="{ name: 'Home', params: { lang: lang } }" class="back">
				<img src="@/assets/icons/back.png" alt="Logo" />
			</router-link>

			<p class="error" v-show="error">Usuario ou contraseña incorrectos</p>

			<form @submit.prevent>
				<label for="username">Nome de usuario:</label>
				<input
					v-model="username"
					type="text"
					id="username"
					name="username"
					placeholder="Ingresa o teu nome de usuario o email..."
				/>

				<label for="password">Contrasinal:</label>
				<input
					v-model="password"
					type="password"
					id="password"
					name="password"
					placeholder="Ingresa a tua contrasinal..."
				/>

				<button @click="login()">Iniciar sesión</button>
			</form>
			<p>
				Non tes conta aínda?
				<router-link :to="{ name: 'Signup' }">Crea unha aquí</router-link>
			</p>
		</div>
	</div>
</template>

<script>
import { login } from '../auth';

export default {
	name: 'Login',
	data() {
		return {
			username: '',
			password: '',
			error: false
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		}
	},
	methods: {
		async login() {
			const response = await login(this.username, this.password);
			if (response.status == 200) {
				this.$router.push({ name: 'Home' });
			} else {
				this.error = true;

				this.emptyFields();
			}
		},
		emptyFields() {
			this.username = '';
			this.password = '';
		}
	}
};
</script>


<style scoped src="@/styles/informationForms.css"></style>