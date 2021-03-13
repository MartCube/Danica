<template>
	<div class="services">
		<template v-if="!$fetchState.pending">
			<IntroImage :image="IntroImage" />
			<Charles :data="charles" />

			<!-- Slice Machine -->
			<div v-for="(slice, i) in slices" :key="i">
				<DesignStages v-if="slice.slice_type == 'stages'" :data="slice" />
				<DesignAdvantages v-if="slice.slice_type == 'advantages'" :data="slice" />
			</div>
		</template>
	</div>
</template>

<script>
import DesignAdvantages from '~/components/sections/DesignAdvantages.vue'
export default {
	name: 'Services',
	components: { DesignAdvantages },
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
.services {
	min-height: 100vh;
}
</style>
