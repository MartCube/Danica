<template>
	<div class="container">
		<div class="sidebar"></div>
		<Title value="projects" />

		<div class="projects">
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
					<ProjectCard v-for="(project, i) in projects" :key="i" :image="project.data.main_image.url" :title="project.data.title" />
				</template>
			</div>
		</div>
		<span class="load">load more</span>
	</div>
</template>

<script>
export default {
	data: () => ({
		filters: [],
		activeFilter: [],
		projects: Object,

		currentPage: 1,
		results_per_page: 6,
	}),
	async fetch() {
		const projects = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'project_post'), this.$prismic.predicates.at('document.tags', this.activeFilter)], {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.results_per_page,
		})
		this.filters = await this.$prismic.api.tags

		this.projects = projects.results
	},
	methods: {
		filterUpdate(filter) {
			this.activeFilter = [filter]
			if (filter === 'all') this.activeFilter = []

			this.$fetch()
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

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
.load {
	height: 2rem;
	margin-left: 240px;

	display: flex;
	align-items: center;
	cursor: pointer;

	text-transform: capitalize;
	font-size: 1.2rem;

	&::before {
		content: '';
		width: 10px;
		height: 100%;
		margin-right: 10px;
		background: $primary;
	}
}
</style>
