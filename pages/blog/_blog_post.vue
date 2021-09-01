<template>
	<div class="container">
		<template v-if="!$fetchState.pending">
			<div class="blog_post">
				<div class="intro">
					<h2 class="title">{{ title }}</h2>
					<div class="info">
						<span class="date">{{ data.date }}</span>
						<span v-for="tag in data.tags" :key="tag" class="tag">{{ tag }}</span>
					</div>
					<template v-if="data.image.url">
						<ImageItem :src="data.image.url" :mobile="data.image.mobile.url" :alt="title" />
					</template>
					<!-- <n-link class="go_back" to="/blog"> <IconArrow />go back </n-link> -->
				</div>

				<!-- Slice Machine -->
				<div v-for="(slice, i) in data.body" :key="i" class="slice" :class="slice.slice_type">
					<template v-if="slice.slice_type == 'text'">
						<prismic-rich-text class="rich_text" :field="slice.primary.text" />
					</template>

					<template v-else-if="slice.slice_type == 'image'">
						<ImageItem :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :alt="slice.primary.image.alt" />
						<span class="description">"{{ slice.primary.image.alt }}"</span>
					</template>

					<template v-else-if="slice.slice_type == 'image_slider'">
						<div v-swiper="swiperOption" class="swiper-container">
							<div class="swiper-wrapper">
								<ImageItem v-for="item in slice.items" :key="item.image.url" class="swiper-slide" :src="item.image.url" :alt="title" />
							</div>
							<div slot="pagination" class="swiper-pagination"></div>
						</div>
					</template>

					<template v-else-if="slice.slice_type == 'image_text'">
						<div class="image_text">
							<ImageItem :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :alt="title" />
							<div class="text">
								<p v-for="(item, key) in slice.items" :key="key">{{ $prismic.asText(item.text) }}</p>
							</div>
						</div>
					</template>

					<template v-else-if="slice.slice_type == 'video'">
						<VideoItem :video="slice.primary.video" />
					</template>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'BlogPost',
	data: () => ({
		// data: [],
		swiperOption: {
			slidesPerView: 'auto',
			spaceBetween: 50,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		},
	}),
	async fetch() {
		await this.$store.dispatch('storeByUID', {
			type: 'blog_post',
			uid: this.$route.params.blog_post,
			language: this.$i18n.localeProperties.prismic,
			path: this.$route.fullPath,
		})
	},
	head() {
		return this.$store.getters.page.head
	},
	fetchKey(getCounter) {
		// getCounter is a method that can be called to get the next number in a sequence
		// as part of generating a unique fetchKey.
		return 'blog_post' + getCounter('blog_post')
	},
	computed: {
		title() {
			return this.$prismic.asText(this.data.title)
		},
		data() {
			return this.$store.getters.page.data
		}
	},
}
</script>

<style lang="scss" scoped>
.blog_post {
	margin: 0 50px 0 240px;
	padding-bottom: 40px;
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
		margin: 0;
		padding-bottom: 40px;

		display: flex;
		flex-direction: column;
		position: relative;

		.title {
			margin: 40px 0;
			padding-left: 1rem;
			font-size: 2rem;
		}

		.info {
			margin-bottom: 20px;
			padding-left: 1rem;

			.tag {
				float: right;
				color: $primary;
			}
		}

		picture {
			height: 100vh;
			z-index: 6;
		}

		.go_back {
			position: absolute;
			bottom: -100px;
			left: -240px;
			padding: 0 20px 0 260px;
			background: $primary;
			cursor: pointer;
			z-index: 4;

			height: 50px;
			display: flex;
			align-items: center;

			text-transform: capitalize;
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

	.slice {
		display: flex;
		&:last-child {
			margin-bottom: 0;
		}
	}

	.text {
		width: 75%;

		.rich_text {
			font-size: 1.2rem;
			line-height: 1.5rem;
		}
	}

	.image {
		width: 85%;
		flex-direction: column;
		align-items: flex-end;
		z-index: 6;

		.description {
			margin: 25px 0;
			opacity: 0.75;
			font-style: italic;
		}
	}

	.image_slider {
		align-self: flex-start;
		width: 100%;
		z-index: 3;
		margin-top: 10px;
		margin-bottom: 25px;
		z-index: 6;

		.swiper-container {
			width: inherit;
			height: inherit;
			margin: 0;

			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
	}

	.image_text {
		display: flex;
		padding: 20px 0;
		margin: 0;
		.text {
			display: flex;
			flex-direction: column;
			padding: 40px;
			p {
				margin-bottom: 25px;
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
		picture {
			max-width: 40%;
		}
	}

	.video {
		width: 100%;
	}
}

// @media (min-width: 1700px) {
// 	.blog_post {
// 		&.first {
// 			.info > * {
// 				font-size: 1.5rem;
// 			}
// 			.title{
// 				font-size: 3rem;
// 			}
// 		}
// 		.intro .title{
// 			font-size: 3rem;
// 		}
// 	} 
	
// }

@media (max-width: 900px) {
	.blog_post {
		margin: 0;

		.intro {
			.title {
				margin: 40px 0;
				padding-left: 55px;
				font-size: 1.5rem;
			}
			.info {
				padding: 0 40px 0 55px;
			}
			picture {
				// width: 100%;
				height: auto;
			}
		}

		.text {
			width: 100%;
			.rich_text {
				padding: 0 40px 0 55px;
			}
		}

		.image {
			width: 100%;
			margin: 0;
		}

		.image_text {
			flex-direction: column;
			padding: 0;
			p {
				padding-left: 15px;
			}
			picture {
				margin-left: 40px;
				max-width: 100%;
			}
		}
	}

	::v-deep .swiper-pagination {
		margin-right: 40px;
	}
	::v-deep .swiper-wrapper {
		max-width: 100vw;
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
	margin-top: 35px;

	width: max-content;
	height: 20px;
	display: flex;
	align-self: flex-end;
}
::v-deep .swiper-wrapper {
	max-width: 900px;
}
</style>
