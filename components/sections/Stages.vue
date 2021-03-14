<template>
	<div class="stages">
		<h2 class="title">{{ title }}</h2>
		<div class="list">
			<div v-for="(stage, i) in data.items" :key="i" class="stage">
				<h2>0{{ i + 1 }}</h2>
				<h2>{{ $prismic.asText(stage.stage_title) }}</h2>
				<p>{{ $prismic.asText(stage.stage_description) }}</p>
			</div>
		</div>
	</div>
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
$transition: all 0.35s ease;

.stages {
	margin-bottom: 80px;
	margin-left: 240px;

	display: flex;
	flex-direction: column;
	position: relative;
	.title {
		max-width: 500px;
		margin-bottom: 80px;
	}
	.list {
		width: 800px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.stage {
			width: 100%;
			max-width: 300px;
			margin-bottom: 40px;
		}
	}
}
</style>
