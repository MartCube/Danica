<template>
	<div class="container">
		<Title :value="$t('pages.projects.name')" />

		<div class="projects">
			<div class="filter">
				<span :class="{ active: active_filter[0] == null }" @click="filterUpdate('all')"> all </span>
				<span v-for="(filter, i) in filters" :key="i" :class="{ active: active_filter[0] == filter }" @click="filterUpdate(filter)">
					{{ filter }}
				</span>
			</div>

			<div ref="grid" class="grid">
				<template v-if="$fetchState.error">error</template>
				<template v-else-if="!$fetchState.pending">
					<ProjectCard v-for="(project, i) in projects" :key="i" :data="project" />
				</template>
				<ButtonItem v-if="current_page < total_pages" @click.native="loadMore"> {{ $t('pages.projects.load_more') }} </ButtonItem>
			</div>
		</div>
	</div>
</template>

<script>
import { postAnim } from '~/assets/anime'

export default {
	name: 'Projects',
	async asyncData({ $prismic, i18n }) {
		// fetch blog page
		const page = await $prismic.api.getSingle('projects', { lang: i18n.localeProperties.prismic })
		// define meta tags
		if (page.data.meta_title)
			return {
				metaTags: {
					title: page.data.meta_title,
					description: page.data.meta_description,
					keywords: page.data.meta_keywords,
				},
			}
		else {
			switch (i18n.localeProperties.prismic) {
				case 'ua-ua':
					return {
						metaTags: {
							title: 'Будівельні послуги | DANICA',
							description: '【Будівельні роботи під ключ】 Послуги в області будівництва ✅ Вигідні ціни ⚡️ Відгуки + Гарантія + Якість ☎️ Телефонуйте ▻',
							keywords: 'default keywords',
						},
					}
				case 'ru':
					return {
						metaTags: {
							title: 'Строительные услуги | DANICA',
							description: '【Строительные работы под ключ】Услуги в области строительства ✅ Выгодные цены ⚡️ Отзывы + Гарантия + Качество ☎️ Звоните ▻',
							keywords: 'default keywords',
						},
					}
				case '':
					return {
						metaTags: {
							title: 'Construction service | DANICA',
							description: '【Turnkey construction work】 Construction services ✅ Favorable prices ⚡️ Reviews + Warranty + Quality ☎️ Call ▻',
							keywords: 'default keywords',
						},
					}
			}
		}
	},
	data: () => ({
		filters: ['design', 'architecture', 'remont'],
		active_filter: [],
		total_pages: 0,
		current_page: 1,
		page_size: 6,
	}),
	async fetch() {
		// fetch project posts
		const projects = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'project_post'), this.$prismic.predicates.at('document.tags', this.active_filter)], {
			orderings: '[document.first_publication_date desc]',
			pageSize: this.page_size,
			lang: this.$i18n.localeProperties.prismic,
		})

		this.$store.dispatch('bindProjects', projects.results)
		this.total_pages = projects.total_pages
	},
	head() {
		return {
			title: this.metaTags.title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.metaTags.description,
				},
			],
		}
	},
	computed: {
		projects() {
			return this.$store.getters.projects
		},
	},
	watch: {
		async projects(newValue, oldValue) {
			await this.$nextTick()
			postAnim(this.$refs.grid.children, true)
		},
	},
	methods: {
		filterUpdate(filter) {
			this.active_filter = [filter]
			if (filter === 'all') this.active_filter = []

			// restart results
			this.total_pages = 0
			this.current_page = 1
			this.page_size = 6

			this.$fetch()
		},
		loadMore(filter) {
			this.page_size += 6
			this.current_page++

			this.$fetch()
		},
	},
}
</script>

<style lang="scss" scoped>
.projects {
	display: flex;
	.filter {
		min-width: 240px;
		padding-right: 1.5rem;
		background: white;
		height: fit-content;
		position: relative;
		z-index: 6;

		display: flex;
		flex-direction: column;

		span {
			margin: 10px 0;
			text-transform: capitalize;
			white-space: nowrap;
			font-weight: 500;
			font-size: 1.2rem;

			display: flex;
			align-items: center;
			cursor: pointer;
			transition: all 0.1s ease;

			&::before {
				content: '';
				width: 100%;
				height: 1px;
				margin-right: 10px;
				background: $black;
				transition: all 0.2s ease;
			}

			&.active,
			&:hover {
				color: $primary;
				&::before {
					background: $primary;
				}
			}
		}
	}

	.grid {
		width: calc(100vw - 240px);
		max-width: 1500px;
		height: 100%;
		min-height: 800px;
		border-left: 1px solid $line;

		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		.project_card {
			margin-right: 2rem;
		}

		button {
			margin: 80px 20vw 80px 0;
			color: $black;
		}
	}
}

@media (max-width: 900px) {
	.container {
		&::after {
			display: none;
		}
		.projects {
			flex-direction: column;
			.filter {
				width: 50%;
				min-width: auto;
				padding: 0;
				margin-bottom: 25px;
			}
			.grid {
				width: 93%;
				min-height: auto;
				padding-left: 40px;

				justify-content: space-between;
				.project_card {
					margin-right: 0;
				}
				button {
					margin: 40px 0;
					align-self: center;
				}
			}
		}
	}
}
@media (max-width: 320px) {
	.projects {
		.filter {
			width: 60%;
		}
	}
}
</style>
