<template>
	<div class="container">
		
		<!-- <main> -->
		<template v-if="!$fetchState.pending">
			<IntroCollage :data="introCollage" />
			<Achievements :data="achievements" />
			<ServicesList :data="serviceList" />
			<HighlightProjects :data="HighlightProjects" />
		</template>
		<!-- </main> -->
	</div>
</template>

<script>
export default {
	name: 'Index',
	data: () => ({
		// components data
		introCollage: null,
		achievements: null,
		serviceList: null,
		HighlightProjects: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('home_index')

		this.introCollage = fetch.data.intro_collage
		this.achievements = fetch.data.achievements[0]
		this.serviceList = fetch.data.services_list[0]
		this.HighlightProjects = fetch.data.highlight_projects[0]
	},
}
</script>
