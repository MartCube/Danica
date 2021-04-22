<template>
	<section>
		<template v-if="!$fetchState.pending">
			<div class="name">
				<span>projects</span>
			</div>
			<div class="content">
				<h2 class="title">Stay up to date with our latest projects</h2>

				<div class="project_slider">
					<div v-swiper="swiperOption" class="swiper-container">
						<div class="swiper-wrapper">
							<ProjectCard v-for="(project, i) in projects" :key="i" :data="project" class="swiper-slide" />
						</div>
					</div>
				</div>

				<n-link :to="localePath('/projects')">
					<ButtonItem> All projects </ButtonItem>
				</n-link>
			</div>
		</template>
	</section>
</template>

<script>
export default {
	name: 'LatestProjects',
	props: {
		tag: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		page_size: 6,
		projects: null,
		swiperOption: {
			slidesPerView: 'auto',
			loop: true,
			breakpoints: {
				500: {
					spaceBetween: 60,
				},
				350: {
					spaceBetween: 20,
				},
			},
		},
	}),
	async fetch() {
		const projects = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'project_post'), this.$prismic.predicates.at('document.tags', this.tag)], {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.page_size,
		})
		this.projects = projects.results
	},
}
</script>

<style lang="scss" scoped>
section {
	.name {
		min-width: 240px;
		width: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;

		.project_slider {
			width: 100vw;
			margin-bottom: 40px;
			.swiper-container {
				width: auto;
				margin: 0;
			}
			position: relative;
		}
	}
}

::v-deep .swiper-wrapper {
	.image {
		max-width: 300px;
		max-height: 300px;
	}
}
</style>
