<template>
	<div class="container">
		<template v-if="!$fetchState.pending">
			<div v-for="slice in slices" :key="slice.slice_type">
				<LazyHomeIntro v-if="slice.slice_type == 'home_intro'" :data="slice" />
				<LazyAchievements v-else-if="slice.slice_type == 'achievements'" :data="slice" />
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
		slices: [],
	}),
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
	head() {
		return this.$store.getters.page.head
	},
	watch: {
		'$route.path': '$fetch',
	},
}
</script>
