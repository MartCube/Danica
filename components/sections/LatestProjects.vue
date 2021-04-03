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
				<ButtonItem> all projects </ButtonItem>
			</div>
		</template>
	</section>
</template>

<script>
export default {
	data: () => ({
		page_size: 6,
		projects: null,
		swiperOption: {
			slidesPerView: 3, // slidesPerView: 'auto',
			spaceBetween: 100,
			loop: true,
		},
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
	.project_slider {
		width: 1100px;
		margin-bottom: 50px;
		.swiper-container {
			width: 1100px;
			margin: 0;
		}
	}
}
</style>
