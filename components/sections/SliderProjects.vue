<template>
	<section>
		<template v-if="!$fetchState.pending">
			<div class="name">
				<span>projects</span>
			</div>
			<div class="content">
				<h2 class="title">Latest projects</h2>
				<div class="project_slider">
					<div v-swiper="swiperOption" class="swiper-container">
						<div class="swiper-wrapper">
							<ProjectSlide v-for="(project, i) in projects" :key="i" :data="project" class="swiper-slide" />
							<div class="swiper-pagination"></div>
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
		page_size: 5,
		projects: null,
		swiperOption: {
			slidesPerView: 1,
			spaceBetween: 100,
			loop: true,
			autoplay: {
				delay: 500,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.swiper-pagination',
				// dynamicBullets: true,
				clickable: true,
			},
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
		width: 992px;
		margin-bottom: 80px;
		.swiper-container {
			width: 992px;
			margin: 0;
			.swiper-wrapper {
				position: relative;
			}
		}
	}
}

.swiper-pagination {
	width: 50px;
	height: 50px;
	backdrop-filter: red;
}
</style>
