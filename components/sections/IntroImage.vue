<template>
	<div class="intro_image">
		<ImageItem v-if="!$fetchState.pending" :src="image.url" :alt="image.alt" />
	</div>
</template>

<script>
export default {
	data: () => ({
		image: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('service_design')
		this.image = fetch.data.image
	},
}
</script>

<style lang="scss" scoped>
.intro_image {
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;
	img {
		position: absolute;
	}
}
</style>
