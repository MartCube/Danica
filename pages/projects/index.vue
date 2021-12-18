<template>
	<div class="container projects">
		<div class="filter">
			<span :class="{ active: active_filter[0] == null }" @click="filterUpdate('all')"> {{ $t('pages.projects.filters.all') }} </span>
			<span v-for="(filter, i) in filters" :key="i" :class="{ active: active_filter[0] == filter.key }" @click="filterUpdate(filter.key)">
				{{ filter.name }}
			</span>
		</div>
		<Title :value="$t('pages.projects.name')" />

		<!-- <div class="projects"> -->
		<div ref="grid" class="grid">
			<template v-if="$fetchState.error">error</template>
			<template v-else-if="!$fetchState.pending">
				<ProjectCard v-for="(project, i) in currentProjects" :key="i" :data="project" />
			</template>
		</div>

		<!-- <ButtonItem v-if="next_page" :animated="false" @click.native="loadMore">load more</ButtonItem> -->
		<!-- </div> -->
	</div>
</template>

<script>
import { postAnim } from '~/assets/anime'
export default {
	name: 'Projects',
	data: () => ({
		// filters
		active_filter: [],
		// pagination
		current_page: 1,
		page_size: 100,
		// total_pages: null,
		// prev_page: null,
		// next_page: null,
		display: null,
		gridHeight: 0,
		allProjects: [],
		currentProjects: [],
	}),
	async fetch() {
		await this.$prismic.api
			.getSingle('projects', { lang: this.$i18n.localeProperties.prismic })
			.then(async (fetch) => {
				// send data to store
				await this.$store.dispatch('storeSingle', fetch)
			})
			.catch((error) => {
				console.log(error)
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('policy page not found')
			})

		// fetch project posts
		const projects = await this.$prismic.api.query([this.$prismic.predicates.at('document.type', 'project_post')], {
			orderings: '[document.last_publication_date desc]',
			pageSize: this.page_size,
			page: this.current_page,
			lang: this.$i18n.localeProperties.prismic,
		})
		this.$store.dispatch('bindProjects', projects.results)
		this.currentProjects = projects.results
		this.allProjects = projects.results

		// this.onResize()
		// this.total_pages = projects.total_pages
		// this.prev_page = projects.prev_page
		// this.next_page = projects.next_page
	},
	fetchKey(getCounter) {
		// getCounter is a method that can be called to get the next number in a sequence
		// as part of generating a unique fetchKey.
		return 'project' + getCounter('project')
	},
	head() {
		return this.$store.getters.page.head
	},
	computed: {
		filters() {
			return [
				{
					name: this.$t('pages.projects.filters.design'),
					key: 'design',
				},
				{
					name: this.$t('pages.projects.filters.architecture'),
					key: 'architecture',
				},
				{
					name: this.$t('pages.projects.filters.construction'),
					key: 'construction',
				},
				{
					name: this.$t('pages.projects.filters.remont'),
					key: 'remont',
				},
			]
		},
	},
	watch: {
		currentLocale(newValue, oldValue) {
			console.log('currentLocale changed')
			this.$nextTick()
			this.fetch()
		},
		async projects(newValue, oldValue) {
			await this.$nextTick()
			postAnim(this.$refs.grid.children, true)
		},
	},
	methods: {
		filterUpdate(filter) {
			this.active_filter = [filter]
			if (filter === 'all') {
				this.active_filter = []
				this.currentProjects = this.allProjects
			} else {
				const filteredArray = []
				this.allProjects.forEach((project) => {
					if (Object.values(project.tags).includes(this.active_filter[0])) {
						filteredArray.push(project)
					}
				})
				this.currentProjects = filteredArray
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	flex-direction: row;
	flex-wrap: wrap;
	&::after {
		display: none;
	}
}
.projects {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 80px;
	width: 100%;

	.grid {
		width: 100%;
		flex-flow: wrap;
		// max-height: 200vh;
		align-items: flex-start;
		justify-content: flex-start;
		display: flex;
		.project_card {
			width: 33.33%;
			float: left;
			height: 20vw;
			// &.portrait {
			// 	height: 40vw;
			// }
		}
	}
	button {
		margin: 80px 30vw 80px 240px;
		color: $black;
	}
}
.filter {
	width: 240px;
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
		font-weight: bold;
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

// @media (min-width: 1700px) {
// 	.projects {
// 		.filter span {
// 			font-size: 1.7rem;
// 		}
// 	}
// }
@media (max-width: 900px) {
	.container {
		&::after {
			display: none;
		}
		.filter {
			width: 50%;
			min-width: auto;
			padding: 0;
			margin-bottom: 25px;
		}
		.grid {
			min-height: auto;
			.project_card {
				height: 30vw;
				width: 50%;
				margin-right: 0;
				// aspect-ratio: 16 / 9;
				&.portrait {
					height: 60vw;
					// picture {
					// 	aspect-ratio: 2 / 3;
					// }
				}
			}
		}
	}
}
@media (max-width: 600px) {
	.container {
		.title {
			padding-left: 0;
		}
	}
	.projects {
		.grid {
			max-height: initial !important;
			flex-wrap: wrap;
			.project_card {
				width: 100%vw;
				height: 65vw;
				&.portrait {
					height: 80vh;
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
