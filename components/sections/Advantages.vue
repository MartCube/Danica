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
		.stage {
			padding-left: 1rem;

			p {
				margin-bottom: 16px;
				font-weight: 400;

				display: flex;
				align-items: center;
				&::before {
					content: '';
					margin-right: 20px;
					min-width: 20px;
					height: 5px;
					background: $primary;
				}
			}
			&:last-child {
				p {
					margin: 0;
				}
			}
		}
	}
}

@media (max-width: 900px) {
	.content .list .stage {
		padding: 0;
		p {
			display: flex;
			align-items: flex-start;
			&::before {
				margin-top: 15px;
			}
		}
	}
}
</style>
