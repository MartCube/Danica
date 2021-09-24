<template>
	<section class="latest_projects">
		<template v-if="!$fetchState.pending">
			<div class="name">
				<span>{{ name }}</span>
			</div>
			<div class="content">
				<h2 class="title">{{ title }}</h2>
				<template v-if="data.primary.text !== undefined">
					<prismic-rich-text class="rich_text" :field="data.primary.text" />
				</template>
				<div class="project_slider">
					<div class="project_slider_wrapper">
						<ProjectCard v-for="(project, i) in projects" :key="i" :data="project" />
					</div>
				</div>

				<n-link :to="localePath('/projects')">
					<ButtonItem> {{ $t('service.button_all_projects') }} </ButtonItem>
				</n-link>
			</div>
		</template>
	</section>
</template>

<script>
export default {
	name: 'LatestProjects',
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		page_size: 6,
		projects: null,
	}),
	async fetch() {
		const projects = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'project_post'), this.$prismic.predicates.at('document.tags', [this.tag])], {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.page_size,
			lang: this.$i18n.localeProperties.prismic,
		})
		this.projects = projects.results
	},
	computed: {
		name() {
			return this.$prismic.asText(this.data.primary.name)
		},
		title() {
			return this.$prismic.asText(this.data.primary.title)
		},
		tag() {
			return this.data.primary.tag
		},
	},
}
</script>

<style lang="scss" scoped>
section {
	.name {
		max-width: 240px;
		width: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		.rich_text {
			margin: 0 15px 3rem 15px;
			max-width: 40%;
		}
		.project_slider {
			width: 100%;
			overflow-x: auto;
			margin-bottom: 2rem;
			padding-bottom: 2rem;
			@include scrollbar;
			.project_slider_wrapper {
				width: auto;
				height: inherit;
				margin: 0;
				overflow: initial;

				display: inline-flex;
				.project_card {
					margin-right: 2rem;
				}
			}
		}
	}
}
@media (max-width: 900px) {
	section {
		.content {
			.rich_text {
				max-width: 100%;
			}
		}
	}
}
</style>
