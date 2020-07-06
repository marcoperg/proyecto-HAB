<template>
	<div class="addShopForm">
		<div class="background" @click="cancel()"></div>
		<!-- This div has 3 analogous parts, english, spanish and galician -->
		<div class="authForm">
			<!-- English signup html -->
			<div class="en" v-if="lang === 'en'">
				<h1>Add restaurant</h1>

				<a @click="cancel" class="back">
					<img src="@/assets/icons/back.png" alt="Logo" />
				</a>

				<p class="error">{{ error }}</p>

				<form @submit.prevent>
					<!-- BASIC INFO -->
					<fieldset>
						<h2>· Basic information</h2>

						<label class="required" for="name">Name:</label>
						<input
							v-model="data.name"
							type="text"
							id="name"
							name="name"
							placeholder="Type the restaurant's name..."
							:class="{ errorHere: error }"
						/>

						<label class="required" for="description">Description:</label>
						<textarea
							v-model="data.description"
							name="description"
							id="description"
							placeholder="Insert the decription of the restuarant..."
							:class="{ errorHere: error }"
							cols="30"
							rows="10"
						></textarea>

						<label for="email">Email:</label>
						<input
							v-model="data.email"
							type="email"
							id="email"
							name="email"
							placeholder="Type the email used in the store..."
						/>

						<label for="tlf">Telephone:</label>
						<input v-model="data.tlf" type="tel" id="tlf" name="tlf" placeholder="Type your telephone number..." />
					</fieldset>

					<!-- Address -->
					<fieldset>
						<h2>· Address</h2>

						<label for="line1">Line 1:</label>
						<input
							v-model="data.address_line1"
							type="text"
							id="line1"
							name="line1"
							placeholder="Type the first line of the address..."
						/>

						<label for="line2">Line 2:</label>
						<input
							v-model="data.address_line2"
							type="text"
							id="line2"
							name="line2"
							placeholder="Type the second line of the address..."
						/>

						<label for="city">City:</label>
						<input v-model="data.city" type="text" id="city" name="city" placeholder="Type the city..." />

						<label for="state">State:</label>
						<input v-model="data.state" type="text" id="state" name="state" placeholder="Type the state..." />

						<label for="country">Country:</label>
						<input v-model="data.country" type="text" id="country" name="country" placeholder="Type the country..." />
					</fieldset>
					<button @click="add()">Add restaurant</button>
				</form>
			</div>

			<!-- Spanish signup html -->
			<div class="es" v-if="lang === 'es'">
				<h1>Añadir restaurante</h1>

				<a @click="cancel" class="back">
					<img src="@/assets/icons/back.png" alt="Logo" />
				</a>

				<p class="error">{{ error }}</p>

				<form @submit.prevent>
					<!-- BASIC INFO -->
					<fieldset>
						<h2>· Información básica</h2>

						<label class="required" for="name">Nombre:</label>
						<input
							v-model="data.name"
							type="text"
							id="name"
							name="name"
							placeholder="Escribe el nombre del restaurante..."
							:class="{ errorHere: error }"
						/>

						<label class="required" for="description">Descripción:</label>
						<textarea
							v-model="data.description"
							name="description"
							id="description"
							placeholder="Inserta la descripción del restaruante..."
							:class="{ errorHere: error }"
							cols="30"
							rows="10"
						></textarea>

						<label for="email">Email:</label>
						<input
							v-model="data.email"
							type="email"
							id="email"
							name="email"
							placeholder="Inserta el email del restaurante..."
						/>

						<label for="tlf">Teléfono:</label>
						<input
							v-model="data.tlf"
							type="tel"
							id="tlf"
							name="tlf"
							placeholder="Ingresa el teléfono delrestaurante..."
						/>
					</fieldset>

					<!-- Address -->
					<fieldset>
						<h2>· Dirección</h2>

						<label for="line1">Línea 1:</label>
						<input
							v-model="data.address_line1"
							type="text"
							id="line1"
							name="line1"
							placeholder="Escribe la primera línea de la dirección..."
						/>

						<label for="line2">Línea 2:</label>
						<input
							v-model="data.address_line2"
							type="text"
							id="line2"
							name="line2"
							placeholder="Escribe la segunda línea de la dirección..."
						/>

						<label for="city">Ciudad:</label>
						<input v-model="data.city" type="text" id="city" name="city" placeholder="Ingresa la ciudad..." />

						<label for="state">Estado/Comunidad:</label>
						<input
							v-model="data.state"
							type="text"
							id="state"
							name="state"
							placeholder="Ingresa la comunidad/estado..."
						/>

						<label for="country">País:</label>
						<input v-model="data.country" type="text" id="country" name="country" placeholder="Ingresa el país..." />
					</fieldset>
					<button @click="add()">Añadir restaurante</button>
				</form>
			</div>

			<!-- Galician signup html -->
			<div class="en" v-if="lang === 'gl'">
				<h1>Añadir restaurante</h1>

				<a @click="cancel" class="back">
					<img src="@/assets/icons/back.png" alt="Logo" />
				</a>

				<p class="error">{{ error }}</p>

				<form @submit.prevent>
					<!-- BASIC INFO -->
					<fieldset>
						<h2>· Información básica</h2>

						<label class="required" for="name">Nome:</label>
						<input
							v-model="data.name"
							type="text"
							id="name"
							name="name"
							placeholder="Escribe o nome do restaurante..."
							:class="{ errorHere: error }"
						/>

						<label class="required" for="description">Descrición:</label>
						<textarea
							v-model="data.description"
							name="description"
							id="description"
							placeholder="Inserta a descrición do restaruante..."
							:class="{ errorHere: error }"
							cols="30"
							rows="10"
						></textarea>

						<label for="email">Email:</label>
						<input
							v-model="data.email"
							type="email"
							id="email"
							name="email"
							placeholder="Inserta o email do restaurante..."
						/>

						<label for="tlf">Teléfono:</label>
						<input
							v-model="data.tlf"
							type="tel"
							id="tlf"
							name="tlf"
							placeholder="Ingresa o teléfono do restaurante..."
						/>
					</fieldset>

					<!-- Address -->
					<fieldset>
						<h2>· Dirección</h2>

						<label for="line1">Línea 1:</label>
						<input
							v-model="data.address_line1"
							type="text"
							id="line1"
							name="line1"
							placeholder="Escribe a primeira línea da dirección..."
						/>

						<label for="line2">Línea 2:</label>
						<input
							v-model="data.address_line2"
							type="text"
							id="line2"
							name="line2"
							placeholder="Escribe a segunda línea da dirección..."
						/>

						<label for="city">Ciudade:</label>
						<input v-model="data.city" type="text" id="city" name="city" placeholder="Ingresa a ciudade..." />

						<label for="state">Estado/Comunidade:</label>
						<input
							v-model="data.state"
							type="text"
							id="state"
							name="state"
							placeholder="Ingresa a comunidade/estado..."
						/>

						<label for="country">País:</label>
						<input v-model="data.country" type="text" id="country" name="country" placeholder="Ingresa o país..." />
					</fieldset>
					<button @click="add()">Añadir restaurante</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
	name: 'AddShopForm',
	data() {
		return {
			data: {},

			error: ''
		};
	},
	props: {
		lang: String
	},
	methods: {
		cancel() {
			this.$emit('cancel');
		},
		async add() {
			if (this.validateForm()) {
				this.$emit('add', { ...this.data });
			}
		},

		validateForm() {
			if (!this.data.name || !this.data.description) {
				let message = '';

				if (this.lang === 'en') {
					message = 'Please fill out the required fields';
				} else if (this.lang === 'es') {
					message = 'Por favor rellena los campos necesarios';
				} else if (this.lang === 'gl') {
					message = 'Por favor enche os campos necesarios';
				}

				this.error = message;
			} else {
				return true;
			}
			document.querySelector('.authForm').scrollTo(0, 0);
			return false;
		}
	}
};
</script>

<style scoped src="@/styles/informationForms.css"></style>

<style scoped>
.background {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;

	background: rgba(0, 0, 0, 0.7);

	min-width: 100%;
	min-height: 100vh;
}

.authForm {
	position: fixed;
	top: 0%;
	left: calc(50% - 155px);
	z-index: 11;
	background: white;
	margin: 1rem auto;
	max-height: 90vh;
	overflow-y: scroll;
}

a {
	cursor: pointer;
}

@media (min-width: 600px) {
	.authForm {
		left: calc(50% - 250px);
		width: 500px;
	}

	input {
		width: 28rem;
	}

	textarea {
		width: 27rem;
	}
}
</style>
