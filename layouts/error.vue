<template>
	<div class="error">
		<div class="text">
			<h2>you are swiming in the wrong watters</h2>
		</div>
		<ImageItem v-if="!$fetchState.pending" :src="image" alt="error" />
	</div>
</template>

<script>
export default {
	data: () => ({
		image: null,
	}),
	async fetch() {
		const error = await this.$prismic.api.getSingle('error')
		this.image = error.data.image.url
	},
}
</script>

<style lang="scss" scoped>
.error {
	width: 100%;
	height: 1200px;
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;
	img {
		position: absolute;
	}
	.text {
		z-index: 2;

		max-width: 300px;
		display: flex;
		flex-direction: column;
	}
}
</style>
