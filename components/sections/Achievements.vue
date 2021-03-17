<template>
	<section class="achievements">
		<h2 class="title">{{ title }}</h2>
		<div class="text">
			<p>{{ description }}</p>
			<div class="counter">
				<span class="number">{{ data.years_on_market }}</span>
				<h4>years on the market</h4>
			</div>
			<div class="counter">
				<span class="number">{{ data.houses_build }}</span>
				<h4>houses build</h4>
			</div>
			<div class="counter">
				<span class="number">{{ data.projects }}</span>
				<h4>architecture projects</h4>
			</div>
		</div>
		<img class="lazyload" :src="image" alt="achievements" />
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
			return this.$prismic.asText(this.data.achievements_title)
		},
		description() {
			return this.$prismic.asText(this.data.achievements_description)
		},
		image() {
			return this.data.achievements_image.url
		},
	},
}
</script>

<style lang="scss" scoped>
.achievements {
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
		}
		.counter {
			padding-left: 20px;
			border-left: 5px solid $primary;
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
</style>
