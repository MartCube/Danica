<template keep-alive>
	<div class="container">
		<template v-if="$fetchState.error">error</template>
		<template v-else-if="!$fetchState.pending">
			<div v-for="(slice, i) in slices" :key="slice.slice_type + i">
				<ServiceIntro v-if="slice.slice_type == 'serviceintro'" :data="slice" />
				<Values v-else-if="slice.slice_type == 'values'" :data="slice" />
				<Stages v-else-if="slice.slice_type == 'stages'" :data="slice" />
				<Standards v-else-if="slice.slice_type == 'standards'" :data="slice" />
				<Advantages v-else-if="slice.slice_type == 'advantages'" :data="slice" />
				<Charles v-else-if="slice.slice_type == 'charles'" :data="slice" />
				<LatestProjects v-else-if="slice.slice_type == 'latestprojects'" :data="slice" />
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
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('bindNavbarTransparent', false)
		next()
	},
	middleware: 'navbarTransparent',
	data: () => ({
		slices: Array,
		altLangUid: {},

		// head data
		altLinks: [],
		metaTags: {},
		ogTags: [],
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getByUID('services', this.$route.params.service, { lang: this.$i18n.localeProperties.prismic })
		const domain = this.$store.getters.domain

		// alternate languages and canonical link
		if (fetch.lang.slice(0, 2) === 'ua')
			this.altLinks.push({
				hid: 'canonical',
				rel: 'canonical',
				href: `${domain}/${fetch.uid}`,
			})
		else
			this.altLinks.push({
				hid: 'canonical',
				rel: 'canonical',
				href: `${domain}/${fetch.lang.slice(0, 2)}/${fetch.uid}`,
			})
		fetch.alternate_languages.forEach((alterLang) => {
			if (alterLang.lang.slice(0, 2) === 'ua')
				this.altLinks.push({
					hid: 'alternate',
					rel: 'alternate',
					href: `${domain}/${alterLang.uid}`,
					hreflang: alterLang.lang.slice(0, 2),
				})
			else
				this.altLinks.push({
					hid: 'alternate',
					rel: 'alternate',
					href: `${domain}/${alterLang.lang.slice(0, 2)}/${alterLang.uid}`,
					hreflang: alterLang.lang.slice(0, 2),
				})
		})

		// store routes for all langs
		fetch.alternate_languages.forEach((alternateLang) => {
			this.altLangUid[alternateLang.lang.slice(0, 2)] = alternateLang.uid
		})
		this.$store.dispatch('i18n/setRouteParams', {
			en: { service: this.altLangUid.en },
			ru: { service: this.altLangUid.ru },
			ua: { service: this.altLangUid.ua },
		})

		// service data
		this.slices = fetch.data.body

		// define meta tags
		if (fetch.data.meta_title)
			this.metaTags = {
				title: fetch.data.meta_title,
				description: fetch.data.meta_description,
				keywords: fetch.data.meta_keywords,
			}
		// default untill everything is filled
		else
			switch (this.$i18n.localeProperties.prismic) {
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
	},
	head() {
		const datai18 = this.$nuxtI18nHead({ addSeoAttributes: true })
		let canonicalUrl = String
		// let alternaterUrl1 = String
		// let alternaterUrl2 = String
		// await this.$nextTick()
		this.altLinks.forEach((element, i) => {
			switch (i) {
				case 0:
					canonicalUrl = element.href
					break

				default:
					break
			}
		})
		return {
			htmlAttrs: {
				lang: datai18.htmlAttrs.lang.slice(0, 2),
			},
			title: this.metaTags.title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.metaTags.description,
				},
				{
					hid: 'og:title',
					name: 'og:title',
					content: this.metaTags.title,
				},
				{
					hid: 'og:description',
					name: 'og:description',
					content: this.metaTags.description,
				},
				{
					hid: 'og:url',
					name: 'og:url',
					content: canonicalUrl,
				},
				// {
				// 	hid: 'og:url',
				// 	name: 'og:locale:alternate',
				// 	content: canonicalUrl,
				// },
				// {
				// 	hid: 'og:url',
				// 	name: 'og:locale:alternate',
				// 	content: canonicalUrl,
				// },
				// {
				// 	hid: 'og:image',
				// 	name: 'og:image',
				// 	content: this.slices[0].primary.image.url,
				// },
			],
			link: this.altLinks,
		}
	},
	watch: {
		'$route.query': '$fetch',
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
