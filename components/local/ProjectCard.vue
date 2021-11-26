<template>
	<n-link :to="link" class="project_card" :class="{ portrait: thumbnailClass }">
		<div class="image">
			<picture v-if="thumbnailImage.hasOwnProperty('url')">
				<source :data-srcset="thumbnailImage.dimensions.width > thumbnailImage.dimensions.height ? thumbnailImage.url + Thumbnail_imgIX : thumbnailImage.url" media="(max-width:500px)" />
				<source :data-srcset="thumbnailImage.url" media="(min-width:1600px)" />
				<img :width="thumbnailImage.dimensions.width" :height="thumbnailImage.dimensions.height" :src="thumbnailImage.url" loading="lazy" :alt="title" />
			</picture>
			<picture v-else>
				<source :data-srcset="image.thumbnail.url" media="(max-width:500px)" />
				<source :data-srcset="image.url" media="(min-width:1600px)" />
				<img :width="image.dimensions.width" :height="image.dimensions.height" :src="image.url" :alt="title" loading="lazy" />
			</picture>
			<!-- <ImageItem v-if="thumbnailImage.hasOwnProperty('url')" :width="thumbnailImage.dimensions.width" :height="thumbnailImage.dimensions.height" :mobile="thumbnailImage.dimensions.width > thumbnailImage.dimensions.height ? thumbnailImage.url + Thumbnail_imgIX : thumbnailImage.url" :src="thumbnailImage.url" :retina="thumbnailImage.url" :alt="title" /> -->
			<!-- <ImageItem v-else :width="image.dimensions.width" :height="image.dimensions.height" :mobile="image.thumbnail.url" :src="image.url" :retina="image.url" :alt="title" /> -->
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
		thumbnailImage() {
			return this.data.data.thumbnail_image
		},
		thumbnailClass() {
			if (Object.keys(this.data.data.thumbnail_image).length > 0 && this.data.data.thumbnail_image.dimensions.width < this.data.data.thumbnail_image.dimensions.height) {
				return true
			}
			return false
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

	.image {
		width: 100%;
		height: 100%;
		user-select: none;
		position: relative;
		overflow: hidden;
		display: block;
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
		opacity: 0;
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
		&.portrait {
			.image {
				picture {
					// aspect-ratio: 2 / 3;
				}
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
