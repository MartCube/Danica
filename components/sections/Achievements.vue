<template>
	<section v-observe-visibility="visibilityOptions" class="achievements">
		<div class="name">
			<span>{{ data.primary.name }}</span>
		</div>
		<div class="content">
			<h2 class="title">{{ data.primary.title }}</h2>
			<div class="text">
				<p>{{ description }}</p>
				<div v-for="item in data.items" :key="item.achievement" class="counter">
					<span class="number">{{ item.number }}</span>
					<h4>{{ item.achievement }}</h4>
				</div>
			</div>
			<img class="lazyload" :src="image" alt="achievements" />
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
			return this.data.primary.image.url
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
.content {
	height: 500px;
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
		}
		.counter {
			padding-left: 20px;
			border-left: 4px solid $primary;
			width: 150px;
			height: 100%;
			display: flex;
			flex-direction: column;
			.number {
				font-size: 3rem;
				line-height: initial;
				font-weight: 700;
				margin: 0;
			}
			h4 {
				margin: 0;
				text-transform: capitalize;
				word-spacing: 1px;
			}
		}
	}
	img {
		position: absolute;
		width: 75%;
		top: 0;
		right: 0;
		z-index: -1;
		&::before {
			display: none;
		}

		&.lazyload,
		&.lazyloading {
			opacity: 0;
		}
		&.lazyloaded {
			opacity: 0.1;
			transition: all 2s cubic-bezier(0.215, 0.61, 0.355, 1);
		}
	}
}

@media (max-width: 900px) {
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
		img {
			width: 100%;
			height: 260px;
			top: initial;
			bottom: 0;
		}
	}
}
</style>
