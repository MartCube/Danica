<template>
	<section class="quote">
		<div class="image">
			<ImageItem :src="data.primary.image.url" :mobile="data.primary.image.mobile.url" :retina="data.primary.image.retina.url" :width="data.primary.image.dimensions.width" :height="data.primary.image.dimensions.height" :alt="data.primary.image.alt" />
		</div>
		<div class="content">
			<blockquote>{{ data.primary.quote }}</blockquote>
			<h4>{{ data.primary.name }}</h4>
			<span class="description">{{ data.primary.description }}</span>
		</div>
	</section>
</template>

<script>
import { serviceIntroAnim } from '~/assets/anime'

export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
		// white: {
		// 	type: Boolean,
		// 	default: true,
		// },
	},
	computed: {
		image() {
			return this.data
		},
	},
	async mounted() {
		await this.$nextTick()
		serviceIntroAnim(this.$refs.maintitle, this.$refs.subtitle, this.$refs.project)
	},
	methods: {
		openModal() {
			this.$store.dispatch('bindModalContact', true)
		},
	},
}
</script>

<style lang="scss" scoped>
.intro {
	width: 100%;
	height: 100vh;
	padding: 0;

	display: flex;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	.bg {
		position: absolute;
		top: 0;
		width: 100%;
		height: inherit;
		picture {
			z-index: 2;
		}
	}

	.content {
		width: inherit;
		height: inherit;
		padding-left: 1rem;
		margin: 0 240px;
		position: relative;

		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;

		color: $black;
		z-index: 5;

		.maintitle {
			width: max-content;
			display: flex;
			align-items: center;
			overflow: hidden;

			span {
				font-size: 5rem;
				font-weight: bold;
				color: inherit;
				will-change: opacity;
				will-change: transform;
				opacity: 0;
			}
		}
		.subtitle {
			width: max-content;
			display: flex;
			align-items: center;
			overflow: hidden;
			span {
				font-size: 4rem;
				font-weight: bold;
				color: inherit;
				will-change: opacity;
				will-change: transform;
				opacity: 0;
			}
		}
		button {
			margin-top: 3rem;
		}
		.project {
			overflow: hidden;

			position: absolute;
			top: 120px;
			left: -30px;
			cursor: pointer;

			span {
				width: 30px;
				display: flex;
				align-items: center;
				opacity: 0; // opacity: 1
				background-color: $primary;
				padding: 15px 0;
				writing-mode: vertical-rl;
				text-orientation: mixed;
				color: $black;
			}
		}

		&.white {
			color: $white;
		}
	}
}
// @media (min-width: 1700px) {
// 	.intro {
// 		.content {
// 			.maintitle span {
// 				font-size: 8rem;
// 				line-height: normal;
// 			}
// 			.subtitle span {
// 				font-size: 5rem;
// 				line-height: normal;
// 			}
// 		}
// 	}
// }
@media (max-width: 1300px) {
	.intro {
		.content {
			margin-right: 10%;
		}
	}
}
@media (max-width: 1100px) {
	.intro {
		flex-direction: row;

		.content {
			.maintitle {
				margin-top: 4vh;
			}
			.maintitle span {
				font-size: 4rem;
			}
			.subtitle span {
				font-size: 3.5rem;
			}
			button {
				margin-top: 2rem;
			}
		}
	}
}
@media (max-width: 900px) {
	.intro {
		.content {
			margin: 0;
			padding-left: 40px;
			.project {
				top: 60px;
				left: 0;
			}
			.maintitle span {
				font-size: 3rem;
			}
			.subtitle span {
				font-size: 2.5rem;
			}
		}
	}
}
@media (max-width: 500px) {
	.intro {
		.content {
			.maintitle {
				margin-top: 6vh;
				span {
					font-size: 5vh;
				}
			}
			.subtitle span {
				font-size: 5vh;
			}
		}
	}
}
</style>
