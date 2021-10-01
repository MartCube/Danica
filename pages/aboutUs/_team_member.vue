<template>
	<div class="container">
		<template v-if="$fetchState.error">
			<Error />
		</template>
		<template v-else-if="!$fetchState.pending">
			<section class="member">
				<div class="image">
					<ImageItem :src="data.member_image.url" :height="data.member_image.dimensions.height" :width="data.member_image.dimensions.width" :mobile="data.member_image.mobile.url" :retina="data.member_image.retina.url" :alt="data.name" />
				</div>
				<div class="data">
					<div class="row">
						<span class="label">{{ $t('pages.team_member.name') }}</span>
						<h2>{{ data.name }}</h2>
					</div>
					<div class="row">
						<span class="label">{{ $t('pages.team_member.role') }}</span>
						<p>{{ data.role }}</p>
					</div>
					<div class="row">
						<span class="label">{{ $t('pages.team_member.education') }}</span>
						<p>{{ data.education }}</p>
					</div>
					<div class="row">
						<span class="label">{{ $t('pages.team_member.tools') }}</span>
						<p>{{ data.tools }}</p>
					</div>
					<div class="row">
						<span class="label">{{ $t('pages.team_member.responsibilities') }}</span>
						<prismic-rich-text class="rich_text" :field="data.responsibilities" />
					</div>
				</div>
			</section>
			<!-- Slice Machine -->
			<div v-for="(slice, i) in data.body" :key="i" class="slice" :class="slice.slice_type">
				<TitleText v-if="slice.slice_type == 'TitlePlainText'" :data="slice" />
				<LazyLatestProjects v-else-if="slice.slice_type == 'sliderprojects'" :data="slice" />
				<TitlePlainTextImage v-else :data="slice" />
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'TeamMember',
	data: () => ({
		data: null,
	}),
	async fetch() {
		const parentUid = this.$route.fullPath.split('/')[1]
		const fetch = await this.$prismic.api.getByUID('team_member', this.$route.params.team_member, { lang: this.$i18n.localeProperties.prismic })
		const parent = await this.$prismic.api.getByUID('about_us', parentUid, { lang: this.$i18n.localeProperties.prismic })
		await Promise.allSettled([fetch, parent])
			.then(async (data) => {
				// send data to store
				await this.$store.dispatch('storeSecondLevel', {
					type: 'team_member',
					parentType: 'about_us',
					parentUid,
					fetch: data[0].value,
					parent: data[1].value,
					path: this.$route.fullPath,
				})
				this.data = await fetch.data
				// console.log(this.data);
			})
			.catch((error) => {
				console.log(error)
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('member not found')
			})
	},
	head() {
		return this.$store.getters.page.head
	},
}
</script>

<style lang="scss" scoped>
.member {
	display: flex;
	justify-content: center;
	padding-right: 240px;
	padding-left: 240px;
	align-items: stretch;
	.image {
		width: 50%;
		height: 100%;
		border-right: 5px solid $primary;
		max-height: 700px;
		picture {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.data {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		padding-left: 2rem;
		span {
			font-size: 1rem;
			color: $grey;
		}
		h2 {
			font-size: 2rem;
			margin-bottom: 2rem;
			margin-top: 10px;
		}
		p {
			margin-bottom: 2rem;
			font-size: 1.2rem;
			line-height: 1.8rem;
			margin-top: 10px;
		}
		.row {
		}
		.rich_text {
			margin-top: 10px;
		}
	}
}
.container {
	padding-bottom: 5rem;
}

// @media (min-width: 1700px) {
// 	.blog_post {
// 		&.first {
// 			.info > * {
// 				font-size: 1.5rem;
// 			}
// 			.title{
// 				font-size: 3rem;
// 			}
// 		}
// 		.intro .title{
// 			font-size: 3rem;
// 		}
// 	}

// }

@media (max-width: 900px) {
	.member {
		padding-right: 40px;
		padding-left: 40px;
		padding-top: 0;
		width: 100%;
		.image {
			width: 100%;
			height: 100%;
			border-bottom: 5px solid #ffc424;
			border-right: none;
		}
		.data {
			margin-top: 3rem;
			width: 100%;
			padding-left: 3rem;
			padding-right: 3rem;
			p {
				font-size: 1rem;
			}
		}
	}
}
@media (max-width: 500px) {
	.member {
		padding-right: 0;
		// padding-left: 40px;
		.image {
			// width: 100%;
			// height: 100%;
			// border-bottom: 5px solid #ffc424;
			// border-right: none;
		}
		.data {
			// margin-top: 3rem;
			// width: 100%;
			padding-left: 10px;
			padding-right: 40px;
			p {
				// font-size: 1.2rem;
			}
		}
	}
}
</style>
