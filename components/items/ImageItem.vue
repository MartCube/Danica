<template>
	<img :data-src="src" :src="src" class="lazyload" :alt="alt" />
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>
img {
	width: 100%;
	height: 100%;
	position: relative;
	object-fit: cover;
	object-position: center;

	&::before {
		display: none;
	}

	&.lazyload,
	&.lazyloading {
		opacity: 0;
	}
	&.lazyloaded {
		opacity: 1;
		transition: all 2s cubic-bezier(0.215, 0.61, 0.355, 1);
	}
}
</style>
