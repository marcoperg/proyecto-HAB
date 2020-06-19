<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap');

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

#app {
	min-height: 100vh;

	font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
