<template>
	<nav class="stars">
		<div>
			<span :class="{active: rate >= 1}">★</span>
			<span :class="{active: rate >= 2}">★</span>
			<span :class="{active: rate >= 3}">★</span>
			<span :class="{active: rate >= 4}">★</span>
			<span :class="{active: rate >= 5}">★</span>
		</div>
		<p v-show="rate !== null">{{round(rate, 1)}}</p>

		<p v-show="rate === null">---</p>
	</nav>
</template>

<script>
export default {
	name: 'StarRate',
	props: { rate: Number },
	methods: {
		round(value, decimals) {
			if (value) {
				return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
			}
		}
	}
};
</script>

<style scoped>
/* <STAR RATES STYLES> */
nav.stars {
	display: flex;

	justify-content: flex-start;
	align-items: center;
}

nav.stars p {
	font-size: 1.2rem;
	margin-left: 5px;
}

.stars span {
	font-size: 1.5rem;
}

.stars .active {
	color: lightgreen;
}

nav p {
	font-size: 2rem;
}

button p {
	font-size: 1rem;
}

button {
	font-weight: bold;
	background: #717171;
	border: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
	height: 33px;
	width: 120px;

	cursor: pointer;
}

button:focus {
	outline: none;
}
/* </STAR RATES STYLES> */
</style>