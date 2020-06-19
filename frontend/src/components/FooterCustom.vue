<template>
	<footer>
		<p>(c) Marco Pérez González - 2020</p>
	</footer>
</template>

<script>
export default {
	name: 'FooterCustom'
};
</script>

<style scoped>
footer {
	position: absolute;
	width: 100%;
	height: 80px;
	bottom: 0;
	z-index: -1;
	color: black;

	background: #c4c4c4;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>