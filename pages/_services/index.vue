<template>
	<div class="container">
		<template v-if="!$fetchState.pending">
			<div v-for="(slice, i) in slices" :key="slice.slice_type + i">
				<ServiceIntro v-if="slice.slice_type == 'serviceintro'" :data="slice" />
				<Values v-else-if="slice.slice_type == 'values'" :data="slice" />
				<Stages v-else-if="slice.slice_type == 'stages'" :data="slice" />
				<Standards v-else-if="slice.slice_type == 'standards'" :data="slice" />
				<Advantages v-else-if="slice.slice_type == 'advantages'" :data="slice" />
				<Charles v-else-if="slice.slice_type == 'charles'" :data="slice" />
				<LatestProjects v-else-if="slice.slice_type == 'latestprojects'" :data="slice" />
				<ServicesList v-else-if="slice.slice_type == 'services_list'" :data="slice" />
				<SliderProjects v-else-if="slice.slice_type == 'sliderprojects'" :data="slice" />
				<section v-else-if="slice.slice_type == 'text'" class="rich_text">
					<prismic-rich-text :field="slice.primary.text" />
				</section>
				<section v-else-if="slice.slice_type == 'image_text'" class="image_text">
					<div class="image">
						<ImageItem :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :alt="slice.primary.image.alt" />
					</div>
					<prismic-rich-text v-for="(item, key) in slice.items" :key="key" class="rich_text" :field="item.text" />
				</section>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'Service',
	// beforeRouteLeave(to, from, next) {
	// 	this.$store.dispatch('bindNavbarTransparent', false)
	// 	next()
	// },
	// middleware: 'navbarTransparent',
	data: () => ({
		slices: [],
		parent: String,
	}),
	async fetch() {
		// console.log(route);
		await this.$store.dispatch('storeByUID', {
			type: 'services',
			uid: this.$route.params.services,
			language: this.$i18n.localeProperties.prismic,
			path: this.$route.fullPath,
		})
		this.slices = this.$store.getters.page.data.body
	},
	head() {
		return this.$store.getters.page.head
	},
	watch: {
		'$route.path': '$fetch',
	},
	fetchKey(getCounter) {
		// getCounter is a method that can be called to get the next number in a sequence
		// as part of generating a unique fetchKey.
		return 'service' + getCounter('service')
	},
	mounted() {
		this.$store.dispatch('bindNavbarTransparent', true)
	},
}
</script>

<style lang="scss" scoped>
.container {
	padding: 0;
	padding-bottom: 80px;
	.image_text {
		display: flex;
		margin: 25px 0;
		width: 100%;
		align-items: center;
		.rich_text {
			display: flex;
			flex-direction: column;
			padding: 25px 30px 55px;
			max-width: 100%;
			width: 50%;
			p {
				margin-bottom: 25px;
			}
		}
		.image {
			width: 50%;
			picture {
				position: relative;
				// max-width: 800px;
				// height: 450px;
				z-index: 8;
			}
		}
	}
}
.rich_text {
	padding-right: 1rem;
	padding-left: 255px;
}

@media (min-width: 2000px) {
	.container {
		.image_text {
			.image {
				height: 40vh;
			}
		}
	}
}
@media (max-width: 900px) {
	.rich_text {
		padding-right: 1rem;
		padding-left: 55px;
	}
	.container {
		.image_text {
			flex-direction: column;

			.rich_text {
				display: flex;
				flex-direction: column;
				padding: 30px 30px 0 55px;
				width: 100%;
				p {
					margin-bottom: 25px;
				}
			}
			.image {
				width: 100%;
				picture {
					margin-bottom: 40px;
				}
			}
		}
	}
}
</style>
