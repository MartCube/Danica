<template>
	<div class="container">
		<div class="intro">
			<div class="text">
				<h4>We are leaders in</h4>
				<h2>interior design</h2>
			</div>
			<div class="collage">
				<img class="first" :src="data.intro_collage[0].image.url" alt="danica" />
				<img class="second" :src="data.intro_collage[1].image.url" alt="danica" />
				<img class="third" :src="data.intro_collage[2].image.url" alt="danica" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		data: Object,
	}),
	async fetch() {
		const index = await this.$prismic.api.getSingle('index')
		this.data = {
			intro_collage: index.data.intro_collage,
		}
	},
	computed: {},
	methods: {},
}
</script>

<style lang="scss" scoped>
.intro {
	margin-left: 240px;

	height: calc(100vh - 80px);
	display: flex;
	.text {
		width: 25%;
		margin-top: 5%;

		display: flex;
		flex-direction: column;
		h4 {
			font-weight: 400;
			font-size: 4rem;
			line-height: 4rem;
			margin-bottom: 4rem;
		}
		h2 {
			text-transform: capitalize;
			font-size: 4rem;
		}
	}
	.collage {
		width: 900px;
		height: 100%;
		position: relative;
		img {
			border: 10px solid white;
		}
		.first {
			position: absolute;
			z-index: 3;
			bottom: 0;
			left: 0;
			width: 300px;
			height: 300px;
		}
		.second {
			position: absolute;
			z-index: 2;
			bottom: 0;
			left: 150px;
			width: 600px;
			height: 600px;
		}
		.third {
			position: absolute;
			z-index: 1;
			bottom: 100px;
			right: 0;
			width: 400px;
			height: 400px;
		}
	}
}
</style>
