<template>
	<div class="container">
		<template v-if="$fetchState.error">
			<Error />
		</template>
		<div v-else-if="!$fetchState.pending" class="member">
			<!-- <div class="intro">
				<h2 class="title">{{ $prismic.asText(data.title) }}</h2>
				<div class="info">
					<span class="date">{{ data.date }}</span>
					<span v-for="tag in data.tags" :key="tag" class="tag">{{ tag }}</span>
				</div>
				<template v-if="data">
					<ImageItem :src="data.image.url" :mobile="data.image.mobile.url" :alt="$prismic.asText(data.title)" />
				</template> -->
				<!-- <n-link class="go_back" to="/blog"> <Icon name="arrow" />go back </n-link> -->
			<!-- </div> -->

			<!-- Slice Machine -->
			<!-- <div v-for="(slice, i) in data.body" :key="i" class="slice" :class="slice.slice_type">
				<template v-if="slice.slice_type == 'text'">
					<prismic-rich-text class="rich_text" :field="slice.primary.text" />
				</template>

				<template v-else-if="slice.slice_type == 'image'">
					<ImageItem :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :alt="slice.primary.image.alt" />
					<span class="description">"{{ slice.primary.image.alt }}"</span>
				</template>

				<template v-else-if="slice.slice_type == 'image_slider'">
					<div class="image_slider">
						<div class="image_slider_wrapper">
							<ImageItem v-for="item in slice.items" :key="item.image.url" :src="item.image.url" />
						</div>
					</div>
				</template>

				<template v-else-if="slice.slice_type == 'image_text'">
					<div class="image_text">
						<ImageItem :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :alt="slice.primary.image.alt" />
						<div class="text">
							<p v-for="(item, key) in slice.items" :key="key">{{ $prismic.asText(item.text) }}</p>
						</div>
					</div>
				</template>

				<template v-else-if="slice.slice_type == 'video'">
					<VideoItem :video="slice.primary.video" />
				</template>
			</div> -->
		</div>
	</div>
</template>

<script>
export default {
	name: 'TeamMember',
	data: () => ({
		data: null,
	}),
	async fetch() {
		await this.$prismic.api
			.getByUID('team_member', this.$route.params.team_member, { lang: this.$i18n.localeProperties.prismic })
			.then(async (fetch) => {
				// send data to store
				// await this.$store.dispatch('storeByUID', {
				// 	type: 'team_member',
				// 	path: this.$route.fullPath,
				// 	fetch,
				// })
				this.data = await fetch.data
				console.log(this.data);
			})
			.catch((error) => {
				console.log(error)
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('member not found')
			})
	},
	head() {
		// return this.$store.getters.page.head
	},

	// fetchKey(getCounter) {
	// 	// getCounter is a method that can be called to get the next number in a sequence
	// 	// as part of generating a unique fetchKey.
	// 	return 'blog_post' + getCounter('blog_post')
	// },
}
</script>

<style lang="scss" scoped>
.member {

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
	}
}
</style>
