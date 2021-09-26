<template>
	<div class="container about_us">
		<template v-if="$fetchState.error">
			<Error />
		</template>
		<template v-if="!$fetchState.pending">
			<Title :value="data.title" />
			<div class="main_text">
				<p>{{ data.summary[0].text }}</p>
			</div>
			<div v-for="(slice, i) in data.body" :key="i + slice.slice_type">
				<Quote v-if="slice.slice_type == 'quote'" :data="slice" />
				<LazyLatestProjects v-else-if="slice.slice_type == 'sliderprojects'" :data="slice" />
				<TitleText v-else-if="slice.slice_type == 'TitlePlainText'" :data="slice" />
				<template v-else-if="slice.slice_type == 'team'">
					<div class="team_grid">
						<div class="team_grid_wrapper">
							<MemberCard v-for="(member, y) in slice.items" :key="y" :data="member" :parent="$route.path.slice(1, $route.path.length - 1)" />
						</div>
					</div>
				</template>
				<TitlePlainTextImage v-else-if="slice.slice_type == 'TitlePlainTextImage'" :data="slice" />
				<LazySliderBlogPost v-else-if="slice.slice_type == 'SliderBlogPost'" :data="slice" />
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'AboutUs',

	data: () => ({
		data: [],
		slices: [],
	}),
	async fetch() {
		await this.$prismic.api
			.getSingle('about_us', { lang: this.$i18n.localeProperties.prismic })
			.then(async (fetch) => {
				// send data to store
				// await console.log(fetch.data.body)
				await this.$store.dispatch('storeSingle', fetch)
				this.data = await fetch.data
				// this.slices = fetch.body
			})
			.catch((error) => {
				console.log(error)
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('about us page not found')
			})
	},
	head() {
		return this.$store.getters.page.head
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
.about_us {
	.main_text {
		margin-left: 256px;
		max-width: 40vw;
	}
	.latest_projects {
		padding-bottom: 80px;
	}
	.team_grid {
		padding-left: 240px;
		width: 100%;
		.team_grid_wrapper {
			display: flex;
			flex-wrap: wrap;
		}
	}
}
@media (min-width: 1900px) {
}
@media (max-width: 1300px) {
}
@media (max-width: 960px) {
}
@media (max-width: 900px) {
	.about_us {
		padding-bottom: 4rem;
		.main_text {
			margin-left: 100px;
			max-width: 100%;
			margin-right: 20px;
		}
		.latest_projects {
			padding-bottom: 0;
		}
	}
}
@media (max-width: 400px) {
	.about_us {
		.main_text {
			margin-left: 50px;
		}
	}
}
</style>
