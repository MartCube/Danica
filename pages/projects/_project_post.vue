<template>
	<div class="container">
		<template v-if="$fetchState.error">
			<Error />
		</template>
		<div v-else-if="!$fetchState.pending" class="project_post">
			<div class="intro">
				<h2 class="title">{{ $prismic.asText(data.title) }}</h2>
				<ImageItem :width="data.main_image.dimensions.width" :height="data.main_image.dimensions.height" :src="data.main_image.url" :mobile="data.main_image.mobile.url" :retina="data.main_image.hasOwnProperty('retina') ? data.main_image.retina.url : ''" :alt="$prismic.asText(data.title)" />
			</div>

			<!-- Slice Machine -->
			<div v-for="(slice, i) in data.body" :key="i + slice.slice_type" class="slice" :class="slice.slice_type">
				<template v-if="slice.slice_type == 'text'">
					<prismic-rich-text class="rich_text" :field="slice.primary.text" />
				</template>

				<template v-else-if="slice.slice_type == 'project_info'">
					<div class="info">
						<p>
							<span>{{ $t('pages.project_post.service') }}:</span>
							<prismic-rich-text class="rich_text" :field="slice.primary.service" />
						</p>
						<p>
							<span>{{ $t('pages.project_post.architect') }}:</span>
							<n-link :to="`${localePath('aboutUs')}${slice.primary.architect.uid}/`">{{ slice.primary.architect_name }}</n-link>
						</p>
						<p>
							<span>{{ $t('pages.project_post.designer') }}:</span>
							<n-link :to="`${localePath('aboutUs')}${slice.primary.designer.uid}/`">{{ slice.primary.designer_name }}</n-link>
						</p>
						<p>
							<span>{{ $t('pages.project_post.total_square') }}:</span>
							{{ slice.primary.square }}
						</p>
						<p>
							<span>{{ $t('pages.project_post.date') }}:</span>
							{{ slice.primary.date }}
						</p>
						<p>
							<span>{{ $t('pages.project_post.location') }}:</span>
							{{ slice.primary.location }}
						</p>
						<p>
							<span>{{ $t('pages.project_post.living_square') }}:</span>
							{{ slice.primary.living_area }}
						</p>
						<p>
							<span>{{ $t('pages.project_post.rooms') }}:</span>
							{{ slice.primary.rooms }}
						</p>
						<p>
							<span>{{ $t('pages.project_post.garage') }}:</span>
							{{ slice.primary.garage }}
						</p>
					</div>
				</template>

				<template v-else-if="slice.slice_type == 'image'">
					<template v-if="slice.primary.image !== undefined">
						<ImageItem :width="slice.primary.image.dimensions.width" :height="slice.primary.image.dimensions.height" :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :retina="slice.primary.image.hasOwnProperty('retina') ? slice.primary.image.retina.url : ''" :alt="slice.primary.image.alt" />
					</template>
				</template>

				<template v-else-if="slice.slice_type == 'gallery'">
					<CoolLightBox :items="getImagesArray(slice.items)" :index="gallery" @close="gallery = null"></CoolLightBox>
					<div class="wrapper">
						<figure v-for="(item, y) in slice.items" :key="y" @click="gallery = y">
							<ImageItem :src="`${item.image.url}fit=clip`" :width="item.image.dimensions.width" :height="item.image.dimensions.height" :alt="item.image.alt !== null ? item.image.alt : 'alt'" />
						</figure>
					</div>
				</template>

				<template v-else-if="slice.slice_type == 'image_slider'">
					<div class="image_slider">
						<div class="image_slider_wrapper">
							<ImageItem v-for="(item, y) in slice.items" :key="y + item.image.url" :src="item.image.url" :mobile="item.image.mobile.url" :width="item.image.dimensions.width" :retina="item.image.hasOwnProperty('retina') ? item.image.retina.url : ''" :height="item.image.dimensions.height" :alt="item.image.alt !== null ? item.image.alt : 'alt'" />
						</div>
					</div>
				</template>

				<template v-else-if="slice.slice_type == 'image_text'">
					<div class="image_text">
						<template v-if="slice.primary.image !== 'undefined'">
							<ImageItem :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :width="slice.primary.image.dimensions.width" :height="slice.primary.image.dimensions.height" :retina="slice.primary.image.hasOwnProperty('retina') ? slice.primary.image.retina.url : ''" :alt="slice.primary.image.alt !== null ? slice.primary.image.alt : 'alt'" />
						</template>
						<div class="text">
							<p v-for="(item, key) in slice.items" :key="key">{{ $prismic.asText(item.text) }}</p>
						</div>
					</div>
				</template>

				<template v-else-if="slice.slice_type == 'video'">
					<div class="video_container">
						<div class="video_default_preview">
							<ImageItem v-if="slice.primary.image.hasOwnProperty(url)" :src="slice.primary.image.url" :mobile="slice.primary.image.mobile.url" :width="slice.primary.image.dimensions.width" :height="slice.primary.image.dimensions.height" :retina="slice.primary.image.hasOwnProperty('retina') ? slice.primary.image.retina.url : ''" :alt="slice.primary.image.alt" />
							<ImageItem :width="data.main_image.dimensions.width" :height="data.main_image.dimensions.height" :src="data.main_image.url" :mobile="data.main_image.mobile.url" :retina="slice.primary.image.hasOwnProperty('retina') ? slice.primary.image.retina.url : ''" :alt="$prismic.asText(data.title)" />
						</div>
						<div class="play" @click="openModal(slice.primary.video)">
							<Icon name="play" />
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
	name: 'ProjectPost',
	components: {
		CoolLightBox,
	},
	data: () => ({
		data: null,
		url: '',
		service_link: {
			name: String,
			parentUid: String,
			// currentUid: String,
		},
		projectInfo: [],
		gallery: null,
	}),
	async fetch() {
		// console.log('project post fetch')
		await this.$prismic.api
			.getByUID('project_post', this.$route.params.project_post, { lang: this.$i18n.localeProperties.prismic })
			.then(async (fetch) => {
				// send data to store
				await this.$store.dispatch('storeByUID', {
					type: 'project_post',
					path: this.$route.fullPath,
					fetch,
				})
				// data to component
				this.data = await fetch.data
				this.projectInfo = await this.data.body.filter((section) => {
					if (section.slice_type === 'project_info') {
						return section
					}
					return false
				})
				// console.log(this.projectInfo.length);
				// if (this.projectInfo.length > 0) {
				// 	this.service_url()
				// }
			})
			.catch((error) => {
				console.log(error)
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('project post not found')
			})
	},
	head() {
		return this.$store.getters.page.head
	},
	computed: {},
	methods: {
		async service_url() {
			const lang = await this.$store.getters.navbar_links.filter((language) => {
				if (language.language === this.$i18n.localeProperties.code) {
					return language.data
				}
				return false
			})
			// console.log(lang);

			if (this.projectInfo[0].primary.service.type === 'service_second') {
				this.getParentUid(lang[0].data.links, lang[0].data.architecture_links, 'architecture_links')
				this.getParentUid(lang[0].data.links, lang[0].data.design_links, 'design_links')
				this.getParentUid(lang[0].data.links, lang[0].data.construction_links, 'construction_links')
			} else {
				this.getServiceName(lang[0].data.links)
			}
		},
		getParentUid(navigationLinksArray, secondLvlServiceArray, listBindingName) {
			// console.log(secondLvlServiceArray);
			secondLvlServiceArray.filter((secondLvlServiceItem) => {
				if (secondLvlServiceItem.link.uid === this.projectInfo[0].primary.service.uid) {
					console.log(secondLvlServiceItem.link.uid)
					// 2 level
					this.service_link.name = secondLvlServiceItem.name
					navigationLinksArray.filter((parentItem) => {
						if (parentItem.list_binding_name === listBindingName) {
							// parentItem
							this.service_link.parentUid = parentItem.link.uid
							return false
						}
						return false
					})
				}
				return false
			})
		},
		getServiceName(navigationLinksArray) {
			navigationLinksArray.filter((link) => {
				if (link.link.uid === this.projectInfo[0].primary.service.uid) {
					this.service_link.name = link.name
				}
				// console.log(link.name)
				return false
			})
		},
		getImagesArray(dataArray) {
			const imageUrls = []
			dataArray.forEach((item) => {
				imageUrls.push(item.image.url)
			})
			console.log(imageUrls)
			return imageUrls
		},
		openModal(video) {
			this.$store.dispatch('bindModalVideo', { data: video, open: true })
		},
	},
}
</script>

