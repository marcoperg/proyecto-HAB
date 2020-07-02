<template>
	<div class="about">
		<vue-headful v-if="lang === 'en'" title="About us | Lastorder" description="Home page of hackamarket" />
		<vue-headful v-if="lang === 'es'" title="Sobre nosotros | Lastorder" description="Home page of hackamarket" />
		<vue-headful v-if="lang === 'gl'" title="Sobre nós | Lastorder" description="Home page of hackamarket" />

		<menucustom />

		<h1>This is an about page</h1>
	</div>
</template>

<script>
// Components
import menucustom from '@/components/MenuCustom.vue';

export default {
	name: 'About',
	components: {
		menucustom
	}
};
</script>

<style scoped></style>
