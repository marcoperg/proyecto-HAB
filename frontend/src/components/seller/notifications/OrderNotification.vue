<template>
	<div>
		<main>
			<h2 v-show="lang === 'en'">Order</h2>
			<h2 v-show="lang === 'es'">Pedido</h2>
			<h2 v-show="lang === 'gl'">Pedido</h2>
			<br />
			<h2 v-show="lang === 'en'">Table: {{ data.tableNumber }}</h2>
			<h2 v-show="lang === 'es'">Mesa: {{ data.tableNumber }}</h2>
			<h2 v-show="lang === 'gl'">Mesa: {{ data.tableNumber }}</h2>

			<ul>
				<li v-for="plate in data.plates" :key="plate.id">
					<h4>x {{ plate.ammount }}</h4>

					<figure v-if="plate.photo" :style="{ 'background-image': `url(${imgUrl + plate.photo})` }"></figure>
					<figure v-if="!plate.photo"></figure>

					<h3>{{ plate.name }}</h3>
				</li>
			</ul>
		</main>
	</div>
</template>

<script>
export default {
	name: 'OrderNotification',
	props: {
		data: Object,
		lang: String
	},
	data() {
		return {
			imgUrl: process.env.VUE_APP_BACKEND_URL + '/uploads/'
		};
	}
};
</script>

<style scoped>
main {
	margin: 1rem auto;
	width: 70%;
	border-radius: 0.4rem;
	border: 1px solid black;
}

ul {
	list-style: none;
	display: flex;

	flex-wrap: wrap;
	justify-content: center;
	max-width: 100%;
	margin: 0 auto;
}

li {
	border: 1px solid #bfbfbf;
	box-shadow: 0.2px 0.2px 0.2px #aaaaaa;
	background: white;
	margin: 1rem;
	height: 200px;
	width: 160px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
}

figure {
	height: 158px;
	width: 100%;

	background-image: url('../../../assets/icons/food.png');
	background-size: cover;
	background-repeat: no-repeat;
}

li h4 {
	background: #4c9141;
	padding: 5px;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 1;
}
</style>
