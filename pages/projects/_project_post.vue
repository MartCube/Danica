<template>
	<div class="container">
		<template v-if="$fetchState.error">error </template>
		<template v-else-if="$fetchState.pending">loading </template>
		<template v-else>
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
		width: 75%;
		p {
			font-weight: 300;
			font-size: 1.2rem;
			line-height: 1.5rem;
		}
	}
	.image {
		width: auto;
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
