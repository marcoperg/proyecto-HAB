<template>
	<!-- This div has 3 analogous parts, english, spanish and galician -->
	<div class="authForm">
		<!-- English signup html -->
		<div class="en" v-if="lang === 'en'">
			<h1>Sign up</h1>

			<router-link :to="{ name: 'Home', params: { lang: lang } }" class="back">
				<img src="@/assets/icons/back.png" alt="Logo" />
			</router-link>

			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<!-- BASIC INFO -->
				<fieldset>
					<h2>· Basic information</h2>
					<div class="select">
						<button @click="selectClient()" class="option" :class="{selected: role==='client'}">
							<img src="@/assets/icons/user.png" alt="User" />
							<p>Client</p>
						</button>

						<button @click="selectSeller()" class="option" :class="{selected: role==='seller'}">
							<img src="@/assets/icons/seller.png" alt="User" />
							<p>Seller</p>
						</button>
					</div>

					<label class="required" for="username">Username:</label>
					<input
						v-model="username"
						type="text"
						id="username"
						name="username"
						placeholder="Type your username..."
					/>

					<label class="required" for="email">Email:</label>
					<input v-model="email" type="email" id="email" name="email" placeholder="Type your email..." />

					<label class="required" for="confirmEmail">Confirm your email:</label>
					<input
						v-model="confirmEmail"
						type="email"
						id="confirmEmail"
						name="confirmEmail"
						placeholder="Type your email again..."
					/>

					<label class="required" for="password">Password:</label>
					<input
						v-model="password"
						type="password"
						id="password"
						name="password"
						placeholder="Type your password..."
					/>
				</fieldset>

				<!-- PERSONAL INFO -->
				<fieldset>
					<h2>· Personal information</h2>

					<label for="firstName">First name:</label>
					<input
						v-model="firstName"
						type="text"
						id="firstName"
						name="firstName"
						placeholder="Type your first name..."
					/>

					<label for="lastName">Last name:</label>
					<input
						v-model="lastName"
						type="text"
						id="lastName"
						name="lastName"
						placeholder="Type your last name..."
					/>

					<label for="tlf">Telephone:</label>
					<input
						v-model="tlf"
						type="tel"
						id="tlf"
						name="tlf"
						placeholder="Type your telephone number..."
					/>

					<label for="birthday">Birthday:</label>
					<input v-model="birthday" type="date" id="birthday" name="birthday" />
				</fieldset>
				<button @click="signup()">Sign up</button>
			</form>
			<p>
				You already have an account?
				<router-link :to="{ name: 'Login' }">Log in</router-link>
			</p>
		</div>

		<!-- Spanish signup html -->
		<div class="es" v-if="lang === 'es'">
			<h1>Registrate</h1>

			<router-link :to="{ name: 'Home', params: { lang: lang } }" class="back">
				<img src="@/assets/icons/back.png" alt="Logo" />
			</router-link>

			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<!-- BASIC INFO -->
				<fieldset>
					<h2>· Información básica</h2>
					<div class="select">
						<button @click="selectClient()" class="option" :class="{selected: role==='client'}">
							<img src="@/assets/icons/user.png" alt="User" />
							<p>Cliente</p>
						</button>

						<button @click="selectSeller()" class="option" :class="{selected: role==='seller'}">
							<img src="@/assets/icons/seller.png" alt="User" />
							<p>Vendedor</p>
						</button>
					</div>

					<label class="required" for="username">Nombre de usuario:</label>
					<input
						v-model="username"
						type="text"
						id="username"
						name="username"
						placeholder="Ingresa tu nombre de usuario..."
					/>

					<label class="required" for="email">Email:</label>
					<input v-model="email" type="email" id="email" name="email" placeholder="Ingresa tu email..." />

					<label class="required" for="confirmEmail">Confirma tu email:</label>
					<input
						v-model="confirmEmail"
						type="email"
						id="confirmEmail"
						name="confirmEmail"
						placeholder="Ingresa tu email de nuevo..."
					/>

					<label class="required" for="password">Contraseña:</label>
					<input
						v-model="password"
						type="password"
						id="password"
						name="password"
						placeholder="Ingresa tu contraseña..."
					/>
				</fieldset>

				<!-- PERSONAL INFO -->
				<fieldset>
					<h2>· Información personal</h2>

					<label for="firstName">Nombre:</label>
					<input
						v-model="firstName"
						type="text"
						id="firstName"
						name="firstName"
						placeholder="Ingresa tu nombre..."
					/>

					<label for="lastName">Apellidos:</label>
					<input
						v-model="lastName"
						type="text"
						id="lastName"
						name="lastName"
						placeholder="Ingresa tus apellidos..."
					/>

					<label for="tlf">Teléfono:</label>
					<input
						v-model="tlf"
						type="tel"
						id="tlf"
						name="tlf"
						placeholder="Ingresa tu número de teléfono..."
					/>

					<label for="birthday">Fecha de nacimiento:</label>
					<input v-model="birthday" type="date" id="birthday" name="birthday" />
				</fieldset>
				<button @click="signup()">Crear cuenta</button>
			</form>
			<p>
				¿Ya tienes una cuenta?
				<router-link :to="{ name: 'Login' }">Inicia sesión</router-link>
			</p>
		</div>

		<!-- Galician signup html -->
		<div class="en" v-if="lang === 'gl'">
			<h1>Registrate</h1>

			<router-link :to="{ name: 'Home', params: { lang: lang } }" class="back">
				<img src="@/assets/icons/back.png" alt="Logo" />
			</router-link>

			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<!-- BASIC INFO -->
				<fieldset>
					<h2>· Información Básica</h2>
					<div class="select">
						<button @click="selectClient()" class="option" :class="{selected: role==='client'}">
							<img src="@/assets/icons/user.png" alt="User" />
							<p>Cliente</p>
						</button>

						<button @click="selectSeller()" class="option" :class="{selected: role==='seller'}">
							<img src="@/assets/icons/seller.png" alt="User" />
							<p>Vendedor</p>
						</button>
					</div>

					<label class="required" for="username">Nome de usuario:</label>
					<input
						v-model="username"
						type="text"
						id="username"
						name="username"
						placeholder="Ingresa o teu nome de usuario..."
					/>

					<label class="required" for="email">Email:</label>
					<input v-model="email" type="email" id="email" name="email" placeholder="Type your email..." />

					<label class="required" for="confirmEmail">Confirma o teu email:</label>
					<input
						v-model="confirmEmail"
						type="email"
						id="confirmEmail"
						name="confirmEmail"
						placeholder="Ingresa o teu email de novo..."
					/>

					<label class="required" for="password">Contrasinal:</label>
					<input
						v-model="password"
						type="password"
						id="password"
						name="password"
						placeholder="Ingresa o teu contraseinal..."
					/>
				</fieldset>

				<!-- PERSONAL INFO -->
				<fieldset>
					<h2>· Información personal</h2>

					<label for="firstName">Nome:</label>
					<input
						v-model="firstName"
						type="text"
						id="firstName"
						name="firstName"
						placeholder="Ingresa o teu nome..."
					/>

					<label for="lastName">Apellido:</label>
					<input
						v-model="lastName"
						type="text"
						id="lastName"
						name="lastName"
						placeholder="Ingresa o teu apellido..."
					/>

					<label for="tlf">Teléfono:</label>
					<input
						v-model="tlf"
						type="tel"
						id="tlf"
						name="tlf"
						placeholder="Ingresa o teu número de teléfono..."
					/>

					<label for="birthday">Data de nacemento:</label>
					<input v-model="birthday" type="date" id="birthday" name="birthday" />
				</fieldset>
				<button @click="signup()">Crear conta</button>
			</form>
			<p>
				Ya tes conta?
				<router-link :to="{ name: 'Login' }">Inicia sesión</router-link>
			</p>
		</div>
	</div>
