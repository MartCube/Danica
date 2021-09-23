<template>
	<section>
		<div class="name">
			<span> {{ name }}</span>
		</div>
		<div class="content">
			<h2 class="title">{{ title }}</h2>
			<template v-if="data.primary.standarts_description">
				<prismic-rich-text class="rich_text" :field="data.primary.standarts_description" />
			</template>
			<div class="list">
				<div v-for="(standard, i) in data.items" :key="i">
					<ImageItem :width="standard.image.dimensions !== undefined ? standard.image.dimensions.width : 100" :height="standard.image.dimensions !== undefined ? standard.image.dimensions.height : 100" :src="standard.image.url" :alt="$prismic.asText(standard.title)" />
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
		name() {
			return this.$prismic.asText(this.data.primary.name)
		},
		title() {
			return this.$prismic.asText(this.data.primary.title)
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
	.rich_text{
		padding: 0 1rem;
    display: block;
    margin-bottom: 60px;
	}
	.list {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 0 1.5rem;
		& > * {
			width: 100%;
			max-width: 50%;
			margin-bottom: 40px;

			display: flex;

			picture {
				width: 120px;
				min-width: 120px;
				height: 120px;
				margin-right: 40px;
			}
			.standard {
				padding-right: 2rem;
				h3 {
					margin-bottom: 20px;

					&::first-letter{
						text-transform: capitalize;
					}
				}
			}
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}

@media (max-width: 1100px) {
	section {
		.content {
			flex-direction: column;
			.list {
				width: 100%;
				padding-left: 0;
				& > * {
					flex-direction: column;
					max-width: 100%;
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
@media (max-width: 900px) {
	section {
		.content {
			flex-direction: column;
			.list {
				width: 100%;
				padding-left: 15px;
			
			}
		}
	}
}
</style>
