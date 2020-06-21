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
					<div class="select" :class="{errorHere: errorIn === 'role'}">
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
						:class="{errorHere: errorIn === 'username'}"
					/>

					<label class="required" for="email">Email:</label>
					<input
						v-model="email"
						type="email"
						id="email"
						name="email"
						placeholder="Type your email..."
						:class="{errorHere: errorIn === 'email'}"
					/>

					<label class="required" for="confirmEmail">Confirm your email:</label>
					<input
						v-model="confirmEmail"
						type="email"
						id="confirmEmail"
						name="confirmEmail"
						placeholder="Type your email again..."
						:class="{errorHere: errorIn === 'email'}"
					/>

					<label class="required" for="password">Password:</label>
					<input
						v-model="password"
						type="password"
						id="password"
						name="password"
						placeholder="Type your password..."
						:class="{errorHere: errorIn === 'password'}"
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
					<div class="select" :class="{errorHere: errorIn === 'role'}">
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
						:class="{errorHere: errorIn === 'username'}"
					/>

					<label class="required" for="email">Email:</label>
					<input
						v-model="email"
						type="email"
						id="email"
						name="email"
						placeholder="Ingresa tu email..."
						:class="{errorHere: errorIn === 'email'}"
					/>

					<label class="required" for="confirmEmail">Confirma tu email:</label>
					<input
						v-model="confirmEmail"
						type="email"
						id="confirmEmail"
						name="confirmEmail"
						placeholder="Ingresa tu email de nuevo..."
						:class="{errorHere: errorIn === 'email'}"
					/>

					<label class="required" for="password">Contraseña:</label>
					<input
						v-model="password"
						type="password"
						id="password"
						name="password"
						placeholder="Ingresa tu contraseña..."
						:class="{errorHere: errorIn === 'password'}"
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
					<div class="select" :class="{errorHere: errorIn === 'role'}">
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
						:class="{errorHere: errorIn === 'username'}"
					/>

					<label class="required" for="email">Email:</label>
					<input
						v-model="email"
						type="email"
						id="email"
						name="email"
						placeholder="Type your email..."
						:class="{errorHere: errorIn === 'email'}"
					/>

					<label class="required" for="confirmEmail">Confirma o teu email:</label>
					<input
						v-model="confirmEmail"
						type="email"
						id="confirmEmail"
						name="confirmEmail"
						placeholder="Ingresa o teu email de novo..."
						:class="{errorHere: errorIn === 'email'}"
					/>

					<label class="required" for="password">Contrasinal:</label>
					<input
						v-model="password"
						type="password"
						id="password"
						name="password"
						placeholder="Ingresa o teu contraseinal..."
						:class="{errorHere: errorIn === 'password'}"
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

			error: '',
			errorIn: ''
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
					let title = '';
					let message = '';

					if (this.lang === 'en') {
						message = 'Plese confirm your email before login';
					} else if (this.lang === 'es' || this.lang === 'gl') {
					}

					if (this.lang === 'en') {
						title = 'User created successfully';

						message = 'Please confirm your account before login.';
					} else if (this.lang === 'es') {
						title = 'Usuario creado correctamente';

						message = 'Por favor confirma tu cuenta antes de iniciar sesión';
					} else if (this.lang === 'gl') {
						title = 'Usuario creado correctamente';

						message = 'Por favor confirma a túa conta antes de iniciar sesión';
					}

					this.error = '';

					Swal.fire({
						title: title,
						icon: 'success',
						text: message,
						showConfirmButton: false,
						timer: 6000
					});

					this.$router.push({ name: 'Login' });
				} else if (response.status == 409) {
					console.log(response);
					window.scrollTo(0, 0);

					let message = '';

					if (this.lang === 'en') {
						message = 'Username already in use';
					} else if (this.lang === 'es') {
						message = 'Nombre usuario en uso';
					} else if (this.lang === 'gl') {
						message = 'Nome de usuario en uso';
					}

					this.error = message;
					this.emptyFields();
				} else {
					console.log(response);
					window.scrollTo(0, 0);

					let message = '';

					if (this.lang === 'en') {
						message = 'Unknown error, please retry later';
					} else if (this.lang === 'es') {
						message = 'Error desconocido, por favor intentalo de nuevo más tarde';
					} else if (this.lang === 'gl') {
						message = 'Error desconocido, por favor intentalo de novo máis tarde';
					}

					this.error = message;
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
			if (!this.role) {
				let message = '';

				if (this.lang === 'en') {
					message = 'Choose between client and seller';
				} else if (this.lang === 'es') {
					message = 'Elige entre vendedor y cliente';
				} else if (this.lang === 'gl') {
					message = 'Elixe entre vendedor e cliente';
				}

				this.error = message;
				this.errorIn = 'role';
			} else if (!this.username) {
				let message = '';

				if (this.lang === 'en') {
					message = 'The username must be filled';
				} else if (this.lang === 'es') {
					message = 'El nombre de usuario es obligatorio';
				} else if (this.lang === 'gl') {
					message = 'O nome de usuartio é obligatorio';
				}

				this.error = message;
				this.errorIn = 'username';
			} else if (!this.email || !this.confirmEmail) {
				let message = '';

				if (this.lang === 'en') {
					message = 'The emails must be filled';
				} else if (this.lang === 'es') {
					message = 'El email es obligatorio';
				} else if (this.lang === 'gl') {
					message = 'O email é obligatorio';
				}

				this.error = message;
				this.errorIn = 'email';
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
				this.errorIn = 'password';
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
				this.errorIn = 'email';
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
				this.errorIn = 'password';
			} else {
				return true;
			}
			window.scrollTo(0, 0);
			return false;
		},
		emptyFields() {
			this.role = '';
			this.username = '';
			this.email = '';
			this.confirmEmail = '';
			this.password = '';
			this.firstName = '';
			this.lastName = '';
			this.tlf = '';
			this.birthday = '';
			this.addressLine1 = '';
			this.addressLine2 = '';
			this.city = '';
			this.state = '';
			this.country = '';
			this.error = '';
			this.errorIn = '';
		}
	}
};
</script>

<style scoped src="@/styles/informationForms.css"></style>