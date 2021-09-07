<template>
	<div class="container">
		<template v-if="!$fetchState.pending">
			<div v-for="slice in data.body" :key="slice.slice_type">
				<HomeIntro v-if="slice.slice_type == 'home_intro'" :data="slice" />
				<Achievements v-else-if="slice.slice_type == 'achievements'" :data="slice" />
				<LazyServicesList v-else-if="slice.slice_type == 'services_list'" :data="slice" />
				<LazyHighlightProjects v-else-if="slice.slice_type == 'highlight_projects'" :data="slice" />
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'Index',
	data: () => ({
		data: [],
	}),
	async fetch() {
		await this.$prismic.api
			.getSingle('home_index', { lang: this.$i18n.localeProperties.prismic })
			.then(async (fetch) => {
				// send data to store
				await this.$store.dispatch('storeSingle', fetch)
				// save data to component
				this.data = fetch.data
			})
			.catch((error) => {
				console.log(error)
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('home page not found')
			})
	},
	head() {
		return this.$store.getters.page.head
	},
	// watch: {
	// 	'$route.path': '$fetch',
	// },
}
</script>
