<template>
	<div class="design_advantages">
		<h2 class="title">{{ title }}</h2>
		<div class="list">
			<div v-for="(item, i) in data.items" :key="i" class="stage">
				<p>{{ $prismic.asText(item.advantage) }}</p>
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
			return this.$prismic.asText(this.data.primary.advantage_title)
		},
	},
}
</script>

<style lang="scss" scoped>
$transition: all 0.35s ease;

.design_advantages {
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
		display: flex;
		flex-direction: column;
		p {
			font-size: 1.2rem;
			margin-bottom: 16px;
			display: flex;
			align-items: center;
			&::before {
				content: '';
				margin-right: 20px;
				width: 20px;
				height: 3px;
				background: $primary;
			}
		}
	}
}
</style>
