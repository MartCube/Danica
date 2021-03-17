<template>
	<section class="values">
		<div class="text">
			<h2 class="title">{{ $prismic.asText(data.title) }}</h2>
			<p class="description">{{ $prismic.asText(data.description) }}</p>
		</div>
		<VideoItem />
	</section>
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
	display: flex;
	justify-content: space-between;
	.text {
		.title {
			max-width: 500px;
			margin-bottom: 80px;
		}
		.description {
			max-width: 500px;
		}
	}

	.plyr--video {
		width: 700px;
	}
}
</style>
