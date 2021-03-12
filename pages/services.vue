<template>
	<div class="services">
		<IntroImage v-if="!$fetchState.pending" :image="IntroImage" />
		<Charles :data="charles" />
		<LatestProjects />
	</div>
</template>

<script>
export default {
	name: 'Services',
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('bindNavbarTransparent', false)
		next()
	},
	middleware: 'navbar',
	data: () => ({
		IntroImage: null,
		charles: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('service_design')
		this.IntroImage = fetch.data.image
		this.charles = fetch.data.charles_eames[0]
	},
	mounted() {
		this.$store.dispatch('bindNavbarTransparent', true)
	},
}
</script>

<style lang="scss" scoped>
.services {
	min-height: 100vh;
}
</style>
