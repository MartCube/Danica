<template>
	<div class="container">
		<template v-if="$fetchState.error">error</template>
		<template v-else-if="!$fetchState.pending">
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
	data: () => ({
		slices: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('home_index', { lang: this.$i18n.localeProperties.prismic })
		this.slices = fetch.data.body
	},
}
</script>
