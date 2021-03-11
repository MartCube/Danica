<template>
	<div class="services">
		<IntroImage v-if="!$fetchState.pending" :image="IntroImage" />
		<LatestProjects />
		<div class="charles">
			<ImageItem :src="charles_eames.charles_top.url" alt="charles eames" />
		</div>
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
		charles_eames: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('service_design')
		this.IntroImage = fetch.data.image
		this.charles_eames = fetch.data.charles_eames[0]
	},
	mounted() {
		this.$store.dispatch('bindNavbarTransparent', true)
	},
}
</script>

<style lang="scss" scoped>
.services {
	min-height: 100vh;
	.charles {
		img {
			width: 300px;
		}
	}
}
</style>
