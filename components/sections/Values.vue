<template>
	<section>
		<div class="name">
			<span>values</span>
		</div>
		<div class="content">
			<div class="text">
				<h2 class="title">{{ $prismic.asText(data.title) }}</h2>
				<p class="description">{{ $prismic.asText(data.description) }}</p>
			</div>
			<VideoItem />
		</div>
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
.content {
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
}

@media (max-width: 900px) {
	section {
		.content {
			flex-direction: column;
			.text {
				margin-bottom: 40px;
				.title {
					margin-bottom: 40px;
				}
			}
		}
	}
}
</style>
