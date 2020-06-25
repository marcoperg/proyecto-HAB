<template>
	<div>
		<menucustom />
		<header>
			<h1>Cart</h1>
		</header>

		<main></main>
		<footercustom />
	</div>
</template>

<script>
import { getHeader } from '../../auth';

// Import modules
import axios from 'axios';
import Swal from 'sweetalert2';

// Components
import menucustom from '@/components/MenuCustom.vue';
import footercustom from '@/components/FooterCustom.vue';
import plateview from '@/components/client/PlateView.vue';

export default {
	name: 'Cart',
	components: {
		menucustom,
		footercustom,
		plateview
	}
};
</script>

<style scoped>
</style>