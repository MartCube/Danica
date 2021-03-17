<template>
	<section class="latest_projects">
		<template v-if="!$fetchState.pending">
			<h2 class="title">Latest projects</h2>
			<div ref="grid" class="grid">
				<ProjectCard v-for="(project, i) in projects" :key="i" :data="project" />
			</div>
			<ButtonItem> all projects </ButtonItem>
		</template>
	</section>
</template>

<script>
export default {
	data: () => ({
		page_size: 3,
		projects: null,
	}),
	async fetch() {
		const projects = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'project_post'), {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.page_size,
		})
		this.projects = projects.results
	},
	computed: {},
	methods: {},
}
</script>

<style lang="scss" scoped>
.latest_projects {
	display: flex;
	flex-direction: column;

	.grid {
		width: 1000px;
		display: flex;
		justify-content: space-between;
	}
}
</style>
