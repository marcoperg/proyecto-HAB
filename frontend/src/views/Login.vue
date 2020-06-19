<template>
	<div class="login">
		<!-- English login html -->
		<div class="en" v-if="lang === 'en'">
			<h1>Login</h1>

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
				<input v-model="password" type="password" id="password" name="password" placeholder="Type your password..." />

				<button @click="login()">Log in</button>
			</form>
			<p>
				You don't have an account yet?
				<router-link :to="{ name: 'Singup' }">Create one here</router-link>
			</p>
		</div>

		<!-- Spanish login html -->
		<div class="es" v-if="lang === 'es'">
			<h1>Iniciar sesión</h1>

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
				<router-link :to="{ name: 'Singup' }">Create una aquí</router-link>
			</p>
		</div>

		<!-- Galician login html -->
		<div class="gl" v-if="lang === 'gl'">
			<h1>Iniciar sesión</h1>

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

				<label for="password">Contraseña:</label>
				<input
					v-model="password"
					type="password"
					id="password"
					name="password"
					placeholder="Ingresa a tua contraseña..."
				/>

				<button @click="login()">Iniciar sesión</button>
			</form>
			<p>
				Non tes conta aínda?
				<router-link :to="{ name: 'Singup' }">Create unha aquí</router-link>
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
			}
		}
	}
};
</script>

<style scoped>
.login {
	font-size: 1.3rem;
	width: 375px;
	margin: 5rem auto;
	color: black;
}

form {
	display: flex;
	flex-wrap: wrap;
}

label {
	margin: 2rem 3rem 0;
	font-size: 1.1rem;
}

input {
	margin: 0 auto;
	font-size: 1rem;
	padding: 0 2rem;
	width: 20rem;
	height: 3rem;
	background: #c4c4c4;
	border: 0;
	border-radius: 1rem;
}

button {
	font-size: 1rem;
	margin: 4rem auto;
	padding: 0 4rem;
	width: 20rem;
	height: 3rem;
	background: #6b6b6b;
	border: 0;
	border-radius: 1rem;
}

p {
	font-size: 1rem;
}

a {
	font-weight: bold;
	color: black;
}

.error {
	margin: 1.4rem 3rem 0;
	text-align: left;
	color: red;
}
</style>
