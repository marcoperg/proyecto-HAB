<template>
	<!-- This div has 3 analogous parts, english, spanish and galician -->
	<div>
		<div class="background" @click="cancel()"></div>
		<main v-if="lang==='en'">
			<button class="cancel" @click="cancel()"></button>

			<h2>Change password</h2>
			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<label for="oldPass">Old password</label>
				<input type="password" id="oldPass" name="oldPass" v-model="oldPass" />

				<label for="oldPass">New password</label>
				<input type="password" id="newPass" name="oldPass" v-model="newPass" />

				<label for="oldPass">Repeat the new password</label>
				<input type="password" id="newPassRepeat" name="oldPass" v-model="newPassRepeat" />

				<button @click="changePass()">Change Password</button>
			</form>
		</main>

		<main v-if="lang==='es'">
			<button class="cancel" @click="cancel()"></button>

			<h2>Cambiar contraseña</h2>
			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<label for="oldPass">Contraseña antigua</label>
				<input type="password" id="oldPass" name="oldPass" v-model="oldPass" />

				<label for="oldPass">Nueva contraseña</label>
				<input type="password" id="newPass" name="oldPass" v-model="newPass" />

				<label for="oldPass">Repite la contraseña nueva</label>
				<input type="password" id="newPassRepeat" name="oldPass" v-model="newPassRepeat" />

				<button @click="changePass()">Camibar contraseñá</button>
			</form>
		</main>

		<main v-if="lang==='gl'">
			<button class="cancel" @click="cancel()"></button>

			<h2>Cambiar contrasinal</h2>
			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<label for="oldPass">Contrasinal antigo</label>
				<input type="password" id="oldPass" name="oldPass" v-model="oldPass" />

				<label for="oldPass">Novo contrasinal</label>
				<input type="password" id="newPass" name="oldPass" v-model="newPass" />

				<label for="oldPass">Repite o novo contrasinal</label>
				<input type="password" id="newPassRepeat" name="oldPass" v-model="newPassRepeat" />

				<button @click="changePass()">Cambiar contrasinal</button>
			</form>
		</main>
	</div>
</template>

<script>
import Swal from 'sweetalert2';
import { changePassword, logout } from '../../auth';

export default {
	name: 'EditMenu.vue',
	props: {
		id: Number,
		lang: String
	},
	data() {
		return {
			oldPass: '',
			newPass: '',
			newPassRepeat: '',
			error: ''
		};
	},
	methods: {
		cancel() {
			this.$emit('cancel');
		},
		async changePass() {
			if (this.validateForm()) {
				const response = await changePassword(this.oldPass, this.newPass, this.id);
				console.log(response);
				if (response.status == 200) {
					this.error = '';

					let title = '';

					if (this.lang === 'en') {
						title = 'Password updated successfully';
					} else if (this.lang === 'es') {
						title = 'Contraseña actualizado correctamente';
					} else if (this.lang === 'gl') {
						title = 'Contrasional actualizado correctamente';
					}

					Swal.fire({
						title: title,
						icon: 'success',
						showConfirmButton: false,
						timer: 1500
					}).then(() => {
						location.reload();
					});

					logout();
					this.$router.push({ name: 'Login' });
				} else if (response.status == 401 || response.status === 500) {
					let message = '';

					if (this.lang === 'en') {
						message = 'Old password incorrect';
					} else if (this.lang === 'es') {
						message = 'Contraseña incorrectos';
					} else if (this.lang === 'gl') {
						message = 'Contrasional incorrectos';
					}

					this.error = message;
					this.emptyFields();
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
			if (!this.oldPass) {
				let message = '';

				if (this.lang === 'en') {
					message = 'Please insert your old password';
				} else if (this.lang === 'es') {
					message = 'Por favor ingresa tu contraseña antigua';
				} else if (this.lang === 'gl') {
					message = 'Por favor ingresa o teu contrasinal antigo';
				}

				this.error = message;
			} else if (!this.newPass || !this.newPassRepeat) {
				let message = '';

				if (this.lang === 'en') {
					message = 'The new password must be inserted';
				} else if (this.lang === 'es') {
					message = 'Debes ingresar tu nueva contraseña';
				} else if (this.lang === 'gl') {
					message = 'Debes ingresar o teu novo contrasianl';
				}

				this.error = message;
			} else if (this.newPass !== this.newPassRepeat) {
				let message = '';

				if (this.lang === 'en') {
					message = 'The passwords do not match';
				} else if (this.lang === 'es') {
					message = 'Las dos contraseñas no son iguales';
				} else if (this.lang === 'gl') {
					message = 'Os dous contrasinais non son iguais';
				}

				this.error = message;
			} else {
				return true;
			}
			return false;
		},
		emptyFields() {
			this.oldPass = '';
			this.newPass = '';
			this.newPassRepeat = '';
		}
	}
};
</script>

<style scoped>
.background {
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	height: 100vh;
	z-index: 9;

	background: rgba(0, 0, 0, 0.7);
}

main {
	position: fixed;
	top: calc(50% - 15rem);
	left: calc(50% - 11rem);
	background: #dddddd;
	height: 30rem;
	width: 22rem;
	z-index: 10;

	padding: 1rem;
}

button {
	width: 9rem;
	height: 3rem;
	background: #c4c4c4;
	border: 0;
	border-radius: 1.5rem;
	margin: 3rem auto;
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
	margin: 2rem 0 0 1rem;
	font-size: 1rem;
	text-align: start;
}

input {
	margin: 0 auto;
	font-size: 1rem;
	width: 20rem;
	height: 2.5rem;
	padding: 0 1rem;
	background: #ffffff;
	border: 0;
}

.error {
	margin: 1.4rem 3rem 0;
	text-align: left;
	color: red;
}
</style>