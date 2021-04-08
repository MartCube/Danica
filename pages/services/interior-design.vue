<template>
	<div class="design">
		<template v-if="!$fetchState.pending">
			<!-- Slice Machine -->
			<div v-for="slice in slices" :key="slice.slice_type">
				<ServiceIntro v-if="slice.slice_type == 'serviceintro'" :data="slice" />
				<Charles v-else-if="slice.slice_type == 'charles'" :data="slice" />
				<template v-else-if="slice.slice_type == 'stages'">
					<Stages :data="slice" />
					<LatestProjects />
				</template>
				<Advantages v-else-if="slice.slice_type == 'advantages'" :data="slice" />
			</div>
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
		slices: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('service_design')
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
