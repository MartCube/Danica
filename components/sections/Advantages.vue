<template>
	<section class="advantages">
		<div class="name">
			<span>advantages</span>
		</div>
		<div class="content">
			<h2 class="title">{{ title }}</h2>
			<div class="list">
				<div v-for="(item, i) in data.items" :key="i" class="stage">
					<p>{{ $prismic.asText(item.advantage) }}</p>
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
			return this.$prismic.asText(this.data.primary.advantage_title)
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	position: relative;

	.list {
		display: flex;
		flex-direction: column;
		p {
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