</template>

<script>
import Swal from 'sweetalert2';
import { register } from '../auth';

export default {
	name: 'Signup',
	data() {
		return {
			role: '',
			username: '',
			email: '',
			confirmEmail: '',
			password: '',
			firstName: '',
			lastName: '',
			tlf: '',
			birthday: '',

			addressLine1: '',
			addressLine2: '',
			city: '',
			state: '',
			country: '',

			error: ''
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		}
	},
	methods: {
		async signup() {
			if (this.validateForm()) {
				const data = {
					nick: this.username,
					password: this.password,
					seller: this.role === 'seller',
					first_name: this.firstName,
					last_name: this.lastName,
					email: this.email,
					tlf: this.tlf,
					birthday: this.birthday,
					address_line1: this.addressLine1,
					address_line2: this.addressLine2,
					city: this.city,
					state: this.state,
					country: this.country
				};

				const response = await register(data);
				if (response.status == 200) {
					let message = '';
					if (this.lang === 'en') {
						message = 'User created successfully';
					} else if (this.lang === 'es' || this.lang === 'gl') {
						message = 'Usuario creado correctamente';
					}

					this.error = '';

					Swal.fire({
						title: message,
						icon: 'success',
						showConfirmButton: false,
						timer: 1500
					});
				} else {
					window.scrollTo(0, 0);
					this.error = 'Unknown error, please retry later';
					this.emptyFields();
				}
			}
		},
		selectSeller() {
			this.role = 'seller';
		},
		selectClient() {
			this.role = 'client';
		},
		// Validate registering data with custom error messages for each language
		validateForm() {
			console.log(this.password.length);
			if (!this.username) {
				let message = '';

				if (this.lang === 'en') {
					message = 'The username must be filled';
				} else if (this.lang === 'es') {
					message = 'El nombre de usuario es obligatorio';
				} else if (this.lang === 'gl') {
					message = 'O nome de usuartio é obligatorio';
				}

				this.error = message;
			} else if (!this.email || !this.confirmEmail) {
				let message = '';

				if (this.lang === 'en') {
					message = 'The email must be filled';
				} else if (this.lang === 'es') {
					message = 'El email es obligatorio';
				} else if (this.lang === 'gl') {
					message = 'O email é obligatorio';
				}

				this.error = message;
			} else if (!this.password) {
				let message = '';

				if (this.lang === 'en') {
					message = 'The password must be filled';
				} else if (this.lang === 'es') {
					message = 'La contraseña es obligatoria';
				} else if (this.lang === 'gl') {
					message = 'O contrasinal é obligatoria';
				}

				this.error = message;
			} else if (this.email !== this.confirmEmail) {
				let message = '';

				if (this.lang === 'en') {
					message = 'The two emails must be equal';
				} else if (this.lang === 'es') {
					message = 'Los dos emails deben ser iguales';
				} else if (this.lang === 'gl') {
					message = 'Os dous emails deben ser iguais';
				}

				this.error = message;
			} else if (this.password.length < 6) {
				let message = '';

				if (this.lang === 'en') {
					message = 'The password must be at least 6 characters long';
				} else if (this.lang === 'es') {
					message = 'La contraseña debe de tener al menos 6 carcteres';
				} else if (this.lang === 'gl') {
					message = 'O contrasinal debe ter 6 caracteres como mínimo';
				}

				this.error = message;
			} else {
				return true;
			}
			window.scrollTo(0, 0);
			return false;
		},
		emptyFields() {
			this.username = '';
			this.password = '';
		}
	}
};
</script>

<style scoped src="@/styles/informationForms.css"></style>

<style scoped>
h2 {
	font-size: 1.5rem;
	text-align: left;
	font-weight: normal;
	margin: 1.7rem 0 1.5rem;
}

.select {
	display: flex;
	justify-content: space-evenly;
}

.option {
	padding: 0 0.5rem;
	margin: 0;
	width: 136px;
	height: 72px;
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
</style>
