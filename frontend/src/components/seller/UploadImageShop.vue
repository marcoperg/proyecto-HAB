<template>
	<!-- This div has 3 analogous parts, english, spanish and galician -->
	<div>
		<div class="background" @click="cancel()"></div>
		<main v-if="lang==='en'">
			<button class="cancel" @click="cancel()"></button>

			<h2>Upload image</h2>
			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<label for="img">Select file</label>
				<input type="file" id="img" name="image" @change="img = e.target.file[0]" multiple />

				<button @click="uploadImage()">Upload</button>
			</form>
		</main>

		<main v-if="lang==='es'">
			<button class="cancel" @click="cancel()"></button>

			<h2>Subir imagen</h2>
			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<label for="img">Seleciona el archivo</label>
				<input type="file" id="img" name="image" @change="img = e.target.file[0]" multiple />

				<button @click="uploadImage()">Subir</button>
			</form>
		</main>

		<main v-if="lang==='gl'">
			<button class="cancel" @click="cancel()"></button>

			<h2>Subir imaxen</h2>
			<p class="error">{{error}}</p>

			<form @submit.prevent>
				<label for="img">Seleciona o arquivo</label>
				<input type="file" id="img" ref="img" multiple @change="handleFilesUpload()" />

				<button @click="uploadImage()">Subir</button>
			</form>
		</main>
	</div>
</template>

<script>
import Swal from 'sweetalert2';
import { changePassword, logout } from '../../auth';

export default {
	name: 'UploadImageShop',
	props: {
		id: Number,
		lang: String
	},
	data() {
		return {
			img: '',

			error: ''
		};
	},
	methods: {
		cancel() {
			this.$emit('cancel');
		},
		async uploadImage() {
			console.log(this.img);
			let formData = new FormData();

			for (let i = 0; i < this.img.length; i++) {
				let file = this.img[i];

				formData.append('files[' + i + ']', file);
			}

			this.$emit('upload', formData);
		},
		handleFilesUpload() {
			this.img = this.$refs.img.files;
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
	z-index: 10;
	background: rgba(0, 0, 0, 0.7);
}

main {
	position: fixed;
	top: calc(50% - 15rem);
	left: calc(50% - 11rem);
	z-index: 11;
	background: #dddddd;
	height: 20rem;
	width: 22rem;

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