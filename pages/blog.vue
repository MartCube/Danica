<template>
	<div class="container">
		<Title value="blog" />

		<div class="blog">
			<div class="filter">
				<span :class="{ active: activeFilter[0] == null }" @click="filterUpdate('all')"> all </span>
				<span v-for="filter in filters" :key="filter" :class="{ active: activeFilter[0] == filter }" @click="filterUpdate(filter)">{{ filter }}</span>
			</div>
			<div class="grid">
				<template v-if="$fetchState.error" class="error">
					<p>error..</p>
				</template>
				<template v-if="$fetchState.pending" class="loading">
					<Spinner />
				</template>
				<template v-if="!$fetchState.error && !$fetchState.pending">
					<BlogCard v-for="(post, i) in blogPosts" :key="i" :class="{ first: i == 0 }" :data="post.data" />
				</template>
			</div>

			<div class="pagination">
				<!-- <span :class="{ disable: prev_page == null }" class="back" @click="fetchBack"> <i class="icon icon-left" /> </span> -->

				<IconDouble left />
				<IconChevron left :class="{ disable: prev_page == null }" @click.native="fetchBack" />

				<div class="pages">
					<div v-for="i in totalPages" :key="i" :class="{ active: i == currentPage }" class="page" @click="fetchPage(i)">
						<span>{{ i }}</span>
					</div>
					<IconDots />
				</div>

				<!-- <span :class="{ disable: next_page == null }" class="next" @click="fetchNext"> <i class="icon icon-right" /> </span> -->
				<IconChevron :class="{ disable: next_page == null }" class="next" @click.native="fetchNext" />
				<IconDouble />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		filters: [],
		activeFilter: [],
		blogPosts: [],

		currentPage: 1,
		results_per_page: 6,
		totalPages: null,
		prev_page: null,
		next_page: null,
	}),
	async fetch() {
		const blogPosts = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'blog_post'), this.$prismic.predicates.at('document.tags', this.activeFilter)], {
			// orderings: '[document.first_publication_date desc]',
			pageSize: this.results_per_page,
			page: this.currentPage,
		})

		this.filters = await this.$prismic.api.tags
		this.blogPosts = blogPosts.results

		this.totalPages = blogPosts.total_pages
		this.prev_page = blogPosts.prev_page
		this.next_page = blogPosts.next_page
	},
	methods: {
		filterUpdate(filter) {
			this.activeFilter = [filter]
			if (filter === 'all') this.activeFilter = []

			// restart results
			this.currentPage = 1
			this.results_per_page = 6

			this.$fetch()
		},
		fetchNext() {
			this.currentPage++
			this.$fetch()
		},
		fetchBack() {
			this.currentPage--
			this.$fetch()
		},
		fetchPage(value) {
			this.currentPage = value
			this.$fetch()
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

.blog {
	display: flex;
	flex-wrap: wrap;

	.filter {
		width: 240px;
		padding-right: 30px;

		background: white;

		display: flex;
		flex-direction: column;

		span {
			margin: 10px 0;
			text-transform: capitalize;
			white-space: nowrap;

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
		width: calc(100% - 320px);
		height: 1040px;

		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 40px;
		grid-auto-rows: 500px;
		// grid-auto-rows: minmax(25rem, auto);
		.blog_card {
			&:first-child {
				grid-column: 1 / 4;
				grid-row: 1 / 2;
			}
		}
	}

	.pagination {
		flex-basis: 100%;
		width: max-content;
		margin: 100px 240px;

		display: flex;
		justify-content: space-between;
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
				transition: all 0.25s ease;
				&:last-child {
					margin-right: 0;
				}
				&.active {
					color: white;
					background: $primary;
				}
				&:hover {
					border: 1px solid $primary;
				}
			}
		}
	}
}
</style>
