<template>
	<div class="home">{{home}}</div>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			home: process.env.VUE_APP_BACKEND_URL
		};
	}
};
</script>
