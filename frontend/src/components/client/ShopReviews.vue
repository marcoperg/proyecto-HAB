<template>
	<div class="comments">
		<header>
			<h1>
				<span v-show="lang==='en'">Reviews</span>
				<span v-show="lang==='es'">Opiniones</span>
				<span v-show="lang==='gl'">Opinións</span>

				<span class="number">({{numberOfReviews}})</span>
			</h1>
			<button @click="write()">
				<span v-show="lang==='en'">Write a review</span>
				<span v-show="lang==='es'">Escribir una opinión</span>
				<span v-show="lang==='gl'">Escribir unha opinión</span>
			</button>
		</header>

		<div class="comment" v-for="review in reviews" :key="review.id">
			<div class="user">
				<div
					v-if="review.avatar"
					class="img"
					:style="{'background-image': `url(${imgUrl + review.avatar})`}"
				></div>
				<div class="img" v-if="!review.avatar"></div>
				<p>{{review.nick}}</p>
			</div>

			<div class="content">
				<div>
					<starrate :rate="review.rating" />
					<p>{{formatDate(review.date)}}</p>
				</div>

				<p>{{review.comment}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import dateFormat from 'dateformat';

import starrate from '@/components/StarRate.vue';

export default {
	name: 'ShopReviews',
	components: {
		starrate
	},
	props: {
		reviews: Array,
		numberOfReviews: Number,
		lang: String
	},
	data() {
		return {
			imgUrl: process.env.VUE_APP_BACKEND_URL + '/uploads/'
		};
	},
	methods: {
		write() {
			this.$emit('write');
		},
		formatDate(date) {
			return dateFormat(date, 'mm/dd/yyyy');
		}
	}
};
</script>

<style scoped>
.comments {
	width: 800px;
	margin: 0 auto;

	border: 1px solid #bfbfbf;
	background: white;
	box-shadow: 0.2px 0.2px 0.2px #aaaaaa;
	border-radius: 10px;

	padding: 1rem;
}

header {
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid black;
	padding: 0.5rem;
}

header h1 span.number {
	margin-left: 1rem;
	color: grey;
}

button {
	background: black;
	border: 0;
	font-weight: bold;
	color: white;
	padding: 10px;
	border-radius: 0.4em;
	cursor: pointer;
}

.comment {
	display: grid;
	grid-template-columns: 100px 1fr;
	margin: 8px 1rem;
	padding: 8px 0;
	border-top: 1px solid lightgrey;
}

.user {
	margin: 0 auto;
}

.img {
	width: 72px;
	height: 72px;
	border-radius: 100%;
	border: 1px solid black;
	background-image: url('../../assets/icons/user.png');
	background-size: cover;
}

.content div {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-items: center;
}

.content div p {
	margin-left: 1.5rem;
}

.content > p {
	text-align: start;
}

@media (max-width: 600px) {
	.comments {
		width: 100%;
	}

	.comment {
	}
}
</style>