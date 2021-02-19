<template>
	<client-only>
		<agile autoplay>
			<div v-for="image in images" :key="image.image.alt" class="slide">
				<ImageItem :src="image.image.url" :alt="image.image.alt" />
			</div>
		</agile>
	</client-only>
</template>

<script>
export default {
	props: {
		images: {
			type: Array,
			required: true,
		},
	},
}
</script>

<style lang="scss">
@import '~/assets/colors.scss';
.agile__actions {
	justify-content: center;
	.agile__nav-button--prev,
	.agile__nav-button--next {
		display: none;
	}
	.agile__dots {
		.agile__dot {
			width: 25px;
			height: 25px;
			border-radius: 25px;
			margin: 25px;
			background: $primary;
			opacity: 0.5;
			transition: all 0.2s ease;
			&.agile__dot--current {
				opacity: 1;
			}
			button {
				opacity: 0;
				width: inherit;
				height: inherit;
			}
		}
	}
}

.slide {
	width: 75%;
}
</style>
