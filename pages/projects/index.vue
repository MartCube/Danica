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

			<div ref="grid" class="grid">
				<template v-if="!$fetchState.pending">
					<ProjectCard v-for="(project, i) in projects" :key="i" :data="project" />
				</template>
			</div>
		</div>
		<ButtonItem v-if="current_page < total_pages" @click.native="loadMore"> Load More </ButtonItem>
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
		min-width: 240px;
		// margin-left: -240px;
		padding-right: 30px;
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
			font-size: 1.4rem;

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
<<<<<<< HEAD
		width: 100%;
		padding-left: 1.5rem;
=======
		width: calc(100vw - 240px);
		padding-right: 1.5rem;
>>>>>>> 80844a8a6d1d7910535e06a0feb854bc025211a9
		// max-width: 1000px;
		height: 100%;
		min-height: 800px;

		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		.project_card {
			margin-right: 2rem;
		}
	}
}

button {
<<<<<<< HEAD
	margin-top: 40px;
	margin-left: 3rem;
=======
	margin: 5% 0 2% 15rem;
>>>>>>> 80844a8a6d1d7910535e06a0feb854bc025211a9
	color: $black;
}

@media (max-width: 900px) {
	.projects {
		flex-direction: column;
		.filter {
			margin-left: -10vw;
			width: 50%;
			min-width: auto;
			padding: 0;
			margin-bottom: 25px;
		}
		.grid {
			width: 100%;
			padding: 0;
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
@media (max-width: 320px) {
	.projects {
		.filter {
			width: 60%;
		}
	}
}
</style>
