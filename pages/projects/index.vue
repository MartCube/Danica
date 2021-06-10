<template>
	<div class="container">
		<Title :value="$t('pages.projects.name')" />

		<div class="projects">
			<div class="filter">
				<span :class="{ active: active_filter[0] == null }" @click="filterUpdate('all')"> all </span>
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
		</div>

		<ButtonItem v-show="current_page < total_pages" @click.native="loadMore"> {{ $t('pages.projects.load_more') }} </ButtonItem>
	</div>
</template>

<script>
import { postAnim } from '~/assets/anime'

export default {
	name: 'Projects',
	async asyncData({ i18n, store }) {
		await store.dispatch('storeSingle', {
			type: 'projects',
			language: i18n.localeProperties.prismic,
		})
		// rewrite data to slcies
	},
	data: () => ({
		active_filter: [],
		total_pages: 0,
		current_page: 1,
		page_size: 6,
		button: true,
	}),
	async fetch() {
		// fetch project posts
		const projects = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'project_post'), this.$prismic.predicates.at('document.tags', this.active_filter)], {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.page_size,
			lang: this.$i18n.localeProperties.prismic,
		})

		this.$store.dispatch('bindProjects', projects.results)
		this.total_pages = projects.total_pages
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
		loadMore() {
			this.page_size += 6
			this.current_page++

			this.$fetch()
		},
	},
}
</script>

<style lang="scss" scoped>
.projects {
	display: flex;
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
		width: calc(100vw - 240px);
		max-width: 1500px;
		height: 100%;
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
}

button {
	margin: 80px 0 80px 240px;
	color: $black;
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
				min-height: auto;
				padding-left: 40px;

				justify-content: space-between;
				.project_card {
					margin-right: 0;
				}
			}
		}
		button {
			margin: 40px 0;
			align-self: center;
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
