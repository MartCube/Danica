<template>
	<div class="container">
		<Title :value="$t('pages.blog.name')" />

		<div class="blog">
			<div class="filter">
				<span :class="{ active: active_filter[0] == null }" @click="filterUpdate('all')"> {{ $t('pages.blog.filters.all') }} </span>
				<span v-for="(filter, i) in filters" :key="i" :class="{ active: active_filter[0] == filter.key }" @click="filterUpdate(filter.key)">
					{{ filter.name }}
				</span>
			</div>

			<div ref="grid" class="grid">
				<template v-if="$fetchState.error">error</template>
				<template v-else-if="!$fetchState.pending">
					<BlogCard v-for="(post, i) in blogPosts" :key="'post' + i" :class="{ first: i == 0 }" :data="post" />
				</template>
			</div>

			<div class="pagination">
				<Icon name="double" direction="left" :class="{ disable: !prev_page }" @click.native="fetchFirst" />
				<Icon name="chevron" direction="left" :class="{ disable: !prev_page }" @click.native="fetchBack" />
				<MediaQueryProvider :queries="{ mobile: '(max-width: 900px)' }" ssr>
					<MatchMedia v-slot="{ mobile }">
						<div class="pages">
							<span v-if="mobile" class="page active">{{ current_page }}</span>
							<span v-for="i in total_pages" v-else :key="i" :class="{ active: i == current_page }" class="page" @click="fetchPage(i)">{{ i }}</span>
						</div>
					</MatchMedia>
				</MediaQueryProvider>
				<Icon name="chevron" :class="{ disable: !next_page }" @click.native="fetchNext" />
				<Icon name="double" :class="{ disable: !next_page }" @click.native="fetchLast" />
			</div>
		</div>
	</div>
</template>

<script>
import { MediaQueryProvider, MatchMedia } from 'vue-component-media-queries'
import { postAnim } from '~/assets/anime'
export default {
	name: 'Blog',
	components: { MediaQueryProvider, MatchMedia },
	async asyncData({ $prismic, i18n, store }) {
		await store.dispatch('storeSingle', {
			type: 'blog',
			language: i18n.localeProperties.prismic,
		})
		// rewrite data to slcies
		// return {
		// 	slices: store.getters.page.data.body,
		// }
	},
	data: () => ({
		// filters
		active_filter: [],
		// pagination
		current_page: 1,
		page_size: 6,
		total_pages: null,
		prev_page: null,
		next_page: null,
	}),
	async fetch() {
		// rewrite this data in to slices of blog document
		// fetch blog posts
		const blogPosts = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'blog_post'), this.$prismic.predicates.at('document.tags', this.active_filter)], {
			orderings: '[document.last_publication_date desc]',
			pageSize: this.page_size,
			page: this.current_page,
			lang: this.$i18n.localeProperties.prismic,
		})
		this.$store.dispatch('bindBlogPosts', blogPosts.results)
		this.total_pages = blogPosts.total_pages
		this.prev_page = blogPosts.prev_page
		this.next_page = blogPosts.next_page
	},
	head() {
		return this.$store.getters.page.head
	},
	computed: {
		blogPosts() {
			return this.$store.getters.blogPosts
		},
		filters() {
			return [
				{
					name: this.$t('pages.blog.filters.design'),
					key: 'design',
				},
				{
					name: this.$t('pages.blog.filters.architecture'),
					key: 'architecture',
				},
				{
					name: this.$t('pages.blog.filters.energy'),
					key: 'energy save',
				},
				{
					name: this.$t('pages.blog.filters.remont'),
					key: 'remont',
				},
			]
		},
	},
	watch: {
		async blogPosts(newValue, oldValue) {
			await this.$nextTick()
			postAnim(this.$refs.grid.children, true)
		},
	},
	methods: {
		// filters
		filterUpdate(filter) {
			this.active_filter = [filter]
			if (filter === 'all') this.active_filter = []
			// restart results
			this.current_page = 1
			this.next_page = 6
			this.$fetch()
		},
		// pagination
		fetchNext() {
			if (this.next_page) {
				this.current_page++
				this.ScrollToTop()
				this.$fetch()
			}
		},
		fetchBack() {
			if (this.prev_page) {
				this.current_page--
				this.ScrollToTop()
				this.$fetch()
			}
		},
		fetchPage(value) {
			this.current_page = value
			this.ScrollToTop()
			this.$fetch()
		},
		fetchFirst() {
			this.fetchPage(1)
		},
		fetchLast() {
			this.fetchPage(this.total_pages)
		},
		ScrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
	},
}
</script>

