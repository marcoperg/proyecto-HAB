<template>
	<div class="profile">
		<menucustom />
		<h1 v-if="lang==='en'">Account Details</h1>
		<h1 v-if="lang==='es'">Detalles de la cuenta</h1>
		<h1 v-if="lang==='gl'">Detalles da conta</h1>

		<div class="profileData">
			<h2 v-if="lang==='en'">General information</h2>
			<h2 v-if="lang==='es'">Información general</h2>
			<h2 v-if="lang==='gl'">Información general</h2>

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
						<button class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td>Email</td>
					<td v-show="!edit">{{data.email}}</td>
					<td v-show="edit">
						<input type="text" v-model="data.email" />
					</td>

					<td>
						<button class="edit" @click="edit = true"></button>
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
						<button class="edit" @click="edit = true"></button>
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
						<button class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">Birthday</td>
					<td v-if="lang==='es'">Fecha de nacimiento</td>
					<td v-if="lang==='gl'">Data de nacimiento</td>

					<td v-show="!edit">{{data.birthday}}</td>
					<td v-show="edit">
						<input type="date" v-model="data.birthday" />
					</td>

					<td>
						<button class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">Account type</td>
					<td v-if="lang==='es'">Tipo de cuenta</td>
					<td v-if="lang==='gl'">Tipo de conta</td>

					<td v-show="!edit">{{data.role}}</td>
					<td v-show="edit">
						<input type="text" v-model="data.role" />
					</td>

					<td>
						<button class="edit" @click="edit = true"></button>
					</td>
				</tr>

				<tr>
					<td v-if="lang==='en'">Creation date</td>
					<td v-if="lang==='es'">Fecha de creación</td>
					<td v-if="lang==='gl'">Data de creación</td>

					<td>{{data.creation_date}}</td>
				</tr>
			</table>

			<h2 v-if="lang==='en'">Address</h2>
			<h2 v-if="lang==='es'">Dirección</h2>
			<h2 v-if="lang==='gl'">Dirección</h2>

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
						<button class="edit" @click="edit = true"></button>
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
						<button class="edit" @click="edit = true"></button>
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
						<button class="edit" @click="edit = true"></button>
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
						<button class="edit" @click="edit = true"></button>
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
						<button class="edit" @click="edit = true"></button>
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

		<footercustom />
	</div>
</template>

<script>
// Get auth functions
import { getUserInfo, getHeader, changeUserData } from '../auth';

// Import modules
import axios from 'axios';
import Swal from 'sweetalert2';

// Import components
import menucustom from '@/components/MenuCustom.vue';
import footercustom from '@/components/FooterCustom.vue';

export default {
	name: 'Profile',
	data() {
		return {
			edit: false,
			data: {},
			originalData: {}
		};
	},
	components: {
		menucustom,
		footercustom
	},
	computed: {
		lang() {
			return this.$route.params.lang;
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
		cancel() {
			location.reload();
		}
	},
	async created() {
		this.data = await this.getData();
		this.originalData = { ...this.data };
	}
};
</script>



<style scoped src="@/styles/profile.css">
</style>