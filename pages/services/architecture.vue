<template>
	<div class="architecture">
		<template v-if="!$fetchState.pending">
			<IntroImage :image="IntroImage" />
			<Values :data="values" />
			<LatestProjects />
			<Standards :data="standards" />

			<!-- Slice Machine -->
			<div v-for="(slice, i) in slices" :key="i">
				<Stages v-if="slice.slice_type == 'stages'" :data="slice" />
				<Advantages v-if="slice.slice_type == 'advantages'" :data="slice" />
			</div>
		</template>
	</div>
</template>

<script>
import Standards from '~/components/sections/Standards.vue'
export default {
	name: 'Architecture',
	components: { Standards },
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('bindNavbarTransparent', false)
		next()
	},
	middleware: 'navbar',
	data: () => ({
		IntroImage: null,
		values: null,
		standards: null,
		slices: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('service_architecture')
		this.IntroImage = fetch.data.image
		this.values = fetch.data.values[0]
		this.standards = fetch.data.standards
		this.slices = fetch.data.body
	},
	mounted() {
		this.$store.dispatch('bindNavbarTransparent', true)
	},
}
</script>

<style lang="scss" scoped>
.architecture {
	min-height: 100vh;
}
</style>
