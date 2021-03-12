<template>
	<div class="container">
		<template v-if="$fetchState.error">error</template>
		<template v-else-if="$fetchState.pending">loading</template>
		<template v-else>
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
						<Slider :images="slice.items" />
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
	margin: 0 240px;

	display: flex;
	flex-direction: column;
	align-items: flex-end;
	& > * {
		margin-bottom: 25px;
	}
	border-left: 1px solid black;
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
		width: 100%;
	}
}
</style>