<style lang="scss" scoped>
.blog {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 80px;
	.filter {
		min-width: 240px;
		padding-right: 1.5rem;
		background: white;
		height: fit-content;
		position: relative;
		z-index: 6;
		display: flex;
		flex-direction: column;
		span {
			margin: 10px 0;
			text-transform: capitalize;
			white-space: nowrap;
			font-weight: 500;
			font-size: 1.2rem;
			display: flex;
			align-items: center;
			cursor: pointer;
			transition: all 0.1s ease;
			&::before {
				content: '';
				width: 100%;
				height: 1px;
				margin-right: 10px;
				background: $black;
				transition: all 0.2s ease;
			}
			&.active,
			&:hover {
				color: $primary;
				&::before {
					background: $primary;
				}
			}
		}
	}
	.grid {
		flex: 1;
		min-height: 1040px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 40px;
		grid-auto-rows: 500px;
		padding-right: 4rem;
		// grid-auto-rows: minmax(25rem, auto);
		.blog_card {
			&:first-child {
				grid-column: 1 / 4;
				grid-row: 1 / 2;
			}
		}
	}
	.pagination {
		width: calc(100% - 240px);
		margin-top: 80px;
		margin-left: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		.pages {
			max-width: 300px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			align-content: center;
			.page {
				cursor: pointer;
				user-select: none;
				width: 35px;
				height: 35px;
				margin-right: 35px;
				display: flex;
				justify-content: center;
				align-items: center;
				align-content: center;
				border: 1px solid transparent;
				color: $black;
				transition: all 0.2s ease;
				&:last-child {
					margin-right: 0;
				}
				&.active {
					color: $primary;
					background: $black;
				}
				&:hover {
					border: 1px solid $black;
				}
			}
		}
		svg {
			margin: 0 35px;
			cursor: pointer;
			transition: all 0.2 ease-in-out;
			&.disable {
				cursor: initial;
				opacity: 0.5;
			}
		}
	}
}
@media (min-width: 1900px) {
	.blog .grid {
		grid-template-columns: repeat(5, 1fr);
	}
}
// @media (min-width: 1700px) {
// 	.blog {
// 		.filter span {
// 			font-size: 1.5rem;
// 		}
// 	}
// }
@media (max-width: 1100px) {
	.blog .grid {
		grid-template-columns: repeat(3, 1fr);
		.blog_card {
			&:first-child {
				grid-column: 1;
				grid-row: 1;
				.image {
					width: auto;
					height: auto;
				}
				.info {
					display: flex;
					justify-content: initial;
					padding-bottom: 20px;
					position: initial;
					width: initial;
					height: initial;
					padding: initial;
					flex-direction: initial;
				}
			}
		}
	}
}
@media (max-width: 960px) {
	.blog {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
}
@media (max-width: 900px) {
	.blog {
		flex-direction: column;
		margin-bottom: 40px;
		.filter {
			margin-left: 0;
			width: 50%;
		}
		.grid {
			width: 100%;
			margin-top: 4rem;
			gap: 20px;
			padding: 0 40px;
			grid-auto-rows: 350px;
		}
		.pagination {
			width: 100%;
			margin: 40px 0;
			svg {
				margin: 0 15px;
			}
		}
	}
}
</style>
