<template>
	<div>
		<h2 v-show="lang === 'en'">Call to waiter</h2>
		<h2 v-show="lang === 'es'">Llamada al camarero</h2>
		<h2 v-show="lang === 'gl'">Chamada al camarero</h2>

		<p v-show="lang === 'en'">Table: {{ data.tableNumber }}</p>
		<p v-show="lang === 'es'">Mesa: {{ data.tableNumber }}</p>
		<p v-show="lang === 'gl'">Mesa: {{ data.tableNumber }}</p>
	</div>
</template>

<script>
export default {
	name: 'WaiterNotification',
	props: {
		data: Object,
		lang: String
	}
};
</script>

<style scoped>
h2 {
	text-align: left;
	margin-bottom: 1rem;
}

div {
	padding: 0.5rem;
	margin: 0 auto;
	width: 18rem;
	border: 1px solid black;
	border-radius: 0.4rem;
}
</style>
