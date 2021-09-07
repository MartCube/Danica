<template>
	<section>
		<template v-if="!$fetchState.pending">
			<div class="name">
				<span>{{ name }}</span>
			</div>
			<div class="content">
				<h2 class="title">{{ title }}</h2>
				<div class="project_slider">
					<div class="project_slider_wrapper">
						<ProjectSlide v-for="(project, i) in projects" :key="i" :data="project" class="swiper-slide" />
					</div>
				</div>

				<ButtonItem> {{ $t('service.button_all_projects') }} </ButtonItem>
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
			.project_slide {
				margin-right: 2rem;
			}
		}
	}
}

@media (max-width: 900px) {
	.content {
		.project_slider {
			// width: 350px;
			.swiper-container {
				align-items: flex-start;
			}
			.swiper-container-horizontal > .swiper-pagination-bullets {
				align-self: flex-end;
			}
		}
	}
}

::v-deep {
	--swiper-theme-color: rgb(255, 196, 36);
}
::v-deep .swiper-pagination-bullet {
	width: 12px;
	height: 12px;
	border-radius: 10px;
	transition: width 0.3s ease;
	&.swiper-pagination-bullet-active {
		width: 40px;
	}
}

::v-deep .swiper-pagination {
	position: initial;
	margin: 25px 0;
	width: max-content;
	height: 20px;
	display: flex;
}

::v-deep .swiper-wrapper {
	// max-width: 900px;
	height: 100%;
}
</style>
