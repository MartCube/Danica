<template>
	<div class="container">
		<Title value="blog" />

		<div class="blog">
			<div class="filter">
				<span :class="{ active: active_filter[0] == null }" @click="filterUpdate('all')"> all </span>
				<span v-for="(filter, i) in filters" :key="i" :class="{ active: active_filter[0] == filter }" @click="filterUpdate(filter)">
					{{ filter }}
				</span>
			</div>

			<div ref="grid" class="grid">
				<template v-if="!$fetchState.pending">
					<BlogCard v-for="(post, i) in blogPosts" :key="'post' + i" :class="{ first: i == 0 }" :data="post" />
				</template>
			</div>

			<div class="pagination">
				<IconDouble left :class="{ disable: !prev_page }" @click.native="fetchFirst" />
				<IconChevron left :class="{ disable: !prev_page }" @click.native="fetchBack" />
				<div class="pages">
					<span v-for="i in total_pages" :key="i" :class="{ active: i == current_page }" class="page" @click="fetchPage(i)">{{ i }}</span>
					<!-- <IconDots /> -->
				</div>
				<IconChevron :class="{ disable: !next_page }" @click.native="fetchNext" />
				<IconDouble :class="{ disable: !next_page }" @click.native="fetchLast" />
			</div>
		</div>
	</div>
</template>

<script>
import { postAnim } from '~/assets/anime'

export default {
	data: () => ({
		// filters
		filters: ['design', 'architecture', 'energy save', 'remont'],
		active_filter: [],

		// pagination
		current_page: 1,
		page_size: 6,
		total_pages: null,
		prev_page: null,
		next_page: null,
	}),
	async fetch() {
		const blogPosts = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'blog_post'), this.$prismic.predicates.at('document.tags', this.active_filter)], {
			orderings: '[document.last_publication_date desc]',
			pageSize: this.page_size,
			page: this.current_page,
		})

		this.$store.dispatch('bindBlogPosts', blogPosts.results)
		this.total_pages = blogPosts.total_pages
		this.prev_page = blogPosts.prev_page
		this.next_page = blogPosts.next_page
	},
	computed: {
		blogPosts() {
			return this.$store.getters.blogPosts
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
				this.$fetch()
			}
		},
		fetchBack() {
			if (this.prev_page) {
				this.current_page--
				this.$fetch()
			}
		},
		fetchPage(value) {
			this.current_page = value
			this.$fetch()
		},
		fetchFirst() {
			this.fetchPage(1)
		},
		fetchLast() {
			this.fetchPage(this.total_pages)
		},
	},
}
</script>

<style lang="scss" scoped>
.blog {
	display: flex;
	flex-wrap: wrap;

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
		margin: 100px 0;
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
		.filter {
			margin-left: 0;
			width: 50%;
		}
		.grid {
			width: 100%;
			margin-top: 4rem;
			gap: 20px;
			padding: 0 40px;
		}
		.pagination {
			margin: 3rem auto;
		}
	}
}
</style>
