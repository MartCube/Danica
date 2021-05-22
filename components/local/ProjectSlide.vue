<template>
	<n-link :to="link" class="project_slide">
		<ImageItem :src="image + imgIX" :mobile="image + imgIXmobile" :alt="title" />

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
			return `&fit=crop&w=900&h=600&dpr=1`
		},
		imgIXmobile() {
			return `&fit=crop&w=500&h=350&dpr=1`
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
	width: 800px;
	height: 70vh;

	h2 {
		z-index: 4;
		padding: 40px 80px;
		position: absolute;
		bottom: 0;
		left: -1px;
		background: white;
		text-transform: capitalize;
	}
}
@media (max-width: 900px) {
	.content .project_slide h2 {
		padding: 20px 40px;
	}
}
</style>
