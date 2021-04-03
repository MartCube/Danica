<template>
	<div class="design">
		<template v-if="!$fetchState.pending">
			<Intro :image="IntroImage" />
			<Charles :data="charles" />

			<!-- Slice Machine -->
			<div v-for="(slice, i) in slices" :key="i">
				<Stages v-if="slice.slice_type == 'stages'" :data="slice" />
				<Advantages v-if="slice.slice_type == 'advantages'" :data="slice" />
			</div>
			<LatestProjects />
		</template>
	</div>
</template>

<script>
export default {
	name: 'Design',
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('bindNavbarTransparent', false)
		next()
	},
	middleware: 'navbar',
	data: () => ({
		IntroImage: null,
		charles: null,
		slices: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('service_design')
		this.IntroImage = fetch.data.image
		this.charles = fetch.data.charles_eames[0]
		this.slices = fetch.data.body
	},
	mounted() {
		this.$store.dispatch('bindNavbarTransparent', true)
	},
}
</script>

<style lang="scss" scoped>
.design {
	min-height: 100vh;
}
</style>
