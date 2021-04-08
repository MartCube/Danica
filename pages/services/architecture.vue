<template>
	<div class="architecture">
		<template v-if="!$fetchState.pending">
			<!-- <SliderProjects /> -->

			<!-- Slice Machine -->
			<div v-for="slice in slices" :key="slice.slice_type">
				<ServiceIntro v-if="slice.slice_type == 'serviceintro'" :data="slice" />
				<Values v-if="slice.slice_type == 'values'" :data="slice" />
				<Stages v-if="slice.slice_type == 'stages'" :data="slice" />
				<Standards v-if="slice.slice_type == 'standards'" :data="slice" />
				<Advantages v-if="slice.slice_type == 'advantages'" :data="slice" />
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'Architecture',
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('bindNavbarTransparent', false)
		next()
	},
	middleware: 'navbar',
	data: () => ({
		slices: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('service_architecture')
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
