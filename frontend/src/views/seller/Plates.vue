<template>
	<div class="plates">
		<menucustom />
		<sellermenu />

		<main>
			<ul>
				<li v-for="(shop, index) in shops" :key="shop.id">
					<h1>· {{shop.name}}:</h1>

					<nav>
						<button @click="addForm = shop.id">
							<p v-show="lang === 'en'">Add a new plate to this menu</p>
							<p v-show="lang === 'es'">Añadir un nuevo plato a este menu</p>
							<p v-show="lang === 'gl'">Añadir un novo prato a este menu</p>
						</button>
					</nav>

					<platescards
						:shopId="shop.id"
						:shopIndex="index"
						:lang="lang"
						v-on:remove="removePlate"
						v-on:edit="activeEditPlateForm"
						v-on:addPhoto="activeUploadImageForm"
					/>
				</li>
			</ul>

			<addform v-if="addForm !== null" v-on:add="addPlate" v-on:cancel="addForm = null" :lang="lang" />

			<editform
				v-if="edit"
				v-on:edit="editPlate"
				v-on:cancel="editIndex = null"
				:lang="lang"
				:dataProp="editData"
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

import platescards from '@/components/seller/plates/PlatesCards.vue';
import editform from '@/components/seller/plates/EditPlateForm.vue';
import addform from '@/components/seller/plates/AddPlateForm.vue';
import uploadimage from '@/components/seller/UploadImage.vue';

export default {
	name: 'SellerPlates',
	components: {
		menucustom,
		footercustom,
		sellermenu,
		platescards,
		uploadimage,
		addform,
		editform
	},
	data() {
		return {
			shops: [],
			addForm: null,
			edit: false,
			editData: null,
			imageId: null
		};
	},
	computed: {
		lang() {
			return this.$route.params.lang;
		}
	},
	methods: {
		async getRestaurants() {
			try {
				const sellerId = getUserInfo().id;
				const data = await axios.get(process.env.VUE_APP_BACKEND_URL + `/seller/${sellerId}/shops/`, {
					headers: getHeader()
				});

				return data.data.data;
			} catch (e) {
				console.log(e.response);
			}
		},

		async addPlate(data) {
			try {
				data.id_shop = this.addForm;
				data.prize = Number(data.prize);
				console.log(data);

				await axios.post(process.env.VUE_APP_BACKEND_URL + '/plate', data, {
					headers: getHeader()
				});

				let title = '';

				if (this.lang === 'en') {
					title = 'Plate added successfully';
				} else if (this.lang === 'es') {
					title = 'Plate añadido correctamente';
				} else if (this.lang === 'gl') {
					title = 'Plate añadido correctamente';
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

		async removePlate(id) {
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
						await axios.delete(process.env.VUE_APP_BACKEND_URL + '/plate/' + id, {
							headers: getHeader()
						});
						location.reload();
					}
				});
			} catch (error) {
				console.log(error.response);
			}
		},

		async editPlate(data) {
			const originalData = this.editData;
			clean(data);
			removeUnchanged(data, originalData);

			const url = process.env.VUE_APP_BACKEND_URL + '/plate/' + originalData.id;

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
				const url = process.env.VUE_APP_BACKEND_URL + '/plate/' + this.imageId;

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

		activeEditPlateForm(data) {
			console.log(data);
			this.editData = data;
			this.edit = true;
		},
		activeUploadImageForm(id) {
			this.imageId = id;
		}
	},
	async created() {
		this.shops = await this.getRestaurants();
	}
};
</script>

<style scoped>
.plates {
	position: relative;
	min-height: 100vh;
	padding-bottom: 5rem;
}

main {
	width: 85%;
	margin: 2rem auto;
}

ul {
	list-style: none;
}

li {
	margin-bottom: 2rem;
}

h1 {
	text-align: start;
}

nav {
	margin-left: 3rem;
	margin-bottom: 2rem;
	display: flex;
	justify-content: flex-start;
}

button {
	width: 12rem;
	height: 3rem;
	border: 0;
	border-radius: 1rem;
	background: #c4c4c4;

	cursor: pointer;
}
</style>