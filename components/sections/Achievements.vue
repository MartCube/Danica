<template>
	<section v-observe-visibility="visibilityOptions" class="achievements">
		<div class="name">
			<span>{{ data.primary.name }}</span>
		</div>
		<div class="content">
			<h2 class="title">{{ data.primary.title }}</h2>
			<div class="text">
				<p>{{ description }}</p>
				<div class="counter-wrapper">
					<div v-for="item in data.items" :key="item.achievement" class="counter">
						<span class="number">{{ item.number }}</span>
						<h4>{{ item.achievement }}</h4>
					</div>
				</div>
			</div>
			<div class="image">
				<ImageItem :width="image.dimensions.width" :height="image.dimensions.height" :src="image.url" :mobile="image.mobile.url" :alt="data.primary.title" />
			</div>
		</div>
	</section>
</template>

<script>
import { nambersIncreasingAnimation } from '~/assets/anime'
export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	computed: {
		description() {
			return this.$prismic.asText(this.data.primary.description)
		},
		image() {
			return this.data.primary.image
		},
		visibilityOptions() {
			return {
				callback: this.visibilityChanged,
				once: true,
				intersection: {
					rootMargin: '75%',
					threshold: 1,
				},
			}
		},
	},
	methods: {
		visibilityChanged(isVisible) {
			if (isVisible) {
				nambersIncreasingAnimation(this.data.years_on_market, this.data.houses_build, this.data.projects)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.achievements {
	max-width: $container_max_width;
	padding-bottom: 3rem;
	.content {
		display: flex;
		flex-direction: column;
		position: relative;

		.text {
			display: flex;
			justify-content: space-between;
			padding-right: 50px;
			p {
				max-width: 500px;
				margin-left: 1.5rem;
				margin-right: 3rem;
			}
			.counter-wrapper {
				display: flex;
				flex: 1;
			}
			.counter {
				margin-right: 2rem;
				padding-left: 20px;
				border-left: 4px solid $primary;
				min-width: 150px;
				height: max-content;
				display: flex;
				flex-direction: column;
				.number {
					font-size: 4rem;
					line-height: initial;
					font-family: 'Numbers';
					margin: 0;
				}
				h4 {
					margin: 0;
					word-spacing: 1px;
					font-size: 1.2rem;
					&::first-letter {
						text-transform: capitalize;
					}
				}
			}
		}
		.image {
			position: absolute;
			width: 65%;
			top: 0;
			right: 0;
			z-index: -1;
			picture {
				width: 100%;
				height: 100%;
				filter: grayscale(1) opacity(0.1);
				object-fit: cover;
			}
		}
	}
}

@media (max-width: 1300px) {
	.achievements {
		.content {
			.text {
				flex-wrap: wrap;
				p {
					margin-top: 3rem;
					order: 2;
				}
				.counter-wrapper {
					order: 1;
					width: 100%;
					.counter {
						margin-right: 1rem;
					}
				}
			}
			.image {
				width: 100%;
				top: 20%;
				height: 40%;
			}
		}
	}
}

@media (max-width: 900px) {
	.achievements {
		.content {
			height: auto;
			.text {
				padding: 0;
				flex-direction: column;
				p {
					margin-bottom: 60px;
					margin-left: 15px;
				}
				.counter {
					width: max-content;
					height: 60px;
					margin-bottom: 20px;

					.number {
						font-size: 1.5rem;
					}
					h4 {
						font-size: 1rem;
						word-spacing: initial;
					}
				}
			}
			.image {
				width: 100%;
				height: 30%;
				top: 10%;
				// bottom: 0;
			}
		}
	}
}

@media (max-width: 500px) {
	.achievements {
		.content {
			.text {
				flex-wrap: wrap;
				p {
					margin-top: 3rem;
					order: 2;
				}
				.counter-wrapper {
					order: 1;
					width: 100%;
					flex-direction: column;
					.counter {
						margin-right: 1rem;
					}
				}
			}
			.image {
				height: 41%;
			}
		}
	}
}
</style>
