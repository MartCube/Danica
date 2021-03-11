<template>
	<div class="intro_image">
		<ImageItem :src="image.url" :alt="image.alt" />
	</div>
</template>

<script>
export default {
	props: {
		image: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>
.intro_image {
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;
	img {
		position: absolute;
	}
}
</style>
