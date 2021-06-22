<template>
	<div class="container">
		<template v-if="!$fetchState.pending">
			<div v-for="slice in slices" :key="slice.slice_type">
				<HomeIntro v-if="slice.slice_type == 'home_intro'" :data="slice" />
				<Achievements v-else-if="slice.slice_type == 'achievements'" :data="slice" />
				<ServicesList v-else-if="slice.slice_type == 'services_list'" :data="slice" />
				<HighlightProjects v-else-if="slice.slice_type == 'highlight_projects'" :data="slice" />
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'Index',
	// async asyncData({ i18n, store }) {
	// 	await store.dispatch('storeSingle', {
	// 		type: 'home_index',
	// 		language: i18n.localeProperties.prismic,
	// 	})
	// 	return {
	// 		slices: store.getters.page.data.body,
	// 	}
	// },
	async fetch() {
		await this.$store.dispatch('storeSingle', {
			type: 'home_index',
			language: this.$i18n.localeProperties.prismic,
		})
		this.slices = this.$store.getters.page.data.body
	},
	watch: {
		'$route.query':'$fetch',
	},
	data: () => ({
		slices: []
	}),
	head() {
		return this.$store.getters.page.head
	},
}
</script>
