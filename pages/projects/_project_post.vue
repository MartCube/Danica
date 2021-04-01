<template>
	<div class="container">
		<template v-if="$fetchState.error">error </template>
		<template v-else-if="!$fetchState.pending">
			<div class="project">
				<div class="intro">
					<h2 class="title">{{ post.title }}</h2>
					<ImageItem :src="post.main_image" :alt="post.title" />
				</div>

				<div class="info">
					<p>service: {{ post.info.service }}</p>
					<p>square: {{ post.info.square }}&#13217;</p>
					<p>date: {{ post.info.date }}</p>
					<p>architect: {{ post.info.architect }}</p>
					<p>designer: {{ post.info.designer }}</p>
				</div>

				<!-- Slice Machine -->
				<div v-for="(slice, i) in post.slices" :key="i" class="slice" :class="slice.slice_type">
					<!-- <p v-if="slice.slice_type == 'text'">{{ $prismic.asText(slice.primary.text) }}</p> -->

					<template v-if="slice.slice_type == 'text'">
						<prismic-rich-text class="paragraph" :field="slice.primary.text" />
					</template>

					<template v-else-if="slice.slice_type == 'image'">
						<ImageItem :src="slice.primary.image.url" :alt="alt" />
						<span class="description">"{{ slice.primary.image.alt }}"</span>
					</template>

					<template v-else-if="slice.slice_type == 'image_slider'">
						<div class="image_slider">
							<div v-swiper="swiperOption" class="swiper-container">
								<div class="swiper-wrapper">
									<ImageItem v-for="item in slice.items" :key="item.image.url" class="swiper-slide" :src="item.image.url" alt="alt" />
									<div class="swiper-slide"></div>
								</div>
								<div slot="pagination" class="swiper-pagination"></div>
							</div>
						</div>
					</template>

					<template v-else-if="slice.slice_type == 'image_text'">
						<div class="image_text">
							<ImageItem :src="slice.primary.image.url" alt="alt" />
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
			spaceBetween: 40,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		},
	}),
	async fetch() {
		const post = await this.$prismic.api.getByUID('project_post', this.$route.params.project_post)
		this.post = {
			main_image: post.data.main_image.url,
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
		console.log(post.data.body)
	},
}
</script>

<style lang="scss" scoped>
.project {
	display: flex;
	flex-direction: column;

	& > * {
		margin-bottom: 25px;
	}
	overflow-x: hidden;

	.intro {
		width: 100%;
		height: calc(100vh - 80px);
		display: flex;
		flex-direction: column;

		position: relative;

		.title {
			position: absolute;
			bottom: 0;
			left: 240px;
			z-index: 2;

			padding: 20px 20px 0 20px;
			background: white;

			text-transform: capitalize;
			font-size: 3rem;
		}
	}

	.info {
		margin: 50px 240px;
		width: max-content;
		display: flex;
		flex-direction: column;
		p {
			padding: 20px 0;
			border-bottom: 1px solid $grey;

			text-transform: capitalize;
			color: $black;
			font-weight: 700;
			font-size: 1.2rem;
			line-height: 1.2rem;
		}
	}

	.slice {
		margin-left: 240px;
	}

	.text {
		.paragraph {
			width: 75%;
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
		width: 1840px;
		height: max-content;
		margin-top: 10px;
		margin-bottom: 25px;

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
		img {
			width: 800px;
			height: 450px;
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
}

::v-deep .swiper-wrapper {
	max-width: 900px;
}
</style>
