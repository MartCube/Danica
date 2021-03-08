<template>
	<div class="highlight_projects">
		<template v-if="!$fetchState.pending">
			<h2 class="title">We offer more than a service</h2>
			<div ref="grid" class="grid">
				<HighlightCard v-for="(project, i) in projects" :key="'post' + i" :first="i == 0" :data="project" />
			</div>
		</template>
	</div>
</template>

<script>
export default {
	data: () => ({
		page_size: 5,
		projects: null,
	}),
	async fetch() {
		const projects = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'project_post'), this.$prismic.predicates.at('document.tags', ['highlight'])], {
			// orderings: '[document.first_publication_date desc]',
			pageSize: this.page_size,
		})
		this.projects = projects.results
	},
	computed: {},
	methods: {},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

.highlight_projects {
	margin-left: 240px;
	margin-top: 80px;

	display: flex;
	flex-direction: column;

	.title {
		max-width: 500px;
		margin-bottom: 80px;
	}
	.grid {
		width: 1000px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
}
</style>
