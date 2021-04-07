<template>
	<section>
		<div class="name">
			<span>standards</span>
		</div>
		<div class="content">
			<h2 class="title">The standards you set determine the life you get</h2>
			<div class="list">
				<div v-for="(standard, i) in data.items" :key="i">
					<ImageItem :src="standard.image.url" :alt="$prismic.asText(standard.title)" />
					<div class="standard">
						<h3>{{ $prismic.asText(standard.title) }}</h3>
						<p>{{ $prismic.asText(standard.description) }}</p>
					</div>
				</div>
			</div>
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

.content {
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

			picture {
				width: 120px;
				min-width: 120px;
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
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}

@media (max-width: 900px) {
	section {
		.content {
			flex-direction: column;
			.list {
				width: 100%;
				& > * {
					flex-direction: column;
					&:last-child {
						margin: 0;
					}
				}
				picture {
					margin-bottom: 20px;
				}
				.standard h3 {
					word-spacing: initial;
				}
			}
		}
	}
}
</style>
