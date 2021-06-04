<template>
	<div class="container">
		<div v-for="slice in slices" :key="slice.slice_type">
			<HomeIntro v-if="slice.slice_type == 'home_intro'" :data="slice" />
			<Achievements v-else-if="slice.slice_type == 'achievements'" :data="slice" />
			<ServicesList v-else-if="slice.slice_type == 'services_list'" :data="slice" />
			<HighlightProjects v-else-if="slice.slice_type == 'highlight_projects'" :data="slice" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Index',
	async asyncData({ i18n, store }) {
		await store.dispatch('storeSingle', {
			type: 'home_index',
			language: i18n.localeProperties.prismic,
		})
		return {
			slices: store.getters.page.data.body,
		}
	},
	head() {
		return this.$store.getters.page.head
	},
}
</script>
