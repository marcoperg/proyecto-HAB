<template>
	<div>
		<div class="background" @click="cancel()"></div>

		<main>
			<button class="cancel" @click="cancel()"></button>

			<figure
				class="big"
				v-if="plate.photos.length"
				:style="{ 'background-image': `url(${imgUrl + plate.photos[imgSelector].name})` }"
			>
				<button @click="leftImg()" class="left"></button>
				<button @click="rightImg()" class="right"></button>

				<p v-show="plate.photos.length">{{ imgSelector + 1 }} / {{ plate.photos.length }}</p>
			</figure>

			<figure class="big" v-if="!plate.photos.length"></figure>

			<h1>{{ plate.name }}</h1>
			<p>{{ plate.description }}</p>

			<nav>
				<div>
					<button @click="decreaseAmmount()" class="number">-</button>
					<p>{{ ammount }}</p>
					<button @click="increaseAmmount" class="number">+</button>
				</div>

				<button @click="add" class="add">
					<span v-show="lang === 'en'">Add {{ ammount }} to cart</span>
					<span v-show="lang === 'es'">Añadir {{ ammount }} al carrito</span>
					<span v-show="lang === 'gl'">Añadir {{ ammount }} ao carrito</span>
					<p>{{ ammount * plate.prize }} €</p>
				</button>
			</nav>
		</main>
	</div>
</template>

<script>
export default {
	name: 'PlateView',

	props: {
		plate: Object,
		lang: String,
		imgUrl: String
	},
	data() {
		return {
			imgSelector: 0,
			ammount: 1
		};
	},
	methods: {
		add() {
			this.$emit('add', { plate_id: this.plate.id, ammount: this.ammount });
		},

		cancel() {
			this.$emit('cancel');
		},

		decreaseAmmount() {
			if (this.ammount >= 1) {
				this.ammount--;
			}
		},

		increaseAmmount() {
			if (this.ammount < 100) {
				this.ammount++;
			}
		},

		leftImg() {
			if (this.plate.photos[this.imgSelector - 1]) {
				this.imgSelector--;
			} else if (this.imgSelector === 0) {
				this.imgSelector = this.plate.photos.length - 1;
			}
		},
		rightImg() {
			if (this.plate.photos[this.imgSelector + 1]) {
				this.imgSelector++;
			} else if (this.imgSelector === this.plate.photos.length - 1) {
				this.imgSelector = 0;
			}
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
	top: calc(50% - 25rem);
	left: calc(50% - 20rem);
	z-index: 10;
	background: white;
	height: auto;
	width: 40rem;
}

h1 {
	font-weight: 500;
	margin: 1rem;
	text-align: start;
}

p {
	margin: 1rem;
	text-align: start;
}

nav {
	display: grid;
	grid-template-columns: auto 1fr;
}

button {
	margin: 1rem;
	width: 90%;
	height: 3rem;
	background: black;
	border: 0;
	font-weight: bold;
	font-size: 1.1rem;
	color: white;
	padding: 10px;
	border-radius: 0.4em;
	cursor: pointer;

	display: flex;
	align-items: center;
}

button span {
	width: 350px;
}

button.number {
	width: 3rem;
	height: 3rem;
	border-radius: 100%;
	font-size: 1.3rem;
	color: black;
	background: rgb(192, 192, 192);
	justify-content: center;
}

nav div {
	margin: 0 auto;
	display: flex;
	align-content: center;
}

nav p {
	margin: auto 0;
}

button.cancel {
	position: absolute;
	top: 5px;
	left: 5px;
	z-index: 11;

	width: 45px;
	height: 45px;
	border-radius: 100%;
	margin: 0;
	background-color: white;
	background-image: url('../../assets/icons/close.png');
	background-size: 15px 15px;
	background-position: center;
	background-repeat: no-repeat;
}

@media (max-width: 600px) {
	main {
		top: 20px;
		left: calc(50% - 155px);
		width: 310px;
		padding-bottom: 0.5rem;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
	}

	nav button span {
		width: 230px;
	}

	button.add {
		margin: 0.1rem auto;
		width: 95%;
	}
}
</style>

<style scoped src="@/styles/gallery.css"></style>
