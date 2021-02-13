<template>
	<div class="blog_card">
		<h2 class="title">{{ title }}</h2>
		<div class="info">
			<span class="date">{{ date }}</span>
			<span class="tag">{{ tag }}</span>
		</div>

		<div class="image">
			<img :src="image + Thumbnail_imgIX" class="lazyload" />
			<div class="overlay"></div>
			<div class="link">
				<IconChevron size="25px" />
			</div>
		</div>
	</div>
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
		Thumbnail_imgIX() {
			// return `&fit=crop&w=300&h=300&dpr=1`
			return ''
		},
		image() {
			return this.data.data.main_image.url
		},
		title() {
			return this.$prismic.asText(this.data.data.title)
		},
		date() {
			return this.data.data.date
		},
		tag() {
			return this.data.tags[0]
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

.blog_card {
	width: 100%;
	height: 100%;
	cursor: pointer;

	display: flex;
	flex-direction: column;

	.title {
		padding: 40px 0;
		position: relative;

		text-transform: capitalize;
		font-size: 1.1rem;
		&::after {
			content: '';
			position: absolute;
			width: 100%;
			background-color: $black;
			height: 2px;
			top: 0;
			left: 0;
		}
	}
	.info {
		display: flex;
		justify-content: space-between;
		padding-bottom: 20px;

		> * {
			font-size: 0.8rem;
			opacity: 0.5;
		}
		.tag {
			color: $primary;
			text-transform: capitalize;
		}
	}
	.image {
		width: inherit;
		height: auto;
		user-select: none;
		display: flex;
		position: relative;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			z-index: 1;
			position: relative;
			object-fit: contain;
			object-position: top;
			transition: all 0.75s ease;
			&.lazyload,
			&.lazyloading {
				opacity: 0;
			}
			&.lazyloaded {
				opacity: 1;
				transition: all 0.75s ease;
			}
		}
		.overlay {
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			background: $black;
			opacity: 0.2;
		}

		.link {
			position: absolute;
			bottom: 0;
			right: 0;
			z-index: 3;

			padding: 25px;
			background: $primary;

			opacity: 0;
			transition: all 0.3s ease;
		}
	}

	&.first {
		position: relative;
		.title {
			position: absolute;
			bottom: 0;
			left: 25px;
			margin-right: 75px;
			z-index: 2;

			font-size: 2rem;
			color: white;

			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			&::after {
				display: none;
			}
		}
		.info {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			width: 100%;
			height: 100%;
			padding: 25px;

			flex-direction: column-reverse;
			& > * {
				margin-bottom: 75px;
				opacity: 1;
				font-size: 1.2rem;
				color: white;
			}
		}

		.image {
			width: 100%;
			height: 100%;
			display: flex;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
				z-index: 1;
				position: relative;
				object-fit: cover;
				object-position: center;
				transition: all 0.75s ease;
				&.lazyload,
				&.lazyloading {
					opacity: 0;
				}
				&.lazyloaded {
					opacity: 1;
					transition: all 0.75s ease;
				}
			}
			.overlay {
				position: absolute;
				top: 0;
				right: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
				background: $black;
				opacity: 0.2;
			}

			.link {
				position: absolute;
				bottom: 0;
				right: 0;
				z-index: 2;

				padding: 25px;
				background: $primary;

				opacity: 0;
				transition: all 0.3s ease;
			}
		}
	}

	&:hover {
		.image {
			img {
				transform: scale(1.1);
			}
			.link {
				opacity: 1;
			}
		}
	}
}
</style>
