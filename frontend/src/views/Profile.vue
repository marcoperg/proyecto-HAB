<template>
	<div class="profile">
		<menucustom />
		<h1 v-if="lang==='en'">Account Details</h1>
		<h1 v-if="lang==='es'">Detalles de la cuenta</h1>
		<h1 v-if="lang==='gl'">Detalles da conta</h1>

		<div class="profileData" :class="{editing: edit}">
			<div class="h2">
				<h2 v-if="lang==='en'">General information</h2>
				<h2 v-if="lang==='es'">Información general</h2>
				<h2 v-if="lang==='gl'">Información general</h2>
				<button v-show="mobile" @click="edit = true" class="edit"></button>
			</div>

			<table>
				<tr>
					<td v-if="lang==='en'">Username</td>
					<td v-if="lang==='es'">Nombre de usuario</td>
					<td v-if="lang==='gl'">Nome de usuario</td>

					<td v-show="!edit">{{data.nick}}</td>
					<td v-show="edit">
						<input type="text" v-model="data.nick" />
					</td>

					<td>
						<button v-show="!mobile" class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td>Email</td>
					<td v-show="!edit">{{data.email}}</td>
					<td v-show="edit">
						<input type="text" v-model="data.email" />
					</td>

					<td>
						<button v-show="!mobile" class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">Name</td>
					<td v-if="lang==='es'">Nombre</td>
					<td v-if="lang==='gl'">Nome</td>

					<td v-show="!edit">{{data.first_name}} {{data.last_name}}</td>
					<td v-show="edit">
						<input type="text" v-model="data.first_name" />
						<input type="text" v-model="data.last_name" />
					</td>

					<td>
						<button v-show="!mobile" class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">Telephone</td>
					<td v-if="lang==='es'">Teléfono</td>
					<td v-if="lang==='gl'">Teléfono</td>

					<td v-show="!edit">{{data.tlf}}</td>
					<td v-show="edit">
						<input type="tel" v-model="data.tlf" />
					</td>

					<td>
						<button v-show="!mobile" class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">Birthday</td>
					<td v-if="lang==='es'">Fecha de nacimiento</td>
					<td v-if="lang==='gl'">Data de nacimiento</td>

					<td v-show="!edit">{{birthday_formated}}</td>
					<td v-show="edit">
						<input type="date" v-model="data.birthday" />
					</td>

					<td>
						<button v-show="!mobile" class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">Password</td>
					<td v-if="lang==='es'">Contraseña</td>
					<td v-if="lang==='gl'">Contraseña</td>

					<td>
						<button @click="editPass = true" class="editPass">
							<p v-if="lang==='en'">Change password</p>
							<p v-if="lang==='es'">Cambiar contraseña</p>
							<p v-if="lang==='gl'">Cambiar contrasional</p>
						</button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">Account type</td>
					<td v-if="lang==='es'">Tipo de cuenta</td>
					<td v-if="lang==='gl'">Tipo de conta</td>

					<td>{{data.role}}</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">Creation date</td>
					<td v-if="lang==='es'">Fecha de creación</td>
					<td v-if="lang==='gl'">Data de creación</td>

					<td>{{creation_date_formated}}</td>
				</tr>
			</table>

			<div class="h2">
				<h2 v-if="lang==='en'">Address</h2>
				<h2 v-if="lang==='es'">Dirección</h2>
				<h2 v-if="lang==='gl'">Dirección</h2>

				<button v-show="mobile" @click="edit = true" class="edit"></button>
			</div>

			<table>
				<tr>
					<td v-if="lang==='en'">Line 1</td>
					<td v-if="lang==='es'">Línea 1</td>
					<td v-if="lang==='gl'">Línea 1</td>

					<td v-show="!edit">{{data.line1}}</td>
					<td v-show="edit">
						<input type="text" v-model="data.line1" />
					</td>

					<td>
						<button v-show="!mobile" class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">Line 2</td>
					<td v-if="lang==='es'">Línea 2</td>
					<td v-if="lang==='gl'">Línea 2</td>

					<td v-show="!edit">{{data.line2}}</td>
					<td v-show="edit">
						<input type="text" v-model="data.line2" />
					</td>

					<td>
						<button v-show="!mobile" class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">City</td>
					<td v-if="lang==='es'">Ciudad</td>
					<td v-if="lang==='gl'">Ciudade</td>

					<td v-show="!edit">{{data.city}}</td>
					<td v-show="edit">
						<input type="text" v-model="data.city" />
					</td>

					<td>
						<button v-show="!mobile" class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">State</td>
					<td v-if="lang==='es'">Estado/Comunidad</td>
					<td v-if="lang==='gl'">Estado/Comunidade</td>

					<td v-show="!edit">{{data.state}}</td>
					<td v-show="edit">
						<input type="text" v-model="data.state" />
					</td>

					<td>
						<button v-show="!mobile" class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">Country</td>
					<td v-if="lang==='es'">País</td>
					<td v-if="lang==='gl'">País</td>

					<td v-show="!edit">{{data.country}}</td>
					<td v-show="edit">
						<input type="text" v-model="data.country" />
					</td>

					<td>
						<button v-show="!mobile" class="edit" @click="edit = true"></button>
					</td>
				</tr>
			</table>
		</div>

		<button v-show="edit" @click="cancel()">
			<p v-if="lang==='en'">Cancel</p>
			<p v-if="lang==='es'">Cancelar</p>
			<p v-if="lang==='gl'">Cancelar</p>
		</button>

		<button class="cta" v-show="edit" @click="editUserInfo()">
			<p v-if="lang==='en'">Edit</p>
			<p v-if="lang==='es'">Editar</p>
			<p v-if="lang==='gl'">Editar</p>
		</button>

		<changepassword v-show="editPass" v-on:cancel="hideChangePass" :id="data.id" :lang="lang" />

		<footercustom />
	</div>
