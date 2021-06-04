<template>
	<div class="container">
		<div v-for="(slice, i) in slices" :key="i" class="slice" :class="slice.slice_type">
			<h3 class="title">{{ $prismic.asText(slice.primary.title) }}</h3>
			<prismic-rich-text class="rich_text" :field="slice.primary.text" />
		</div>
	</div>
</template>

<script>
export default {
	async asyncData({ i18n, store }) {
		await store.dispatch('storeSingle', {
			type: 'policy',
			language: i18n.localeProperties.prismic,
		})
		return {
			slices: store.getters.page.data.body,
		}
	},
	head() {
		return this.$store.getters.page.head
	},
}
</script>

<style lang="scss" scoped>
.container {
	margin-left: 240px;
	margin-top: 120px;
	padding: 0 0 40px 1rem;
	border-left: 1px solid $line;
	&::after {
		display: none;
	}
	.slice {
		.title {
			margin: 40px 0;
			text-transform: uppercase;
		}
		.rich_text {
			width: 80%;
		}
	}
}
@media (max-width: 900px) {
	.container {
		margin-left: 45px;
		margin-top: 30px;
	}
}
</style>
