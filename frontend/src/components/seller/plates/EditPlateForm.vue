<template>
	<div class="addShopForm">
		<div class="background" @click="cancel()"></div>
		<!-- This div has 3 analogous parts, english, spanish and galician -->
		<div class="authForm">
			<!-- English signup html -->
			<div class="en" v-if="lang === 'en'">
				<h1>Edit plate</h1>

				<a @click="cancel" class="back">
					<img src="@/assets/icons/back.png" alt="Logo" />
				</a>

				<p class="error">{{error}}</p>

				<form @submit.prevent>
					<fieldset>
						<label class="required" for="name">Name:</label>
						<input
							v-model="data.name"
							type="text"
							id="name"
							name="name"
							placeholder="Type the plate's name..."
							:class="{errorHere: error}"
						/>

						<label class="required" for="prize">Prize:</label>
						<input
							v-model="data.prize"
							type="prize"
							id="prize"
							name="number"
							:class="{errorHere: error}"
							placeholder="Type the prize of the plate..."
						/>

						<label for="description">Description:</label>
						<textarea
							v-model="data.description"
							name="description"
							id="description"
							placeholder="Insert the decription of the plate..."
							cols="30"
							rows="10"
						></textarea>
					</fieldset>
					<button @click="edit()">Edit plate</button>
				</form>
			</div>

			<!-- Spanish signup html -->
			<div class="es" v-if="lang === 'es'">
				<h1>Editar plato</h1>

				<a @click="cancel" class="back">
					<img src="@/assets/icons/back.png" alt="Logo" />
				</a>

				<p class="error">{{error}}</p>

				<form @submit.prevent>
					<fieldset>
						<label class="required" for="name">Nombre:</label>
						<input
							v-model="data.name"
							type="text"
							id="name"
							name="name"
							placeholder="Ingresa el nombre del plato..."
							:class="{errorHere: error}"
						/>

						<label class="required" for="prize">Precio:</label>
						<input
							v-model="data.prize"
							type="prize"
							id="prize"
							name="number"
							:class="{errorHere: error}"
							placeholder="Ingresa el precio del plato..."
						/>

						<label for="description">Descripción:</label>
						<textarea
							v-model="data.description"
							name="description"
							id="description"
							placeholder="Ingresa una breve descripción del plato..."
							cols="30"
							rows="10"
						></textarea>
					</fieldset>
					<button @click="edit()">Editar plato</button>
				</form>
			</div>

			<!-- Galician signup html -->
			<div class="en" v-if="lang === 'gl'">
				<h1>Editar prato</h1>

				<a @click="cancel" class="back">
					<img src="@/assets/icons/back.png" alt="Logo" />
				</a>

				<p class="error">{{error}}</p>

				<form @submit.prevent>
					<fieldset>
						<label class="required" for="name">Nome:</label>
						<input
							v-model="data.name"
							type="text"
							id="name"
							name="name"
							placeholder="Ingresa o nome do prato..."
							:class="{errorHere: error}"
						/>

						<label class="required" for="prize">Prezo:</label>
						<input
							v-model="data.prize"
							type="prize"
							id="prize"
							name="number"
							:class="{errorHere: error}"
							placeholder="Ingresa o prezo do..."
						/>

						<label for="description">Descrición:</label>
						<textarea
							v-model="data.description"
							name="description"
							id="description"
							placeholder="Inserta a descrición do prato..."
							cols="30"
							rows="10"
						></textarea>
					</fieldset>
					<button @click="edit()">Editar prato</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
	name: 'EditPlateForm',
	props: {
		lang: String,
		dataProp: Object
	},
	data() {
		return {
			data: {},
			error: ''
		};
	},
	methods: {
		cancel() {
			this.$emit('cancel');
		},
		edit() {
			if (this.validateForm()) {
				this.$emit('edit', { ...this.data });
			}
		},

		validateForm() {
			if (!this.data.name || !this.data.prize) {
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
	},
	created() {
		this.data = { ...this.dataProp };
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
	left: calc(50% - 187.5px);
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