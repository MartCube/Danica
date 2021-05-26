<template>
	<n-link :to="link" class="blog_card">
		<h2 class="title">{{ title }}</h2>
		<div class="info">
			<span class="date">{{ date }}</span>
			<span class="tag">{{ tag }}</span>
		</div>
		<div class="image">
			<ImageItem :src="image.card.url" :mobile="image.mobileCard.url" :alt="title" />
			<div class="link">
				<IconChevron size="25px" />
			</div>
		</div>
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
		image() {
			return this.data.data.image
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
		link() {
			return this.localePath(this.$prismic.linkResolver(this.data))
		},
	},
}
</script>

<style lang="scss" scoped>
.blog_card {
	width: 100%;
	height: 100%;
	cursor: pointer;

	display: flex;
	flex-direction: column;

	color: $black;

	.title {
		padding: 40px 0;
		position: relative;

		text-transform: capitalize;
		font-size: 1.2rem;
		line-height: 1.5rem;
		border-top: 2px solid $black;
	}
	.info {
		display: flex;
		justify-content: space-between;
		padding-bottom: 20px;

		> * {
			font-size: 0.8rem;
			// opacity: 0.5;
			color: rgba(0, 0, 0, 0.4);
			font-weight: 500;
		}
		.tag {
			color: darken($primary, 5%);
			text-transform: capitalize;
		}
	}
	.image {
		width: auto;
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
			bottom: 30px;
			left: 25px;
			margin-right: 75px;
			z-index: 4;

			font-size: 2rem;
			line-height: 2.5rem;
			color: white;

			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			border: none;
			&::after {
				display: none;
			}
		}

		.info {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 4;
			width: 100%;
			height: 100%;
			padding: 25px;

			flex-direction: column-reverse;
			& > * {
				margin-bottom: 110px;
				opacity: 1;
				font-size: 1.2rem;
				color: white;
			}
			.tag {
				color: $primary;
				font-weight: 500;
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
				position: relative;
				object-fit: cover;
				object-position: center;
			}

			.link {
				position: absolute;
				bottom: 0;
				right: 0;
				z-index: 2;
				background: $primary;
				padding: 25px;

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

@media (max-width: 1100px) {
	.blog_card {
		.title {
			font-size: 1.2rem;
			line-height: 1.8rem;
		}

		.image .link {
			width: 100%;
			height: 100%;
			padding: 0;

			display: flex;
			align-items: center;
			justify-content: center;
		}

		&.first {
			position: initial;
			.title {
				position: initial;
				margin-right: 0;
				z-index: 4;
				font-size: 1.2rem;
				line-height: 1.8rem;
				color: black;
				height: auto;
				display: inline-block;
				border-top: 2px solid $black;
			}
			.image {
				height: auto;
				.link {
					width: 100%;
					height: 100%;
					padding: 0;
					z-index: 3;

					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.info {
				position: initial;
				width: initial;
				height: initial;
				padding: 0;
				flex-direction: row;
				padding-bottom: 20px;
				justify-content: space-between;
				& > * {
					margin-bottom: 0;
					color: rgba(0, 0, 0, 0.4);
					font-size: 0.8rem;
				}
				.tag {
					// color: $white;
					margin-bottom: 0;
				}
			}
		}
	}
}
</style>
