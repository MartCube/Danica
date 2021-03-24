<template>
	<div class="container">
		<Title value="projects" />

		<div class="projects">
			<div class="filter">
				<span :class="{ active: active_filter[0] == null }" @click="filterUpdate('all')"> all </span>
				<span v-for="(filter, i) in filters" :key="i" :class="{ active: active_filter[0] == filter }" @click="filterUpdate(filter)">
					{{ filter }}
				</span>
			</div>

			<template v-if="$fetchState.error">error component</template>
			<template v-else-if="!$fetchState.pending">
				<div ref="grid" class="grid">
					<ProjectCard v-for="(project, i) in projects" :key="i" :data="project" />
				</div>
			</template>
		</div>
		<ButtonItem v-if="current_page < total_pages" @click.native="loadMore"> load more </ButtonItem>
	</div>
</template>

<script>
import { postAnim } from '~/assets/anime'

export default {
	name: 'Projects',
	data: () => ({
		filters: ['design', 'architecture', 'remont'],
		active_filter: [],
		total_pages: 0,
		current_page: 1,
		page_size: 6,
	}),
	async fetch() {
		const projects = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'project_post'), this.$prismic.predicates.at('document.tags', this.active_filter)], {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.page_size,
		})

		this.$store.dispatch('bindProjects', projects.results)
		this.total_pages = projects.total_pages
	},
	computed: {
		projects() {
			return this.$store.getters.projects
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
		loadMore(filter) {
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
		max-width: 1000px;
		width: 100%;
		min-height: 700px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}
}

button {
	margin-left: 240px;
	color: $black;
}
</style>
