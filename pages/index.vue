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
	async asyncData({ $prismic, i18n }) {
		// fetch  page
		const page = await $prismic.api.getSingle('home_index', { lang: i18n.localeProperties.prismic })

		// define data
		return {
			metaTags: {
				title: page.data.meta_title,
				description: page.data.meta_description,
				keywords: page.data.meta_keywords,
			},
			slices: page.data.body,
		}
	},
	head() {
		return {
			title: this.metaTags.title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.metaTags.description,
				},
			],
		}
	},
}
</script>
