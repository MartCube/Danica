<template>
	<div class="container">
		<template v-if="!$fetchState.pending">
			<IntroCollage :data="introCollage" />
			<Achievements :data="achievements" />
			<ServicesList :data="serviceList" />
			<HighlightProjects />
		</template>
	</div>
</template>

<script>
export default {
	name: 'Index',
	data: () => ({
		introCollage: null,
		achievements: null,
		serviceList: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('home_index')

		this.introCollage = fetch.data.intro_collage
		this.achievements = fetch.data.achievements[0]
		this.serviceList = fetch.data.services_list[0]
	},
}
</script>
