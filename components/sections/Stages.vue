<template>
	<section>
		<div class="name">
			<span>stages</span>
		</div>
		<div class="content">
			<h2 class="title">{{ title }}</h2>
			<div class="list">
				<div v-for="(stage, i) in data.items" :key="i">
					<h2 class="number">0{{ i + 1 }}</h2>
					<div class="stage">
						<h3>{{ $prismic.asText(stage.stage_title) }}</h3>
						<p>{{ $prismic.asText(stage.stage_description) }}</p>
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
}
</script>

<style lang="scss" scoped>
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

			.number {
				min-width: 120px;
				margin-right: 40px;

				text-align: right;
				font-size: 4rem;
				color: $primary;
			}
			.stage {
				h3 {
					word-spacing: 450px;
					margin-top: 10px;
					margin-bottom: 20px;

					text-transform: capitalize;
				}
			}
		}
	}
}
</style>
