<template>
	<!-- <div class="container"> -->
		<Error />
	<!-- </div> -->
</template>

<script>
// import Error from '~/components/global/Error.vue'
export default {
	name: '404',
	// components: { Error },
	async fetch() {
		await this.$prismic.api
			.getSingle('404', { lang: this.$i18n.localeProperties.prismic })
			.then(async (fetch) => {
				// send data to store
				await this.$store.dispatch('storeSingle', fetch)
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
