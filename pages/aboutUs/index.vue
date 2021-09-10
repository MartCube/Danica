<template>
	<div class="container about_us">
		<template v-if="$fetchState.error">
			<Error />
		</template>
		<template v-if="!$fetchState.pending">
			<Title :value="data.title" />
			<div class="main_text">
				<p>{{ data.summary[0].text }}</p>
			</div>
			<div v-for="slice in data.body" :key="slice.slice_type">
				<Quote v-if="slice.slice_type == 'quote'" :data="slice" />
				<!-- <Achievements v-else-if="slice.slice_type == 'achievements'" :data="slice" />
				<LazyServicesList v-else-if="slice.slice_type == 'services_list'" :data="slice" />
				<LazyHighlightProjects v-else-if="slice.slice_type == 'highlight_projects'" :data="slice" /> -->
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'AboutUs',

	data: () => ({
		data: [],
		slices: [],
	}),
	async fetch() {
		await this.$prismic.api
			.getSingle('about_us', { lang: this.$i18n.localeProperties.prismic })
			.then(async (fetch) => {
				// send data to store
				await console.log(fetch.data.body)
				await this.$store.dispatch('storeSingle', fetch)
				this.data = fetch.data
				// this.slices = fetch.body
			})
			.catch((error) => {
				console.log(error)
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('about us page not found')
			})
	},
	head() {
		return this.$store.getters.page.head
	},
	computed: {
		// blogPosts() {
		// 	return this.$store.getters.blogPosts
		// },
	},
	watch: {
		// async blogPosts(newValue, oldValue) {
		// 	await this.$nextTick()
		// 	// postAnim(this.$refs.grid.children, true)
		// },
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
.about_us {
	.main_text{
		margin-left: 256px;
		max-width: 40vw;
	}
}
@media (min-width: 1900px) {
}
// @media (min-width: 1700px) {}
@media (max-width: 1300px) {}
@media (max-width: 960px) {

}
@media (max-width: 900px) {

}
</style>
