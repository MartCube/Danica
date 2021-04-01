<template>
	<div class="container">
		<template v-if="$fetchState.error">error</template>
		<template v-else-if="!$fetchState.pending">
			<div class="blog_post">
				<div class="intro">
					<h2 class="title">{{ post.title }}</h2>
					<span class="date">{{ post.date }}</span>
					<ImageItem :src="post.main_image" :alt="post.title" />
					<n-link class="go_back" to="/blog">
						<IconArrow />
						go back
					</n-link>
				</div>

				<!-- Slice Machine -->
				<div v-for="(slice, i) in post.slices" :key="i" class="slice" :class="slice.slice_type">
					<p v-if="slice.slice_type == 'text'">{{ $prismic.asText(slice.primary.text) }}</p>

					<template v-else-if="slice.slice_type == 'image'">
						<ImageItem :src="slice.primary.image.url" :alt="slice.primary.image.alt" />
						<span class="description">"{{ slice.primary.image.alt }}"</span>
					</template>

					<template v-else-if="slice.slice_type == 'image_slider'">
						<div v-swiper="swiperOption" class="swiper-container">
							<div class="swiper-wrapper">
								<ImageItem v-for="item in slice.items" :key="item.image.url" class="swiper-slide" :src="item.image.url" :alt="item.image.alt" />
								<div class="swiper-slide"></div>
							</div>
							<div slot="pagination" class="swiper-pagination"></div>
						</div>
					</template>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	data: () => ({
		post: Object,
		swiperOption: {
			slidesPerView: 2,
			spaceBetween: 40,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		},
	}),
	async fetch() {
		const post = await this.$prismic.api.getByUID('blog_post', this.$route.params.blog_post)
		this.post = {
			main_image: post.data.main_image.url,
			title: this.$prismic.asText(post.data.title),
			date: post.data.date,
			tags: post.tags,
			slices: post.data.body,
		}
	},
}
</script>

<style lang="scss" scoped>
.blog_post {
	margin-left: 240px;
	margin-right: 50px;
	overflow-x: hidden;
	border-left: 1px solid $line;

	display: flex;
	flex-direction: column;
	align-items: flex-end;

	& > * {
		margin-bottom: 25px;
	}
	.intro {
		width: 100%;
		height: calc(100vh - 80px);
		margin-bottom: 50px;
		display: flex;
		flex-direction: column;

		position: relative;

		.title {
			margin-bottom: 25px;
			font-size: 2rem;
		}
		.date {
			margin-bottom: 25px;
		}
		.go_back {
			position: absolute;
			bottom: -100px;
			left: -240px;
			padding: 0 20px 0 260px;
			background: $primary;
			cursor: pointer;

			height: 50px;
			display: flex;
			align-items: center;

			text-transform: capitalize;
			font-weight: 500;
			font-size: 1.2rem;
			line-height: 1.5rem;

			svg {
				transition: all 0.2s ease;
				margin-right: 20px;
				transform: rotate(180deg);
			}

			&:hover {
				svg {
					transform: rotate(180deg) translateX(10px);
				}
			}
		}
	}

	.text {
		width: 75%;
		p {
			font-weight: 300;
			font-size: 1.2rem;
			line-height: 1.5rem;
		}
	}
	.image {
		width: 85%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.description {
			margin: 25px 0;
			opacity: 0.75;
			font-style: italic;
		}
	}
	.image_slider {
		align-self: flex-start;
		width: 1840px;
		height: 100%;
		margin-top: 10px;
		margin-bottom: 25px;

		overflow: hidden;
		.swiper-container {
			width: 1840px;
			height: 100%;
			margin: 0;

			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
	}
}
::v-deep {
	--swiper-theme-color: rgb(255, 196, 36);
}
::v-deep .swiper-pagination-bullet {
	width: 12px;
	height: 12px;
	border-radius: 10px;
	transition: width 0.3s ease;
	&.swiper-pagination-bullet-active {
		width: 40px;
	}
}

::v-deep .swiper-pagination {
	position: initial;
	margin-top: 25px;

	width: max-content;
	height: 20px;
	display: flex;
	align-self: center;
}
</style>
