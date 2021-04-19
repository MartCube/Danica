<template>
	<div class="container">
		<template v-if="$fetchState.error"> error </template>
		<template v-else-if="$fetchState.pending"> loading </template>
		<template v-else>
			<div v-for="slice in slices" :key="slice.slice_type">
				<ServiceIntro v-if="slice.slice_type == 'serviceintro'" :data="slice" />
				<Values v-else-if="slice.slice_type == 'values'" :data="slice" />
				<Stages v-else-if="slice.slice_type == 'stages'" :data="slice" />
				<Standards v-else-if="slice.slice_type == 'standards'" :data="slice" />
				<Advantages v-else-if="slice.slice_type == 'advantages'" :data="slice" />
				<Charles v-else-if="slice.slice_type == 'charles'" :data="slice" />
				<LatestProjects v-else-if="slice.slice_type == 'latestprojects'" />
				<SliderProjects v-else-if="slice.slice_type == 'sliderprojects'" />
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'Service',
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('bindNavbarTransparent', false)
		next()
	},
	middleware: 'navbarTransparent',
	data: () => ({
		slices: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getByUID('services', this.$route.params.service)
		this.slices = fetch.data.body
	},
	fetchOnServer: false,
	mounted() {
		this.$store.dispatch('bindNavbarTransparent', true)
	},
}
</script>

<style lang="scss" scoped>
.container {
	padding: 0;
	margin-bottom: 80px;
}
</style>
