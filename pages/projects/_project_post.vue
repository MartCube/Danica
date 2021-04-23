<template>
	<div class="container">
		<template v-if="$fetchState.error">error</template>
		<template v-else-if="!$fetchState.pending">
			<div class="project_post">
				<div class="intro">
					<h2 class="title">{{ post.title }}</h2>
					<ImageItem :src="post.image.url" :mobile="post.image.mobile.url" :alt="post.title" />
				</div>

				<div class="info">
					<p><span>service:</span> {{ post.info.service }}</p>
					<p><span>square:</span> {{ post.info.square }}&#13217;</p>
					<p><span>date:</span> {{ post.info.date }}</p>
					<p><span>architect:</span> {{ post.info.architect }}</p>
					<p><span>designer:</span> {{ post.info.designer }}</p>
				</div>

				<!-- Slice Machine -->
				<div v-for="(slice, i) in post.slices" :key="i" class="slice" :class="slice.slice_type">
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
								<ImageItem v-for="item in slice.items" :key="item.image.url" class="swiper-slide" :src="item.image.url" alt="alt" />
							</div>
							<div slot="pagination" class="swiper-pagination"></div>
						</div>
					</template>

					<template v-else-if="slice.slice_type == 'image_text'">
						<div class="image_text">
							<ImageItem :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" alt="alt" />
							<div class="text">
								<p v-for="(item, key) in slice.items" :key="key">{{ $prismic.asText(item.text) }}</p>
							</div>
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
		const lang = this.$i18n.localeProperties.prismic

		const post = await this.$prismic.api.getByUID('project_post', this.$route.params.project_post, { lang })
		this.post = {
			image: post.data.main_image,
			title: this.$prismic.asText(post.data.title),
			info: {
				service: this.$prismic.asText(post.data.info[0].service),
				date: post.data.info[0].date,
				square: this.$prismic.asText(post.data.info[0].square),
				architect: this.$prismic.asText(post.data.info[0].architect),
				designer: this.$prismic.asText(post.data.info[0].designer),
			},

			slices: post.data.body,
		}
	},
	fetchKey(getCounter) {
		// getCounter is a method that can be called to get the next number in a sequence
		// as part of generating a unique fetchKey.
		return 'project_post' + getCounter('project_post')
	},
}
</script>

<style lang="scss" scoped>
.project_post {
	display: flex;
	flex-direction: column;
	padding-bottom: 40px;

	& > * {
		margin-bottom: 25px;
	}
	overflow-x: hidden;

	.intro {
		width: 100%;
		height: calc(100vh - 120px);
		display: flex;
		flex-direction: column;

		position: relative;
		picture {
			position: absolute;
			top: 0;
			left: 0;
			width: inherit;
			height: inherit;
			z-index: 7;
		}

		.title {
			position: absolute;
			bottom: 0;
			left: 240px;
			z-index: 9;

			padding: 20px 20px 0 20px;
			background: white;

			text-transform: capitalize;
			font-size: 3rem;
		}
	}

	.info {
		margin: 50px 0 50px 260px;
		// max-width: 400px;
		display: flex;
		flex-direction: column;
		p {
			padding: 10px 0;

			text-transform: capitalize;
			color: $black;
			font-weight: 500;
			font-size: 1.5rem;
			line-height: 1.2rem;
			span {
				font-size: inherit;
				margin-right: 1rem;
			}
		}
	}

	.slice {
		margin-left: 240px;
	}

	.text {
		.rich_text {
			width: 75%;
		}
	}

	.image {
		width: 75%;
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
		width: 100vw;

		margin-top: 10px;
		margin-bottom: 25px;
		z-index: 3;

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
		margin: 25px 0;

		.text {
			display: flex;
			flex-direction: column;
			padding: 40px;
			p {
				margin-bottom: 25px;
			}
		}
		picture {
			max-width: 800px;
			height: 450px;
			z-index: 7;
		}
	}
}

@media (max-width: 900px) {
	.project_post {
		padding: 0;
		.intro {
			width: 100%;
			height: calc(100vh - 60px);
			.title {
				left: 0;
				font-size: 2rem;
				padding: 20px 40px 0 40px;
			}
		}

		.info {
			width: 100%;
			margin: 40px 0;
			padding-left: 40px;

			p {
				font-size: 1rem;
			}
		}

		.slice {
			margin: 0;
			margin-bottom: 1rem;
		}

		.text .rich_text {
			width: 100%;
			padding: 0 40px;
		}

		.image {
			width: 100%;
		}

		.image_text {
			flex-direction: column;

			.text {
				display: flex;
				flex-direction: column;
				padding: 0 40px;
				p {
					margin-bottom: 25px;
				}
			}
			picture {
				margin-bottom: 40px;
			}
		}
	}

	::v-deep .swiper-pagination {
		margin-left: 40px;
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
}
::v-deep .swiper-wrapper {
	max-width: 900px;
}
</style>
