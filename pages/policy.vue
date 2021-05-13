<template>
	<div class="container">
		<div v-for="(slice, i) in data" :key="i" class="slice" :class="slice.slice_type">
			<h3 class="title">{{ $prismic.asText(slice.primary.title) }}</h3>
			<prismic-rich-text class="rich_text" :field="slice.primary.text" />
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		data: Object,
	}),
	async fetch() {
		const lang = this.$i18n.localeProperties.prismic

		const policy = await this.$prismic.api.getSingle('policy', { lang })
		this.data = policy.data.body
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
</style>
