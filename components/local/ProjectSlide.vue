<template>
	<n-link :to="link" class="project_slide">
		<ImageItem :src="image + imgIX" :alt="title" />

		<h2>{{ title }}</h2>
	</n-link>
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
		imgIX() {
			return `&fit=crop&w=992&h=558&dpr=1`
		},
		image() {
			return this.data.data.main_image.url
		},
		title() {
			return this.$prismic.asText(this.data.data.title)
		},
		link() {
			return this.$prismic.linkResolver(this.data)
		},
	},
}
</script>

<style lang="scss" scoped>
.project_slide {
	display: flex;
	position: relative;
	cursor: pointer;

	h2 {
		padding: 40px 80px;
		position: absolute;
		bottom: 0;
		left: 0;
		background: white;

		text-transform: capitalize;
	}
}
</style>
