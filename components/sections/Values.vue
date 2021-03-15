<template>
	<div class="values">
		<h2 class="title">{{ $prismic.asText(data.title) }}</h2>
		<p class="description">{{ $prismic.asText(data.description) }}</p>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	computed: {},
}
</script>

<style lang="scss" scoped>
$transition: all 0.35s ease;

.values {
	margin-bottom: 80px;
	margin-left: 240px;

	display: flex;
	flex-direction: column;
	.title {
		max-width: 500px;
		margin-bottom: 80px;
	}
	.description {
		max-width: 500px;
	}
}
</style>
