<template>
	<div class="container">
		<template v-if="$fetchState.error">error</template>
		<template v-else-if="!$fetchState.pending">
			<div class="blog_post">
				<div class="intro">
					<h2 class="title">{{ post.title }}</h2>
					<div class="info">
						<span class="date">{{ post.date }}</span>
						<span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
					</div>
					<ImageItem :src="post.image.url" :mobile="post.image.mobile.url" :alt="post.title" />
					<!-- <n-link class="go_back" to="/blog"> <IconArrow />go back </n-link> -->
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
	data: () => ({
		post: Object,
		altLangUid: Object,
		metaTags: Object,

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
		// fetch blog post
		const post = await this.$prismic.api.getByUID('blog_post', this.$route.params.blog_post, { lang: this.$i18n.localeProperties.prismic })

		// store routes for all langs
		this.altLangUid[post.lang.slice(0, 2)] = post.uid
		post.alternate_languages.forEach((alternateLang) => {
			this.altLangUid[alternateLang.lang.slice(0, 2)] = alternateLang.uid
		})
		this.$store.dispatch('i18n/setRouteParams', {
			en: { blog_post: this.altLangUid.en },
			ru: { blog_post: this.altLangUid.ru },
			ua: { blog_post: this.altLangUid.ua },
		})

		// post data
		this.post = {
			image: post.data.image,
			title: this.$prismic.asText(post.data.title),
			date: post.data.date,
			tags: post.tags,
			slices: post.data.body,
		}

		// define meta tags
		if (post.data.meta_title)
			this.metaTags = {
				title: post.data.meta_title,
				description: post.data.meta_description,
				keywords: post.data.meta_keywords,
			}
		// default untill everything is filled
		else
			switch (this.$i18n.localeProperties.prismic) {
				case 'ua-ua':
					return {
						metaTags: {
							title: 'Будівельні послуги | DANICA',
							description: '【Будівельні роботи під ключ】 Послуги в області будівництва ✅ Вигідні ціни ⚡️ Відгуки + Гарантія + Якість ☎️ Телефонуйте ▻',
							keywords: 'default keywords',
						},
					}
				case 'ru':
					return {
						metaTags: {
							title: 'Строительные услуги | DANICA',
							description: '【Строительные работы под ключ】Услуги в области строительства ✅ Выгодные цены ⚡️ Отзывы + Гарантия + Качество ☎️ Звоните ▻',
							keywords: 'default keywords',
						},
					}
				case '':
					return {
						metaTags: {
							title: 'Construction service | DANICA',
							description: '【Turnkey construction work】 Construction services ✅ Favorable prices ⚡️ Reviews + Warranty + Quality ☎️ Call ▻',
							keywords: 'default keywords',
						},
					}
			}
	},
	head() {
		return {
			title: this.metaTags.title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.metaTags.description,
				},
			],
		}
	},
	fetchKey(getCounter) {
		// getCounter is a method that can be called to get the next number in a sequence
		// as part of generating a unique fetchKey.
		return 'blog_post' + getCounter('blog_post')
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

	.slice {
		display: flex;
		&:last-child {
			margin-bottom: 0;
		}
	}

	.text {
		width: 75%;

		.rich_text {
			font-weight: 300;
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
					margin: 0;
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

@media (max-width: 900px) {
	.blog_post {
		margin: 0;

		.intro {
			.title {
				margin: 40px 0;
				padding-left: 40px;
				font-size: 1.5rem;
			}
			.info {
				padding: 0 40px;
			}
			picture {
				// width: 100%;
				height: auto;
			}
		}

		.text {
			width: 100%;
			.rich_text {
				padding: 0 40px;
			}
		}

		.image {
			width: 100%;
			margin: 0;
		}

		.image_text {
			flex-direction: column;
			padding: 0;
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
