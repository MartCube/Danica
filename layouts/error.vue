<template>
	<div class="container error">
		<div class="text">
			<h2>you are swiming in the wrong watters</h2>
		</div>
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
	background: url('/error.jpg');
	.text {
	}
}
</style>
