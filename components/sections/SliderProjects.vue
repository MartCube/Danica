<template>
	<section class="slider_projects">
		<template v-if="!$fetchState.pending">
			<div class="name">
				<span>{{ name }}</span>
			</div>
			<div class="content">
				<h2 class="title">{{ title }}</h2>
				<template v-if="data.primary.text">
					<prismic-rich-text class="rich_text" :field="data.primary.text" />
				</template>
				<div class="project_slider">
					<div class="project_slider_wrapper">
						<ProjectSlide v-for="(project, i) in projects" :key="i" :data="project" />
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
	name: 'SliderProjects',
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		page_size: 5,
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
		text() {
			return this.data.primary.text
		},
		tag() {
			return this.data.primary.tag
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	.rich_text {
		margin: 0 15px 3rem 15px;
		max-width: 40%;
	}
	.project_slider {
		width: calc(100vw - 240px);
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
			.project_slide {
				margin-right: 2rem;
			}
		}
	}
}
@media (max-width: 900px) {
	.content {
		.rich_text {
			max-width: 80%;
		}
	}
}
</style>
