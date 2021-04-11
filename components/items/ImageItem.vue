<template>
	<!-- <img :data-src="src" :src="src" class="lazyload" :alt="alt" /> -->
	<picture>
		<source :data-srcset="mobile" media="(max-width: 600px)" />
		<img :data-src="src" loading="lazy" class="lazyload" :alt="alt" />
	</picture>
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			default: '',
		},
		alt: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>
picture {
	width: 100%;
	height: 100%;
	z-index: 3;

	img {
		width: inherit;
		height: inherit;
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
}
</style>
