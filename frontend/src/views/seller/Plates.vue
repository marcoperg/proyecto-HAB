<template>
	<div class="plates">
		<vue-headful v-if="lang === 'en'" title="Plates and menu | Lastorder" description="Home page of hackamarket" />
		<vue-headful v-if="lang === 'es'" title="Platos y menús | Lastorder" description="Home page of hackamarket" />
		<vue-headful v-if="lang === 'gl'" title="Pratos e menús | Lastorder" description="Home page of hackamarket" />

		<menucustom />

		<sellermenu />
		<main>
			<ul>
				<li v-for="(shop, index) in shops" :key="shop.id">
					<div>
						<h1>· {{ shop.name }}</h1>
						<button @click="toggleMenu(index)" :class="{ active: showMenu[index] }"></button>
					</div>

					<div v-show="showMenu[index]">
						<nav>
							<button
								@click="
									add = true;
									dataProp.shopIndex = index;
								"
							>
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
							v-on:duplicate="activeDuplicateForm"
						/>
					</div>
				</li>
			</ul>

			<addform
				v-if="add"
				:dataProp="dataProp"
				:shops="shops"
				v-on:add="addPlate"
				v-on:cancel="
					add = false;
					dataProp = {};
				"
				:lang="lang"
			/>

			<editform v-if="edit" v-on:edit="editPlate" v-on:cancel="edit = false" :lang="lang" :dataProp="dataProp" />

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
			add: null,
			edit: false,
			dataProp: {},
			imageId: null,
			showMenu: []
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
				data.prize = Number(data.prize);

				data.id_shop = this.shops[data.shopIndex].id;
				delete data.shopIndex;
				delete data.photos;
				delete data.id;

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
			const originalData = this.dataProp;
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

			await Swal.fire({
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
			this.dataProp = data;
			this.edit = true;
		},
		activeUploadImageForm(id) {
			this.imageId = id;
		},
		activeDuplicateForm(data) {
			this.add = true;
			this.dataProp = data;
		},
		toggleMenu(index) {
			this.$set(this.showMenu, index, !this.showMenu[index]);
		}
	},
	async created() {
		this.shops = await this.getRestaurants();

		for (let i = 0; i < this.shops.length; i++) {
			this.showMenu[i] = true;
		}
	}
};
</script>

<style scoped>
.plates {
	position: relative;
	min-height: 100vh;
	padding-bottom: 5rem;
	color: black;
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
	background: #9dc48f;

	cursor: pointer;
}

li div:first-child {
	display: flex;
	min-width: 200px;
}

li div:first-child button {
	margin: 0 0 0 1rem;
	font-size: 2rem;
	background: 0;
	width: 2rem;
	cursor: pointer;
	background-image: url('../../assets/icons/arrow.png');
	background-size: 25px;
	background-repeat: no-repeat;
	background-position: center;
}

li div:first-child button:focus {
	outline: none;
}

li div:first-child button.active {
	transform: rotate(180deg);
}
</style>
