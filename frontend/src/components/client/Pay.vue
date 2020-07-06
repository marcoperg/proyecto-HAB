<template>
	<div class="addShopForm">
		<div class="background" @click="cancel()"></div>
		<!-- This div has 3 analogous parts, english, spanish and galician -->
		<div class="authForm">
			<!-- English signup html -->
			<div class="en" v-if="lang === 'en'">
				<h1>Payment</h1>

				<a @click="cancel" class="back">
					<img src="@/assets/icons/back.png" alt="Logo" />
				</a>

				<p class="error">{{ error }}</p>

				<form @submit.prevent>
					<fieldset>
						<label for="name">Name on card:</label>
						<input v-model="data.name" type="text" id="name" name="name" :class="{ errorHere: error }" />

						<label for="number">Credit card number:</label>
						<input
							v-model="data.number"
							type="number"
							id="number"
							name="number"
							:class="{ errorHere: error }"
						/>

						<div class="small">
							<label for="date">Expiration date:</label>
							<input v-model="data.date" type="month" id="date" name="date" :class="{ errorHere: error }" />

							<label for="cvv">CVV:</label>
							<input v-model="data.cvv" type="number" id="cvv" name="cvv" :class="{ errorHere: error }" />
						</div>
					</fieldset>

					<button @click="pay()">Pay</button>
				</form>
			</div>

			<!-- Spanish signup html -->
			<div class="es" v-if="lang === 'es'">
				<h1>Pago</h1>
				<a @click="cancel" class="back">
					<img src="@/assets/icons/back.png" alt="Logo" />
				</a>

				<p class="error">{{ error }}</p>

				<form @submit.prevent>
					<fieldset>
						<label for="name">Titular de la tarjeta:</label>
						<input v-model="data.name" type="text" id="name" name="name" :class="{ errorHere: error }" />

						<label for="number">Número de la tarjeta:</label>
						<input
							v-model="data.number"
							type="number"
							id="number"
							name="number"
							:class="{ errorHere: error }"
						/>

						<div class="small">
							<label for="date">Fecha de expiración:</label>
							<input v-model="data.date" type="month" id="date" name="date" :class="{ errorHere: error }" />

							<label for="cvv">CVV:</label>
							<input v-model="data.cvv" type="number" id="cvv" name="cvv" :class="{ errorHere: error }" />
						</div>
					</fieldset>

					<button @click="pay()">Pagar</button>
				</form>
			</div>

			<!-- Galician signup html -->
			<div class="en" v-if="lang === 'gl'">
				<h1>Pago</h1>

				<a @click="cancel" class="back">
					<img src="@/assets/icons/back.png" alt="Logo" />
				</a>

				<p class="error">{{ error }}</p>

				<form @submit.prevent>
					<fieldset>
						<label for="name">Titular da tarxeta:</label>
						<input v-model="data.name" type="text" id="name" name="name" :class="{ errorHere: error }" />

						<label for="number">Número da tarxeta:</label>
						<input
							v-model="data.number"
							type="number"
							id="number"
							name="number"
							:class="{ errorHere: error }"
						/>

						<div class="small">
							<label for="date">Data de expiración:</label>
							<input v-model="data.date" type="month" id="date" name="date" :class="{ errorHere: error }" />

							<label for="cvv">CVV:</label>
							<input v-model="data.cvv" type="number" id="cvv" name="cvv" :class="{ errorHere: error }" />
						</div>
					</fieldset>

					<button @click="pay()">Pagar</button>
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
		async pay() {
			if (this.validateForm()) {
				this.$emit('pay', { ...this.data });
			}
		},

		validateForm() {
			if (!this.data.name || !this.data.number || !this.data.date || !this.data.cvv) {
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

#date,
#cvv {
	width: 180px;
}

.small {
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
}

.small label:first-child {
	margin-left: 1rem;
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
