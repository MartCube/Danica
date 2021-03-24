<template>
	<section>
		<template v-if="!$fetchState.pending">
			<div class="name">
				<span>projects</span>
			</div>
			<div class="content">
				<h2 class="title">Latest projects</h2>
				<div class="grid">
					<ProjectCard v-for="(project, i) in projects" :key="i" :data="project" />
				</div>
				<ButtonItem> all projects </ButtonItem>
			</div>
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
.content {
	display: flex;
	flex-direction: column;
	.grid {
		width: 1000px;
		display: flex;
		justify-content: space-between;
	}
}
</style>
