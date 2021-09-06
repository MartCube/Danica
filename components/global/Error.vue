<template>
	<div class="error">
		<div class="text">
			<h2>4<span>0</span>4</h2>
			<n-link :to="localePath('index')">
				{{ $t('service.form.button_tohome') }}
			</n-link>
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
		z-index: 1;
	}
	.text {
		max-width: 400px;
		display: flex;
		flex-direction: column;
		z-index: 4;

		h2 {
			font-size: 8rem;
			span {
				font-size: inherit;
				font-weight: inherit;
				color: $primary;
			}
		}

		a {
			margin: 40px auto;
		}
	}
}
</style>
