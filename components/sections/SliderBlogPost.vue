<template>
	<section class="slider_posts">
		<template v-if="!$fetchState.pending">
			<div class="name">
				<span>{{ name }}</span>
			</div>
			<div class="content">
				<h2 class="title">{{ title }}</h2>
				<template v-if="data.primary.description">
					<prismic-rich-text class="rich_text" :field="data.primary.description" />
				</template>
				<div class="post_slider">
					<div class="post_slider_wrapper">
						<BlogCard v-for="(post, i) in posts" :key="i" :data="post" />
					</div>
				</div>

				<n-link :to="localePath('/blog')">
					<ButtonItem> {{ $t('service.button_all_posts') }} </ButtonItem>
				</n-link>
			</div>
		</template>
	</section>
</template>

<script>
export default {
	name: 'SliderBlogPost',
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		page_size: 6,
		posts: null,
	}),
	async fetch() {
		const posts = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'blog_post'), this.$prismic.predicates.at('document.tags', [this.tag])], {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.page_size,
			lang: this.$i18n.localeProperties.prismic,
		})
		this.posts = posts.results
	},
	computed: {
		name() {
			return this.$prismic.asText(this.data.primary.name)
		},
		title() {
			return this.$prismic.asText(this.data.primary.title)
		},
		tag() {
			return this.data.primary.tag
		},
	},
}
</script>

<style lang="scss" scoped>
section {
	.name {
		max-width: 240px;
		width: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		.rich_text {
			margin: 0 15px 3rem 15px;
			max-width: 40%;
		}
		.post_slider {
			width: calc(100% - 220px);
			overflow-x: auto;
			margin-bottom: 2rem;
			padding-bottom: 2rem;
			@include scrollbar;
			.post_slider_wrapper {
				width: auto;
				height: inherit;
				margin: 0;
				overflow: initial;

				display: inline-flex;
				.blog_card {
					margin-right: 2rem;
				}
			}
		}
	}
}
@media (max-width: 900px) {
	section {
		.content {
			.rich_text {
				max-width: 100%;
				margin-right: 0;
			}
			.post_slider {
				width: 100%;
			}
		}
	}
}
</style>
