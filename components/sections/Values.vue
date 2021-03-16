<template>
	<div class="values">
		<div>
			<h2 class="title">{{ $prismic.asText(data.title) }}</h2>
			<p class="description">{{ $prismic.asText(data.description) }}</p>
		</div>
		<client-only>
			<div class="plyr_video">
				<vue-plyr>
					<div data-plyr-provider="vimeo" data-plyr-embed-id="143418951"></div>
				</vue-plyr>
			</div>
		</client-only>
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

.plyr_video {
	width: 700px;
}

.values {
	margin-bottom: 80px;
	margin-left: 240px;

	display: flex;
	.title {
		max-width: 500px;
		margin-bottom: 80px;
	}
	.description {
		max-width: 500px;
	}

	.plyr--video {
		width: 700px;
	}
}
</style>