<style lang="scss" scoped>
.project_post {
	display: flex;
	flex-direction: column;
	padding-bottom: 40px;
	position: relative;
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 240px;
		z-index: 5;

		width: 1px;
		height: 100%;
		background: $line;
	}

	& > * {
		margin-bottom: 25px;
	}
	// overflow-x: hidden;
	.gallery {
		.wrapper {
			display: grid;
			grid-template-columns: repeat(4, calc(20vw - 20px));
			grid-template-rows: repeat(5, 23vw);
			grid-gap: 20px;
			figure {
				display: flex;
				transition: width 0.2s linear;
				picture {
					object-fit: cover;
				}
				&:nth-child(1) {
					grid-column: 1 / 3;
					grid-row: 1 / 3;
				}
				&:nth-child(2) {
					grid-column: 3 / 5;
					grid-row: 1 / 1;
				}
				&:nth-child(3) {
					grid-column: 3 / 5;
					grid-row: 2 / 2;
				}
				&:nth-child(4) {
					grid-column: 1 / 3;
					grid-row: 3 / 5;
				}
				&:nth-child(5) {
					grid-column: 3 / 5;
					grid-row: 3 / 3;
				}
				&:nth-child(6) {
					grid-column: 3 / 5;
					grid-row: 4 / 4;
				}
				&:nth-child(7) {
					grid-column: 1 / 3;
					grid-row: 5 / 5;
				}
				&:nth-child(8) {
					grid-column: 3 / 5;
					grid-row: 5 / 5;
				}
			}
		}
	}

	.intro {
		width: 100%;
		height: calc(100vh - 120px);
		display: flex;
		flex-direction: column;

		position: relative;
		picture {
			position: absolute;
			top: 0;
			left: 0;
			width: inherit;
			height: inherit;
			z-index: 7;
			object-fit: cover;
		}

		.title {
			position: absolute;
			bottom: 0;
			left: 240px;
			z-index: 9;

			padding: 20px 20px 0 20px;
			background: white;

			text-transform: capitalize;
			font-size: 3rem;
		}
	}

	.info {
		margin: 50px 20px;
		// max-width: 400px;
		display: flex;
		flex-wrap: wrap;
		p {
			display: flex;
			margin: 10px 0;
			padding-right: 1%;
		}
		.rich_text p {
			font-size: inherit;
		}
		p,
		a {
			font-weight: bold;
			color: $black;
			font-size: 1.2rem;
			line-height: 1;
			width: 50%;
			span {
				font-size: inherit;
				margin-right: 1rem;
				font-weight: normal;
				border-left: 5px solid $primary;
				padding-left: 0.5rem;
				height: fit-content;
			}
		}
		a {
			text-decoration: underline;
			color: $primary;
		}
	}

	.slice {
		margin-left: 240px;
	}

	.text {
		.rich_text {
			width: 75%;
			padding-left: 1.5rem;
			h4 {
				font-size: 1.5rem;
			}
		}
	}

	.image {
		width: 63%;
		display: flex;
		flex-direction: column;
		align-items: center;
		picture {
			object-fit: cover;
		}
		.description {
			margin: 25px 0;
			opacity: 0.75;
			font-style: italic;
		}
	}

	.video_container {
		position: relative;
		width: 85%;
		.video_default_preview {
			width: 100%;
			max-height: 70vh;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			z-index: 1;
			overflow: hidden;
			picture {
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;
				display: block;
				filter: grayscale(100%) brightness(130%);
				opacity: 0.8;
			}
		}
		.play {
			padding: 24px;
			background: $primary;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			cursor: pointer;
			z-index: 3;
			svg {
				fill: $white;
			}
		}
	}

	.image_slider {
		width: -webkit-fill-available;
		overflow-x: auto;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		@include scrollbar;
		.image_slider_wrapper {
			width: auto;
			height: inherit;
			margin: 0;
			display: inline-flex;
			picture {
				height: 70vh;
				width: auto;
				margin-right: 10px;
			}
		}
	}

	.image_text {
		display: flex;
		margin: 25px 0;

		.text {
			display: flex;
			flex-direction: column;
			padding: 40px;
			max-width: 50%;
			p {
				margin-bottom: 25px;
			}
		}
		picture {
			max-width: 50vw;
			height: 30vw;
			z-index: 7;
		}
	}
}

