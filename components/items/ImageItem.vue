<template functional>
	<picture>
		<source :data-srcset="props.mobile" media="(max-width:500px)" />
		<img :width="props.width" :height="props.height" :data-src="props.src" loading="lazy" class="lazyload" :alt="props.alt" />
	</picture>
</template>

<script>
export default {
	name: 'ImageItem',
	props: {
		src: {
			type: String,
			required: true,
			default: '',
		},
		width: {
			type: Number,
			default: 100,
		},
		height: {
			type: Number,
			default: 100,
		},
		mobile: {
			type: String,
			default: '',
		},
		alt: {
			type: String,
			default: 'Danica',
		},
	},
}
</script>

<style lang="scss">
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
