<template>
	<div class="container">
		<template v-if="$fetchState.error">
			<Error />
		</template>
		<div v-else-if="!$fetchState.pending" class="project_post">
			<div class="intro">
				<h2 class="title">{{ $prismic.asText(data.title) }}</h2>
				<ImageItem :width="data.main_image.dimensions.width" :height="data.main_image.dimensions.height" :src="data.main_image.url" :mobile="data.main_image.mobile.url" :alt="$prismic.asText(data.title)" />
			</div>

			<div class="info">
				<p><span>service:</span> {{ $prismic.asText(data.info[0].service) }}</p>
				<p><span>square:</span> {{ $prismic.asText(data.info[0].square) }}&#13217;</p>
				<p><span>date:</span> {{ data.info[0].date }}</p>
				<p><span>architect:</span> {{ $prismic.asText(data.info[0].architect) }}</p>
				<p><span>designer:</span> {{ $prismic.asText(data.info[0].designer) }}</p>
			</div>

			<!-- Slice Machine -->
			<div v-for="(slice, i) in data.body" :key="i + slice.slice_type" class="slice" :class="slice.slice_type">
				<template v-if="slice.slice_type == 'text'">
					<prismic-rich-text class="rich_text" :field="slice.primary.text" />
				</template>

				<template v-else-if="slice.slice_type == 'image'">
					<template v-if="slice.primary.image !== undefined">
						<ImageItem :width="slice.primary.image.dimensions.width" :height="slice.primary.image.dimensions.height" :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :alt="slice.primary.image.alt" />
						<span class="description">"{{ slice.primary.image.alt }}"</span>
					</template>
				</template>
				
				<template v-else-if="slice.slice_type == 'image_slider'">
					<div class="image_slider">
						<div class="image_slider_wrapper">
							<ImageItem v-for="(item, y) in slice.items" :key="y + item.image.url" :src="item.image.url" :mobile="item.image.mobile.url" :width="item.image.dimensions.width" :height="item.image.dimensions.height" :alt="item.image.alt !== null ? item.image.alt : 'alt'" />
						</div>
					</div>
				</template>
				
				<template v-else-if="slice.slice_type == 'image_text'">
					<div class="image_text">
						<template v-if="slice.primary.image !== 'undefined'">
							<ImageItem :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :width="slice.primary.image.dimensions.width" :height="slice.primary.image.dimensions.height" :alt="slice.primary.image.alt !== null ? slice.primary.image.alt : 'alt'" />
						</template>
						<div class="text">
							<p v-for="(item, key) in slice.items" :key="key">{{ $prismic.asText(item.text) }}</p>
						</div>
					</div>
				</template>
				
				<template v-else-if="slice.slice_type == 'video'">
					<div class="video_container">
						<template v-if="'url' in slice.primary.image">
							<ImageItem :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :width="slice.primary.image.dimensions.width" :height="slice.primary.image.dimensions.height" :alt="slice.primary.image.alt" />
						</template>
						<template v-else>
							<div class="video_default_preview">
								<ImageItem :width="data.main_image.dimensions.width" :height="data.main_image.dimensions.height" :src="data.main_image.url" :mobile="data.main_image.mobile.url" :alt="$prismic.asText(data.title)" />
							</div>
						</template>
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
	Name: 'ProjectPost',
	data: () => ({
		data: null,
	}),
	async fetch() {
		console.log('project post fetch')
		await this.$prismic.api
			.getByUID('project_post', this.$route.params.project_post, { lang: this.$i18n.localeProperties.prismic })
			.then(async (fetch) => {
				// send data to store
				await this.$store.dispatch('storeByUID', {
					type: 'project_post',
					path: this.$route.fullPath,
					fetch,
				})
				// data to component
				this.data = await fetch.data
			})
			.catch((error) => {
				console.log(error)
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('project post not found')
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
}
</script>

<style lang="scss" scoped>
.project_post {
	display: flex;
	flex-direction: column;
	padding-bottom: 40px;
	position: relative;
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 240px;
		z-index: 5;

		width: 1px;
		height: 100%;
		background: $line;
	}

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
			font-weight: bold;
			text-transform: capitalize;
			color: $black;
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
			padding-left: 1.5rem;
			h4 {
				font-size: 1.5rem;
			}
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

	.video_container {
		position: relative;
		width: 85%;
		.video_default_preview {
			width: 100%;
			max-height: 70vh;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			z-index: 1;
			overflow: hidden;
			picture {
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;
				display: block;
				filter: grayscale(100%) brightness(130%);
				opacity: 0.8;
			}
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
		margin: 25px 0;

		.text {
			display: flex;
			flex-direction: column;
			padding: 40px;
			max-width: 50%;
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

// @media (min-width: 1700px) {
// 	.project_post{
// 		.intro .title{
// 			font-size: 4rem;
// 			bottom: -1px;

// 		}
// 		.info p {
// 			font-size: 1.8rem;
// 		}
// 	}
// }
@media (max-width: 900px) {
	.container::after {
		z-index: -1;
	}
	.project_post {
		&::after {
			display: none;
		}
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
			padding-left: 55px;

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
			padding: 0 30px 0 55px;
		}

		.image {
			width: 100%;
		}

		.image_text {
			flex-direction: column;

			.text {
				display: flex;
				flex-direction: column;
				padding: 0 30px 0 55px;
				max-width: 100%;
				p {
					margin-bottom: 25px;
				}
			}
			picture {
				margin-bottom: 40px;
			}
		}

		.video_container {
			width: 95%;
		}
	}
}
</style>
