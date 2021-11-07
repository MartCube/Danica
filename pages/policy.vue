<template>
	<div class="container">
		<div v-for="(slice, i) in slices" :key="i" class="slice" :class="slice.slice_type">
			<h3 class="title">{{ $prismic.asText(slice.primary.title) }}</h3>
			<prismic-rich-text class="rich_text" :field="slice.primary.text" />
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		slices: [],
	}),
	async fetch() {
		await this.$prismic.api
			.getSingle('policy', { lang: this.$i18n.localeProperties.prismic })
			.then(async (fetch) => {
				// send data to store
				await this.$store.dispatch('storeSingle', fetch)
				this.slices = fetch.data.body
			})
			.catch((error) => {
				console.log(error)
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('policy page not found')
			})
	},
	head() {
		return this.$store.getters.page.head
	},
}
</script>

<style lang="scss" scoped>
.container {
	margin-left: 240px;
	margin-top: 120px;
	padding: 0 0 40px 1rem;
	border-left: 1px solid $line;
	&::after {
		display: none;
	}
	.slice {
		.title {
			margin: 40px 0;
			text-transform: uppercase;
		}
		.rich_text {
			width: 80%;
		}
	}
}
@media (max-width: 900px) {
	.container {
		margin-left: 45px;
		margin-top: 30px;
	}
}
</style>
