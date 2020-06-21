<template>
	<div>
		<menucustom />
		<sellermenu />

		<footercustom />
	</div>
</template>

<script>
// Get components
import menucustom from '@/components/MenuCustom.vue';
import footercustom from '@/components/FooterCustom.vue';
import sellermenu from '@/components/seller/SellerMenu.vue';

export default {
	name: 'SellerPlates',
	components: {
		menucustom,
		footercustom,
		sellermenu
	}
};
</script>

<style scoped>
</style>