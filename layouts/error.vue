<template>
	<div class="error">
		<div class="text">
			<h2>you are looking in a wrong place</h2>
			<ButtonItem :to="localePath('index')" :animated="false" > Go home </ButtonItem>
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
	max-height: 100vh;
	picture {
		position: absolute;
	}
	.text {
		z-index: 2;

		max-width: 300px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items:center;
		h2{
			margin-top: 2rem;
		}
		button{
			margin: 2rem 0 3rem;
		}
	}
}
</style>
