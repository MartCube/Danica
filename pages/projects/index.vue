<template>
	<div class="container">
		<Title :value="$t('pages.projects.name')" />

		<div class="projects">
			<div class="filter">
				<span :class="{ active: active_filter[0] == null }" @click="filterUpdate('all')"> {{ $t('pages.projects.filters.all') }} </span>
				<span v-for="(filter, i) in filters" :key="i" :class="{ active: active_filter[0] == filter.key }" @click="filterUpdate(filter.key)">
					{{ filter.name }}
				</span>
			</div>

			<div ref="grid" class="grid">
				<template v-if="$fetchState.error">error</template>
				<template v-else-if="!$fetchState.pending">
					<ProjectCard v-for="(project, i) in projects" :key="i" :data="project" />
				</template>
			</div>

			<div class="pagination">
				<IconDouble left :class="{ disable: !prev_page }" @click.native="fetchFirst" />
				<IconChevron left :class="{ disable: !prev_page }" @click.native="fetchBack" />
				<MediaQueryProvider :queries="{ mobile: '(max-width: 900px)' }" ssr>
					<MatchMedia v-slot="{ mobile }">
						<div class="pages">
							<span v-if="mobile" class="page active">{{ current_page }}</span>
							<span v-for="i in total_pages" v-else :key="i" :class="{ active: i == current_page }" class="page" @click="fetchPage(i)">{{ i }}</span>
						</div>
					</MatchMedia>
				</MediaQueryProvider>
				<IconChevron :class="{ disable: !next_page }" @click.native="fetchNext" />
				<IconDouble :class="{ disable: !next_page }" @click.native="fetchLast" />
			</div>
		</div>
	</div>
</template>

<script>
import { MediaQueryProvider, MatchMedia } from 'vue-component-media-queries'
import { postAnim } from '~/assets/anime'

export default {
	name: 'Projects',
	components: { MediaQueryProvider, MatchMedia },
	async asyncData({ i18n, store }) {
		await store.dispatch('storeSingle', {
			type: 'projects',
			language: i18n.localeProperties.prismic,
		})
		// rewrite data to slcies
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
		// fetch project posts
		const projects = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'project_post'), this.$prismic.predicates.at('document.tags', this.active_filter)], {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.page_size,
			page: this.current_page,
			lang: this.$i18n.localeProperties.prismic,
		})

		this.$store.dispatch('bindProjects', projects.results)
		this.total_pages = projects.total_pages
		this.prev_page = projects.prev_page
		this.next_page = projects.next_page
	},
	head() {
		return this.$store.getters.page.head
	},
	computed: {
		projects() {
			return this.$store.getters.projects
		},
		filters() {
			return [
				{
					name: this.$t('pages.projects.filters.design'),
					key: 'design',
				},
				{
					name: this.$t('pages.projects.filters.architecture'),
					key: 'architecture',
				},
				{
					name: this.$t('pages.projects.filters.construction'),
					key: 'construction',
				},
				{
					name: this.$t('pages.projects.filters.remont'),
					key: 'remont',
				},
			]
		},
	},
	watch: {
		async projects(newValue, oldValue) {
			await this.$nextTick()
			postAnim(this.$refs.grid.children, true)
		},
	},
	methods: {
		filterUpdate(filter) {
			this.active_filter = [filter]
			if (filter === 'all') this.active_filter = []

			// restart results
			this.total_pages = 0
			this.current_page = 1
			this.page_size = 6

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
.projects {
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
		min-height: 900px;

		border-left: 1px solid $line;

		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		.project_card {
			margin-right: 2rem;
		}
	}

	.pagination {
		width: calc(100% - 240px);
		margin-top: 40px;
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

@media (min-width: 1700px) {
	.projects {
		.filter span{
			font-size: 1.7rem;
		}
	}

}
@media (max-width: 900px) {
	.container {
		&::after {
			display: none;
		}
		.projects {
			flex-direction: column;
			.filter {
				width: 50%;
				min-width: auto;
				padding: 0;
				margin-bottom: 25px;
			}
			.grid {
				width: 93%;
				min-height: 450px;
				padding-left: 40px;

				justify-content: space-between;
				.project_card {
					margin-right: 0;
				}
			}
		}
		.pagination {
			width: 100%;
			svg {
				margin: 0 15px;
			}
		}
	}
}
@media (max-width: 320px) {
	.projects {
		.filter {
			width: 60%;
		}
	}
}
</style>
