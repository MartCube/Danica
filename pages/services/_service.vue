<template keep-alive>
	<div class="container">
		<template v-if="$fetchState.error">error</template>
		<template v-else-if="!$fetchState.pending">
			<div v-for="slice in slices" :key="slice.slice_type">
				<ServiceIntro v-if="slice.slice_type == 'serviceintro'" :data="slice" />
				<Values v-else-if="slice.slice_type == 'values'" :data="slice" />
				<Stages v-else-if="slice.slice_type == 'stages'" :data="slice" />
				<Standards v-else-if="slice.slice_type == 'standards'" :data="slice" />
				<Advantages v-else-if="slice.slice_type == 'advantages'" :data="slice" />
				<Charles v-else-if="slice.slice_type == 'charles'" :data="slice" />
				<LatestProjects v-else-if="slice.slice_type == 'latestprojects'" :data="slice" />
				<SliderProjects v-else-if="slice.slice_type == 'sliderprojects'" :data="slice" />
				<section v-else-if="slice.slice_type == 'text'" class="rich_text">
					<prismic-rich-text :field="slice.primary.text" />
				</section>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('bindNavbarTransparent', false)
		next()
	},
	middleware: 'navbarTransparent',
	data: () => ({
		slices: null,
	}),
	async fetch() {
		const lang = this.$i18n.localeProperties.prismic
		const fetch = await this.$prismic.api.getByUID('services', this.$route.params.service, { lang })
		this.slices = fetch.data.body
	},
	fetchKey(getCounter) {
		// getCounter is a method that can be called to get the next number in a sequence
		// as part of generating a unique fetchKey.
		return 'service' + getCounter('service')
	},
	mounted() {
		this.$store.dispatch('bindNavbarTransparent', true)
	},
}
</script>

<style lang="scss" scoped>
.container {
	padding: 0;
	padding-bottom: 80px;
}
.rich_text {
	padding-right: 1rem;
	padding-left: 255px;
}
@media (max-width: 900px) {
	.rich_text {
		padding-right: 1rem;
		padding-left: 55px;
	}
}
</style>
