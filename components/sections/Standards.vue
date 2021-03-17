<template>
	<section class="standards">
		<h2 class="title">Standards</h2>
		<div class="list">
			<div v-for="(standard, i) in data" :key="i">
				<ImageItem :src="standard.standard_image.url" :alt="$prismic.asText(standard.standard_title)" />
				<div class="standard">
					<h3>{{ $prismic.asText(standard.standard_title) }}</h3>
					<p>{{ $prismic.asText(standard.standard_description) }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			required: true,
		},
	},
	computed: {
		title() {
			return this.$prismic.asText(this.data.primary.stages_title)
		},
	},
	method: {
		asText(value) {
			return this.$prismic.asText(value)
		},
	},
}
</script>

<style lang="scss" scoped>
$transition: all 0.35s ease;

.standards {
	display: flex;
	flex-direction: column;

	.list {
		width: 1000px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		& > * {
			width: 100%;
			max-width: 450px;
			margin-bottom: 40px;

			display: flex;

			img {
				width: 120px;
				height: 120px;
				margin-right: 40px;
			}
			.standard {
				h3 {
					word-spacing: 450px;
					margin-bottom: 20px;

					text-transform: capitalize;
				}
			}
		}
	}
}
</style>
