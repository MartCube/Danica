<template>
	<n-link :to="link" class="project_card">
		<div class="image">
			<ImageItem :width="image.dimensions.width" :height="image.dimensions.height" :mobile="image.thumbnail.url" :src="image.url" :retina="image.url" :alt="title" />
			<!-- <div class="link">
				<Icon name="chevron" fill="hsl(0, 0%, 10%)" size="25px" />
			</div> -->
		</div>
		<h2>{{ title }}</h2>
	</n-link>
</template>

<script>
export default {
	name: 'ProjectCard',
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	computed: {
		image() {
			return this.data.data.main_image
		},
		Thumbnail_imgIX() {
			return `&fit=crop&w=1200&h=600`
		},
		title() {
			return this.$prismic.asText(this.data.data.title)
		},
		link() {
			return this.localePath(this.$prismic.linkResolver(this.data))
		},
	},
}
</script>

<style lang="scss" scoped>
.project_card {
	cursor: pointer;
	position: relative;

	display: flex;
	flex-direction: column;
	height: 40vw;
	width: max-content;
	.image {
		width: 100%;
		height: 100%;
		user-select: none;
		position: relative;
		overflow: hidden;
		display: block;
		z-index: 0;
		picture {
			width: 100%;
			height: 100%;
			z-index: 1;
			position: relative;
			object-fit: cover;
			object-position: center;
			transition: all 0.1s ease;
			&.lazyload,
			&.lazyloading {
				opacity: 0;
			}
			&.lazyloaded {
				opacity: 1;
				transition: all 0.3s ease;
			}
		}
		.link {
			position: absolute;
			bottom: 0;
			right: 0;
			z-index: 2;

			padding: 25px;
			background: $primary;

			opacity: 0;
			transition: opacity 0.3s ease;
		}
	}
	h2 {
		transition: opacity 0.3s ease;
		padding: 22px;
		position: absolute;
		// opacity: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		color: $white;
		text-transform: lowercase;
		font-size: 1.8rem;
		// text-transform: capitalize;
		&::first-letter {
			text-transform: capitalize;
		}
	}

	&:hover {
		.image {
			picture {
				filter: brightness(0.4);
			}
			.link {
				opacity: 1;
			}
		}
		h2 {
			opacity: 1;
		}
	}
}

@media (max-width: 900px) {
	.project_card {
		.image {
			.link {
				width: 100%;
				height: 100%;
				padding: 0;

				display: flex;
				justify-content: center;
				align-items: center;
				svg {
					width: 2rem;
					height: 2rem;
				}
			}
			picture {
				aspect-ratio: 16 / 9;
			}
		}
		h2 {
			opacity: 1;
			margin-left: 20px;
			font-size: 1.4rem;
		}
	}
}
@media (max-width: 600px) {
	.project_card {
		h2 {
			z-index: 1;
			margin: 0;
			padding: 15px 40px;
			background-color: rgba(27, 27, 27, 0.6);
			font-size: 1.1rem;
		}
	}
}
</style>