</template>

<script>
// Get auth functions
import { getUserInfo, getHeader, changeUserData } from '../auth';

// Import modules
import axios from 'axios';
import Swal from 'sweetalert2';
import dateFormat from 'dateformat';

// Import components
import menucustom from '@/components/MenuCustom.vue';
import footercustom from '@/components/FooterCustom.vue';
import changepassword from '@/components/user/ChangePass.vue';

export default {
	name: 'Profile',
	data() {
		return {
			mobile: false,
			edit: false,
			editPass: false,
			data: {},
			originalData: {}
		};
	},
	components: {
		menucustom,
		footercustom,
		changepassword
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		},
		birthday_formated() {
			return dateFormat(this.data.birthday, 'mm/dd/yyyy');
		},
		creation_date_formated() {
			return dateFormat(this.data.creation_date, 'mm/dd/yyyy');
		}
	},
	methods: {
		async getData() {
			try {
				const userId = getUserInfo().id;
				const data = await axios.get(process.env.VUE_APP_BACKEND_URL + '/users/' + userId, { headers: getHeader() });

				return data.data.data;
			} catch (e) {
				console.log(e.response);
			}
		},
		async editUserInfo() {
			try {
				const response = await changeUserData(this.data, this.originalData);
				if (response.status == 200) {
					let title = '';

					if (this.lang === 'en') {
						title = 'User updated successfully';
					} else if (this.lang === 'es') {
						title = 'Usuario actualizado correctamente';
					} else if (this.lang === 'gl') {
						title = 'Usuario actualizado correctamente';
					}

					Swal.fire({
						title: title,
						icon: 'success',
						showConfirmButton: false,
						timer: 1500
					}).then(() => {
						location.reload();
					});
				}
			} catch (error) {
				console.log(error.response);
			}
		},

		async editPassword() {
			console.log('pass');
		},

		hideChangePass() {
			this.editPass = false;
		},
		cancel() {
			location.reload();
		},

		// Function checking if on mobile
		isMobile() {
			return screen.width < 1000;
		}
	},
	async created() {
		this.mobile = this.isMobile();
		this.data = await this.getData();
		this.originalData = { ...this.data };
	}
};
</script>



<style scoped src="@/styles/profile.css">
</style>