@media (max-width: 1233px) {
	.project_post {
		.gallery {
			.wrapper {
				grid-template-columns: repeat(4, calc(18vw - 20px));
			}
		}
	}
}
@media (max-width: 1020px) {
	.project_post {
		.info {
			p {
				flex-direction: column;
			}
			a {
				width: auto;
			}
			p span,
			a span {
				margin-bottom: 0.7rem;
			}
		}
	}
}
@media (max-width: 900px) {
	.container::after {
		z-index: -1;
	}
	.project_post {
		&::after {
			display: none;
		}
		padding: 0;
		.intro {
			width: 100%;
			height: calc(100vh - 60px);
			.title {
				left: 0;
				font-size: 2rem;
				padding: 20px 40px 0 40px;
			}
		}

		.info {
			width: 100%;
			margin: 40px 0;
			padding-left: 55px;

			p,
			a {
				font-size: 1rem;
				width: 100%;
			}
		}

		.slice.gallery {
			margin: 0 40px;
			.wrapper {
				grid-template-columns: repeat(1, 89vw);
				grid-template-rows: repeat(10, 55vw);
				grid-gap: 20px;
				figure {
					display: flex;
					&:nth-child(1) {
						grid-column: 1;
						grid-row: 1 / 3;
					}
					&:nth-child(2) {
						grid-column: 1;
						grid-row: 3;
					}
					&:nth-child(3) {
						grid-column: 1;
						grid-row: 4;
					}
					&:nth-child(4) {
						grid-column: 1;
						grid-row: 5 / 7;
					}
					&:nth-child(5) {
						grid-column: 1;
						grid-row: 7;
					}
					&:nth-child(6) {
						grid-column: 1;
						grid-row: 8;
					}
					&:nth-child(7) {
						grid-column: 1;
						grid-row: 9;
					}
					&:nth-child(8) {
						grid-column: 1;
						grid-row: 10;
					}
				}
			}
		}
		.slice {
			margin: 0;
			margin-bottom: 1rem;
		}

		.text .rich_text {
			width: 100%;
			padding: 0 30px 0 55px;
		}

		.image {
			width: 100%;
		}

		.image_text {
			flex-direction: column;

			.text {
				display: flex;
				flex-direction: column;
				padding: 0 30px 0 55px;
				max-width: 100%;
				p {
					margin-bottom: 25px;
				}
			}
			picture {
				margin-bottom: 40px;
			}
		}

		.video_container {
			width: 95%;
		}
	}
}
</style>
