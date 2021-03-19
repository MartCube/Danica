<template>
	<section>
		<template v-if="!$fetchState.pending">
			<div class="name">
				<span>projects</span>
			</div>
			<div class="content">
				<h2 class="title">We offer more than a service</h2>
				<div ref="grid" class="grid">
					<HighlightCard v-for="(project, i) in projects" :key="'post' + i" :first="i == 0" :data="project" />
				</div>
			</div>
		</template>
	</section>
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
.content {
	display: flex;
	flex-direction: column;

	.grid {
		width: 1000px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
}
</style>
