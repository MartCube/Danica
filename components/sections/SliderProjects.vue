<template>
	<section>
		<template v-if="!$fetchState.pending">
			<div class="name">
				<span>projects</span>
			</div>
			<div class="content">
				<h2 class="title">Stay up to date with the latest projects</h2>
				<div class="project_slider">
					<div v-swiper="swiperOption" class="swiper-container">
						<div class="swiper-wrapper">
							<ProjectSlide v-for="(project, i) in projects" :key="i" :data="project" class="swiper-slide" />
						</div>
						<div slot="pagination" class="swiper-pagination"></div>
					</div>
				</div>

				<ButtonItem> All projects </ButtonItem>
			</div>
		</template>
	</section>
</template>

<script>
export default {
	name: 'SliderProjects',
	props: {
		tag: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		page_size: 5,
		projects: null,
		swiperOption: {
			slidesPerView: 'auto',
			loop: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: true,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			breakpoints: {
				500: {
					spaceBetween: 60,
					autoplay: false,
				},
				320: {
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
.content {
	display: flex;
	flex-direction: column;
	.project_slider {
		width: 100;
		overflow: hidden;

		.swiper-container {
			width: inherit;
			height: inherit;
			margin: 0;
			overflow: initial;

			display: flex;
			flex-direction: column;
			align-items: flex-end;
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
