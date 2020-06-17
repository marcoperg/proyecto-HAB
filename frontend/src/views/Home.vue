<template>
	<div class="home">
		<menucustom />
		{{home}}
	</div>
</template>

<script>
// Components
import menucustom from '@/components/MenuCustom.vue';

export default {
	name: 'Home',
	components: {
		menucustom
	},
	data() {
		return {
			home: process.env.VUE_APP_BACKEND_URL
		};
	}
};
</script>
