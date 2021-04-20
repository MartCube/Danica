<template>
	<MediaQueryProvider :queries="{ mobile: '(max-width: 1100px)' }" ssr>
		<MatchMedia v-slot="{ mobile }">
			<LatestProjects v-if="mobile" :tag="['highlight']" />

			<section v-else>
				<template v-if="!$fetchState.pending">
					<div class="name">
						<span>projects</span>
					</div>
					<div class="content">
						<h2 class="title">{{ title }}</h2>

						<div ref="grid" class="grid">
							<HighlightCard v-for="(project, i) in projects" :key="'post' + i" :first="i == 0" :last="i + 1 == projects.length" :data="project" />
						</div>
					</div>
				</template>
			</section>
		</MatchMedia>
	</MediaQueryProvider>
</template>

<script>
import { MediaQueryProvider, MatchMedia } from 'vue-component-media-queries'

export default {
	name: 'HighlightProjects',
	components: { MediaQueryProvider, MatchMedia },
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		page_size: 5,
		projects: [],
	}),
	async fetch() {
		const projects = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'project_post'), this.$prismic.predicates.at('document.tags', ['highlight'])], {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.page_size,
		})
		this.projects = projects.results
	},
	fetchOnServer: false,
	computed: {
		firstProject() {
			return this.projects[0]
		},
		title() {
			return this.$prismic.asText(this.data.highlight_projects_title)
		},
	},
}
</script>

<style lang="scss" scoped>
section {
	margin: 0;
}
.content {
	display: flex;
	flex-direction: column;

	.grid {
		width: calc(100% - 100px);
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
