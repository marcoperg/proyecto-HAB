<template>
	<div class="shops">
		<menucustom />
		<sellermenu />

		<main>
			<nav>
				{{imageId}}
				<button @click="addForm = true">
					<p v-show="lang === 'en'">Add a new shop</p>
					<p v-show="lang === 'es'">Añadir una nueva tienda</p>
					<p v-show="lang === 'gl'">Añadir unha nova tenda</p>
				</button>
			</nav>

			<shopcards
				:shops="data"
				:lang="lang"
				v-on:remove="removeShop"
				v-on:edit="activeEditShopForm"
				v-on:addPhoto="activeUploadImageForm"
			/>
			<addform v-show="addForm" v-on:ad="addShop" v-on:cancel="addForm = false" :lang="lang" />

			<editform
				v-if="editIndex !== null"
				v-on:edit="editShop"
				v-on:cancel="editIndex = null"
				:lang="lang"
				:dataProp="{...data[editIndex]}"
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
import shopcards from '@/components/seller/ShopCards.vue';
import addform from '@/components/seller/AddShopForm.vue';
import editform from '@/components/seller/EditShopForm.vue';
import uploadimage from '@/components/seller/UploadImageShop.vue';

export default {
	name: 'SellerShops',
	components: {
		menucustom,
		footercustom,
		sellermenu,
		shopcards,
		addform,
		editform,
		uploadimage
	},
	data() {
		return {
			data: [],
			addForm: false,
			editIndex: null,
			imageId: null
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
				const sellerId = getUserInfo().id;
				const data = await axios.get(process.env.VUE_APP_BACKEND_URL + `/seller/${sellerId}/shops/`, {
					headers: getHeader()
				});

				console.log(data.data.data);
				return data.data.data;
			} catch (e) {
				console.log(e.response);
			}
		},

		async addShop(data) {
			try {
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
						await axios.delete(process.env.VUE_APP_BACKEND_URL + '/shops/' + id, {
							headers: getHeader()
						});
						location.reload();
					}
				});
			} catch (error) {
				console.log(error.response);
			}
		},

		async editShop(data) {
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

nav {
	display: flex;
	justify-content: flex-start;
}

button {
	width: 12rem;
	height: 2.5rem;
	border: 0;
	border-radius: 1rem;
	background: #c4c4c4;

	cursor: pointer;
}
</style>