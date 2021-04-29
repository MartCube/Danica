<template>
	<section class="advantages">
		<div class="name">
			<span>{{ name }}</span>
		</div>
		<div class="content">
			<h2 class="title">{{ title }}</h2>
			<prismic-rich-text class="rich_text" :field="data.primary.content" />
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
		name() {
			return this.$prismic.asText(this.data.primary.name)
		},
		title() {
			return this.$prismic.asText(this.data.primary.title)
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	position: relative;

	.rich_text {
		padding-left: 1rem;
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
