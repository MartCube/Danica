<template>
	<div class="container">
		<!-- Slice Machine -->
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
		const policy = await this.$prismic.api.getSingle('policy')
		this.data = policy.data.body
	},
}
</script>

<style lang="scss" scoped>
.container {
	margin-left: 240px;
	padding: 0 0 40px 1rem;
	border-left: 1px solid $line;

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
