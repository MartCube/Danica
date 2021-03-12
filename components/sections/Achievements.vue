<template>
	<div class="achievements">
		<template v-if="!$fetchState.pending">
			<h2 class="title">{{ data.title }}</h2>
			<div class="text">
				<p>{{ data.text }}</p>
				<div v-for="(counter, i) in data.counters" :key="i" class="counter">
					<span class="number">{{ $prismic.asText(counter.primary.number) }}</span>
					<h4>{{ $prismic.asText(counter.primary.counter_title) }}</h4>
				</div>
			</div>
			<ImageItem :src="data.image" alt="achievements" />
		</template>
	</div>
</template>

<script>
export default {
	data: () => ({
		data: null,
	}),
	async fetch() {
		const achievements = await this.$prismic.api.getSingle('achievements')
		this.data = {
			title: this.$prismic.asText(achievements.data.title),
			text: this.$prismic.asText(achievements.data.text),
			image: achievements.data.image.url,
			counters: achievements.data.body,
		}
	},
}
</script>

<style lang="scss" scoped>
.achievements {
	margin-left: 240px;
	margin-top: 80px;

	height: 500px;
	display: flex;
	flex-direction: column;
	position: relative;
	.title {
		max-width: 500px;
		margin-bottom: 80px;
	}
	.text {
		display: flex;
		justify-content: space-between;
		padding-right: 50px;
		p {
			max-width: 500px;
			font-weight: 300;
			font-size: 1.2rem;
			line-height: 1.5rem;
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
		z-index: 0;
		opacity: 0.1;
	}
}
</style>
