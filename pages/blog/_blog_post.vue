<template>
	<div class="container">
		<template v-if="$fetchState.error">
			<Error />
		</template>
		<div v-else-if="!$fetchState.pending" class="blog_post">
			<div class="intro">
				<h1 class="title">{{ $prismic.asText(data.title) }}</h1>
				<div class="info">
					<span class="date">{{ data.date }}</span>
					<span v-for="tag in data.tags" :key="tag" class="tag">{{ tag }}</span>
				</div>
				<template v-if="data">
					<ImageItem :src="data.image.url" :mobile="data.image.mobile.url" :alt="$prismic.asText(data.title)" :height="data.image.dimensions.height" :width="data.image.dimensions.width" :retina="data.image.hasOwnProperty('retina') ? data.image.retina.url : ''" />
				</template>
				<!-- <n-link class="go_back" to="/blog"> <Icon name="arrow" />go back </n-link> -->
			</div>

			<!-- Slice Machine -->
			<div v-for="(slice, i) in data.body" :key="i" class="slice" :class="slice.slice_type">
				<template v-if="slice.slice_type == 'text'">
					<prismic-rich-text class="rich_text" :field="slice.primary.text" />
				</template>

				<template v-else-if="slice.slice_type == 'image'">
					<ImageItem :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :alt="slice.primary.image.alt" :height="slice.primary.image.dimensions.height" :width="slice.primary.image.dimensions.width" :retina="slice.primary.image.hasOwnProperty('retina') ? slice.primary.image.retina.url : ''"/>
					<!-- <span class="description">"{{ slice.primary.image.alt }}"</span> -->
				</template>

				<template v-else-if="slice.slice_type == 'image_slider'">
					<div class="image_slider">
						<div class="image_slider_wrapper">
							<ImageItem v-for="item in slice.items" :key="item.image.url" :src="item.image.url" :height="item.image.dimensions.height" :width="item.image.dimensions.width" />
						</div>
					</div>
				</template>

				<template v-else-if="slice.slice_type == 'image_text'">
					<div class="image_text">
						<ImageItem :src="slice.primary.image.url" :height="slice.primary.image.dimensions.height" :width="slice.primary.image.dimensions.width" :mobile="slice.primary.image.mobile.url" :alt="slice.primary.image.alt" :retina="slice.primary.image.hasOwnProperty('retina') ? slice.primary.image.retina.url : ''" />
						<div class="text">
							<p v-for="(item, key) in slice.items" :key="key">{{ $prismic.asText(item.text) }}</p>
						</div>
					</div>
				</template>

				<template v-else-if="slice.slice_type == 'video'">
					<div class="video_container">
						<div class="video_default_preview">
							<ImageItem v-if="slice.primary.video_image.url !== undefined" :src="slice.primary.video_image.url" :mobile="slice.primary.video_image.mobile.url" :width="slice.primary.video_image.dimensions.width" :height="slice.primary.video_image.dimensions.height" :alt="slice.primary.video_image.alt" :retina="slice.primary.video_image.hasOwnProperty('retina') ? slice.primary.video_image.retina.url : ''" />
							<ImageItem v-else :width="data.image.dimensions.width" :height="data.image.dimensions.height" :src="data.image.url" :mobile="data.image.mobile.url" :alt="$prismic.asText(data.title)" :retina="data.image.hasOwnProperty('retina') ? data.image.retina.url : ''" />
						</div>
						<div class="play" @click="openModal">
							<Icon name="play" />
						</div>
					</div>
					<div>
						<LazyModalVideo :video="slice.primary.video" />
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BlogPost',
	data: () => ({
		data: null,
	}),
	async fetch() {
		await this.$prismic.api
			.getByUID('blog_post', this.$route.params.blog_post, { lang: this.$i18n.localeProperties.prismic })
			.then(async (fetch) => {
				// send data to store
				await this.$store.dispatch('storeByUID', {
					type: 'blog_post',
					path: this.$route.fullPath,
					fetch,
				})
				this.data = fetch.data
			})
			.catch((error) => {
				console.log(error)
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('blog post not found')
			})
	},
	head() {
		return this.$store.getters.page.head
	},
	methods: {
		openModal() {
			this.$store.dispatch('bindModalVideo', true)
		},
	},
	// fetchKey(getCounter) {
	// 	// getCounter is a method that can be called to get the next number in a sequence
	// 	// as part of generating a unique fetchKey.
	// 	return 'blog_post' + getCounter('blog_post')
	// },
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
			object-fit: cover;
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

	.video_container {
		position: relative;
		width: 100%;
		.video_default_preview {
			width: 100%;
			max-height: 70vh;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			z-index: 1;
			overflow: hidden;
		}
		picture {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			display: block;
			filter: grayscale(100%) brightness(130%);
			opacity: 0.8;
		}
		.play {
			padding: 24px;
			background: $primary;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			cursor: pointer;
			z-index: 3;
			svg {
				fill: $white;
			}
		}
	}

	.image_slider {
		width: 100%;
		overflow-x: auto;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		@include scrollbar;
		.image_slider_wrapper {
			width: auto;
			height: inherit;
			margin: 0;
			overflow: initial;

			display: inline-flex;
			picture {
				height: 70vh;
				width: auto;
				margin-right: 10px;
			}
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
			object-fit: cover;
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
}
</style>
