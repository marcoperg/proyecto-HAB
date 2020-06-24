<template>
	<!-- This div has 3 analogous parts, english, spanish and galician -->
	<div>
		<div class="background" @click="cancel()"></div>
		<main v-if="lang==='en'">
			<button class="cancel" @click="cancel()"></button>

			<h2>Submit review</h2>

			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<label for="comment">Comment:</label>
				<textarea v-model="comment" name="comment" id="comment" cols="30" rows="10"></textarea>

				<div class="stars">
					<starrating v-model="rating"></starrating>
				</div>

				<button @click="submit()">Submit</button>
			</form>
		</main>

		<main v-if="lang==='es'">
			<button class="cancel" @click="cancel()"></button>

			<h2>Subir opinión</h2>

			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<label for="comment">Comentario:</label>
				<textarea v-model="comment" name="comment" id="comment" cols="30" rows="10"></textarea>

				<div class="stars">
					<starrating v-model="rating"></starrating>
				</div>

				<button @click="submit()">Enviar</button>
			</form>
		</main>

		<main v-if="lang==='gl'">
			<button class="cancel" @click="cancel()"></button>

			<h2>Subir opinión</h2>

			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<label for="comment">Comentario:</label>
				<textarea v-model="comment" name="comment" id="comment" cols="30" rows="10"></textarea>

				<div class="stars">
					<starrating v-model="rating"></starrating>
				</div>

				<button @click="submit()">Enviar</button>
			</form>
		</main>
	</div>
</template>

<script>
import starrating from 'vue-star-rating';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getHeader } from '../../auth';

export default {
	name: 'EditMenu.vue',
	components: { starrating },
	props: {
		id: Number,
		lang: String
	},
	data() {
		return {
			rating: 0,
			comment: '',
			error: ''
		};
	},
	methods: {
		cancel() {
			this.$emit('cancel');
		},
		async submit() {
			if (this.validateForm()) {
				const response = await axios.post(
					process.env.VUE_APP_BACKEND_URL + `/shop/${this.id}/rate`,
					{
						rate: this.rating,
						comment: this.comment
					},
					{
						headers: getHeader()
					}
				);

				console.log(response);

				if (response.status == 200) {
					this.error = '';

					let title = '';

					if (this.lang === 'en') {
						title = 'Review upload successfully';
					} else if (this.lang === 'es') {
						title = 'Opinión subida correctamente';
					} else if (this.lang === 'gl') {
						title = 'Opinión subida correctamente';
					}

					Swal.fire({
						title: title,
						icon: 'success',
						showConfirmButton: false,
						timer: 1500
					}).then(() => {
						location.reload();
					});
				} else {
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
		// Validate registering data with custom error messages for each language
		validateForm() {
			if (!this.rating) {
				let message = '';

				if (this.lang === 'en') {
					message = 'Please insert a rating';
				} else if (this.lang === 'es') {
					message = 'Por favor ingresa una puntuación';
				} else if (this.lang === 'gl') {
					message = 'Por favor ingresa unha puntuación';
				}

				this.error = message;
			} else {
				return true;
			}
			return false;
		},
		emptyFields() {
			this.comment = '';
			this.rating = 0;
		}
	}
};
</script>

<style scoped>
.background {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.7);
}

main {
	position: fixed;
	z-index: 10;

	top: calc(50% - 15rem);
	left: calc(50% - 11rem);
	background: white;
	height: 30rem;
	width: 22rem;

	padding: 1rem;
}

button {
	width: 9rem;
	height: 3rem;
	margin: 3rem auto;
	background: black;
	border: 0;
	font-weight: bold;
	color: white;
	padding: 10px;
	border-radius: 0.4em;
	cursor: pointer;
}

button.cancel {
	position: absolute;
	top: 5px;
	right: 5px;

	width: 25px;
	height: 25px;
	border-radius: 0;
	margin: 0;
	background: 0;
	background-image: url('../../assets/icons/close.png');
	background-size: 25px 25px;
}

form {
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
}

label {
	margin: 1rem 0 0 1rem;
	font-size: 1rem;
	text-align: start;
}

textarea {
	border: 2px solid black;
	border-radius: 10px;
	margin: 0 auto;
	font-size: 1rem;
	width: 20rem;
	padding: 0 1rem;
	background: #ffffff;
}

.stars {
	margin: 2rem auto 1rem;
	background: white;
}

.error {
	margin-top: 10px;
	text-align: left;
	color: red;
}
</style>