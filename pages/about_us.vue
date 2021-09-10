<template>
	<div class="container">
		<!-- <template v-if="$fetchState.error"> -->
			<!-- <Error /> -->
		<!-- </template> -->
		<!-- <template v-if="!$fetchState.pending"> -->
			<!-- <div v-for="slice in data.body" :key="slice.slice_type">
				<HomeIntro v-if="slice.slice_type == 'home_intro'" :data="slice" />
				<Achievements v-else-if="slice.slice_type == 'achievements'" :data="slice" />
				<LazyServicesList v-else-if="slice.slice_type == 'services_list'" :data="slice" />
				<LazyHighlightProjects v-else-if="slice.slice_type == 'highlight_projects'" :data="slice" />
			</div> -->
		<!-- </template> -->
	</div>
</template>

<script>
export default {
	name: 'about_us',

	data: () => ({
		data: [],
	}),
	async fetch() {
		await this.$prismic.api
			.getSingle('about_us', { lang: this.$i18n.localeProperties.prismic })
			.then(async (fetch) => {
				// send data to store
				await console.log(fetch)
				// await this.$store.dispatch('storeSingle', fetch)
				// this.data = fetch.data
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
	},
	head() {
		// return this.$store.getters.page.head
	},
	computed: {
		// blogPosts() {
		// 	return this.$store.getters.blogPosts
		// },
	},
	watch: {
		// async blogPosts(newValue, oldValue) {
		// 	await this.$nextTick()
		// 	// postAnim(this.$refs.grid.children, true)
		// },
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
.blog {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 80px;
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
			font-size: 1.2rem;
			font-weight: bold;
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
		flex: 1;
		min-height: 1040px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 40px;
		grid-auto-rows: 500px;
		padding-right: 4rem;
		// grid-auto-rows: minmax(25rem, auto);
		.blog_card {
			&:first-child {
				grid-column: 1 / 4;
				grid-row: 1 / 2;
			}
		}
	}
	.pagination {
		width: calc(100% - 240px);
		margin-top: 80px;
		margin-left: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		.pages {
			max-width: 300px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			align-content: center;
			.page {
				cursor: pointer;
				user-select: none;
				width: 35px;
				height: 35px;
				margin-right: 35px;
				display: flex;
				justify-content: center;
				align-items: center;
				align-content: center;
				border: 1px solid transparent;
				color: $black;
				transition: all 0.2s ease;
				&:last-child {
					margin-right: 0;
				}
				&.active {
					color: $primary;
					background: $black;
				}
				&:hover {
					border: 1px solid $black;
				}
			}
		}
		svg {
			margin: 0 35px;
			cursor: pointer;
			transition: all 0.2 ease-in-out;
			&.disable {
				cursor: initial;
				opacity: 0.5;
			}
		}
	}
}
@media (min-width: 1900px) {
	.blog .grid {
		grid-template-columns: repeat(5, 1fr);
	}
}
// @media (min-width: 1700px) {
// 	.blog {
// 		.filter span {
// 			font-size: 1.5rem;
// 		}
// 	}
// }
@media (max-width: 1300px) {
	.blog .grid {
		grid-template-columns: repeat(3, 1fr);
		.blog_card {
			&:first-child {
				grid-column: 1;
				grid-row: 1;
				.image {
					width: auto;
					height: auto;
				}
				.info {
					display: flex;
					justify-content: initial;
					padding-bottom: 20px;
					position: initial;
					width: initial;
					height: initial;
					padding: initial;
					flex-direction: initial;
				}
			}
		}
	}
}
@media (max-width: 960px) {
	.blog {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
}
@media (max-width: 900px) {
	.blog {
		flex-direction: column;
		margin-bottom: 40px;
		.filter {
			margin-left: 0;
			width: 50%;
		}
		.grid {
			width: 100%;
			margin-top: 4rem;
			gap: 20px;
			padding: 0 40px;
			grid-auto-rows: 350px;
		}
		.pagination {
			width: 100%;
			margin: 40px 0;
			svg {
				margin: 0 15px;
			}
		}
	}
}
</style>
