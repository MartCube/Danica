<template>
	<section>
		<template v-if="!$fetchState.pending">
			<div class="name">
				<span>projects</span>
			</div>
			<div class="content">
				<h2 class="title">Stay up to date with the newsest projects</h2>

				<div class="project_slider">
					<div v-swiper="swiperOption" class="swiper-container">
						<div class="swiper-wrapper">
							<ProjectCard v-for="(project, i) in projects" :key="i" :data="project" class="swiper-slide" />
						</div>
					</div>
				</div>

				<n-link :to="localePath('/projects')">
					<ButtonItem> all projects </ButtonItem>
				</n-link>
			</div>
		</template>
	</section>
</template>

<script>
export default {
	props: {
		filterTag: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		page_size: 6,
		projects: null,
		swiperOption: {
			slidesPerView: 'auto',
			spaceBetween: 50,
			loop: true,
		},
	}),
	async fetch() {
		const projects = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'project_post'), this.$prismic.predicates.at('document.tags', this.filterTag)], {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.page_size,
		})

		this.projects = projects.results
	},
}
</script>

<style lang="scss" scoped>
section .name {
	min-width: 240px;
	width: 100%;
}
.content {
	display: flex;
	flex-direction: column;
	.project_slider {
		width: 100vw;
		margin-bottom: 50px;
		.swiper-container {
			width: auto;
			margin: 0;
		}
		position: relative;
	}
}

@media (max-width: 900px) {
	.content {
		.project_slider {
			width: 700px;
			margin-bottom: 20px;
			.swiper-container {
				width: 700px;
				.swiper-wrapper .image {
					height: 200px;
				}
			}
		}
	}
}
</style>
