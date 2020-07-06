<template>
	<div class="shops">
		<vue-headful
			v-if="lang === 'en'"
			title="Restaurants | Lastorder"
			description="Home page of hackamarket"
		/>
		<vue-headful
			v-if="lang === 'es'"
			title="Restaurantes | Lastorder"
			description="Home page of hackamarket"
		/>
		<vue-headful
			v-if="lang === 'gl'"
			title="Restaurantes | Lastorder"
			description="Home page of hackamarket"
		/>

		<menucustom />

		<sellermenu />

		<main>
			<p v-show="lang === 'en'">
				This panel allows you to add all your restaurants and manage its information. Also you can watch their
				notifications to see in real time the orders and calls that your clients make.
			</p>
			<p v-show="lang === 'es'">
				Este panel te permite añadir todos tus restaurantes y editar su información. Además puedes ver sus
				notificaciones para ver en tiempo real los pedidos y avisos de tus clientes.
			</p>
			<p v-show="lang === 'gl'">
				Este panel te permite añadir todos os teus restaurantes e editar a súa información. Ademais podes ver as súas
				notificacións para ver en tempo real os pedios e avisos dos teus clientes.
			</p>

			<nav>
				<button @click="addForm = true">
					<p v-show="lang === 'en'">Add a new shop</p>
					<p v-show="lang === 'es'">Añadir una nueva tienda</p>
					<p v-show="lang === 'gl'">Añadir unha nova tenda</p>
				</button>
			</nav>

			<shopcards
				v-if="data.length"
				:shops="data"
				:lang="lang"
				v-on:remove="removeShop"
				v-on:edit="activeEditShopForm"
				v-on:addPhoto="activeUploadImageForm"
			/>
			<addform v-show="addForm" v-on:add="addShop" v-on:cancel="addForm = false" :lang="lang" />

			<loadingspinner v-show="loading" />

			<editform
				v-if="editIndex !== null"
				v-on:edit="editShop"
				v-on:cancel="editIndex = null"
				:lang="lang"
				:dataProp="{ ...data[editIndex] }"
			/>

			<uploadimage
				v-if="imageId !== null"
				v-on:upload="uploadImage"
				v-on:cancel="imageId = null"
				:lang="lang"
				:id="imageId"
			/>
		</main>

		<footercustom />
	</div>
</template>

<script>
// Get auth functions
import { getHeader, getUserInfo, clean, removeUnchanged } from '@/auth';

// Import modules
import axios from 'axios';
import Swal from 'sweetalert2';

// Get components
import menucustom from '@/components/MenuCustom.vue';
import footercustom from '@/components/FooterCustom.vue';
import sellermenu from '@/components/seller/SellerMenu.vue';

import shopcards from '@/components/seller/shops/ShopCards.vue';
import addform from '@/components/seller/shops/AddShopForm.vue';
import editform from '@/components/seller/shops/EditShopForm.vue';
import uploadimage from '@/components/seller/UploadImage.vue';
import loadingspinner from '@/components/LoadingSpinner.vue';

export default {
	name: 'SellerShops',
	components: {
		menucustom,
		footercustom,
		sellermenu,
		shopcards,
		addform,
		editform,
		uploadimage,
		loadingspinner
	},
	data() {
		return {
			data: [],
			addForm: false,
			editIndex: null,
			imageId: null,
			loading: false
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		}
	},
	methods: {
		async getData() {
			try {
				this.loading = true;

				const sellerId = getUserInfo().id;
				const data = await axios.get(process.env.VUE_APP_BACKEND_URL + `/seller/${sellerId}/shops/`, {
					headers: getHeader()
				});

				this.loading = false;
				return data.data.data;
			} catch (e) {
				console.log(e.response);
			}
		},

		async addShop(data) {
			try {
				this.loading = true;

				await axios.post(process.env.VUE_APP_BACKEND_URL + '/shops', data, {
					headers: getHeader()
				});

				let title = '';

				if (this.lang === 'en') {
					title = 'Restaurant added successfully';
				} else if (this.lang === 'es') {
					title = 'Restaurante añadido correctamente';
				} else if (this.lang === 'gl') {
					title = 'Restaurante añadido correctamente';
				}

				this.loading = false;

				Swal.fire({
					title: title,
					icon: 'success',
					showConfirmButton: false,
					timer: 1500
				});
				location.reload();
			} catch (error) {
				console.log(error.response);
			}
		},

		async removeShop(id) {
			try {
				Swal.fire({
					title: 'Are you sure?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!'
				}).then(async (result) => {
					if (result.value) {
						this.loading = true;

						await axios.delete(process.env.VUE_APP_BACKEND_URL + '/shops/' + id, {
							headers: getHeader()
						});

						this.loading = false;
						location.reload();
					}
				});
			} catch (error) {
				console.log(error.response);
			}
		},

		async editShop(data) {
			this.loading = true;

			const originalData = this.data[this.editIndex];
			clean(data);
			removeUnchanged(data, originalData);

			const url = process.env.VUE_APP_BACKEND_URL + '/shops/' + originalData.id;

			if (data.line1 || data.line1 === '') {
				data.address_line1 = data.line1;
				delete data.line1;
			}
			if (data.line2 || data.line2 === '') {
				data.address_line2 = data.line2;
				delete data.line2;
			}

			await axios.put(url, data, {
				headers: getHeader()
			});

			let title = '';

			if (this.lang === 'en') {
				title = 'Restaurant edited successfully';
			} else if (this.lang === 'es') {
				title = 'Restaurante editado correctamente';
			} else if (this.lang === 'gl') {
				title = 'Restaurante editado correctamente';
			}

			this.loading = false;

			Swal.fire({
				title: title,
				icon: 'success',
				showConfirmButton: false,
				timer: 1500
			});
			location.reload();
		},

		async uploadImage(img) {
			try {
				this.loading = true;

				const url = process.env.VUE_APP_BACKEND_URL + '/shops/' + this.imageId;

				await axios.post(url, img, {
					headers: {
						'Content-Type': 'multipart/form-data',
						...getHeader()
					}
				});

				let title = '';

				if (this.lang === 'en') {
					title = 'Photo added successfully';
				} else if (this.lang === 'es') {
					title = 'Foto añadida correctamente';
				} else if (this.lang === 'gl') {
					title = 'Foto añadida correctamente';
				}

				this.loading = false;

				await Swal.fire({
					title: title,
					icon: 'success',
					showConfirmButton: false,
					timer: 1500
				});
				location.reload();
			} catch (error) {
				console.log(error.response);
			}
		},

		activeEditShopForm(index) {
			this.editIndex = index;
		},
		activeUploadImageForm(id) {
			this.imageId = id;
		}
	},
	async created() {
		this.data = await this.getData();
	}
};
</script>

<style scoped>
.shops {
	position: relative;
	min-height: 100vh;
	padding-bottom: 5rem;
}

main {
	width: 85%;
	margin: 2rem auto;
}

main > p {
	color: black;
	text-align: left;
	margin: 1rem 1rem 2rem;
}

nav {
	display: flex;
	justify-content: flex-start;
}

button {
	width: 12rem;
	height: 2.5rem;
	border: 0;
	border-radius: 1rem;
	background: #9dc48f;
	color: black;

	cursor: pointer;
}
</style>
