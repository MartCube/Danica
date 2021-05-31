<template>
	<div class="container">
		<div v-for="(slice, i) in data" :key="i" class="slice" :class="slice.slice_type">
			<h3 class="title">{{ $prismic.asText(slice.primary.title) }}</h3>
			<prismic-rich-text class="rich_text" :field="slice.primary.text" />
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		data: Object,
		altLangUid: {},

		// head data
		altLinks: [],
		metaTags: {},
	}),
	async fetch() {
		const lang = this.$i18n.localeProperties.prismic

		const policy = await this.$prismic.api.getSingle('policy', { lang })
		const domain = this.$store.getters.domain

		// alternate languages and canonical link
		if (policy.lang.slice(0, 2) === 'ua')
			this.altLinks.push({
				hid: 'canonical',
				rel: 'canonical',
				href: `${domain}/${policy.uid}`,
			})
		else
			this.altLinks.push({
				hid: 'canonical',
				rel: 'canonical',
				href: `${domain}/${policy.lang.slice(0, 2)}/${policy.uid}`,
			})
		policy.alternate_languages.forEach((alterLang) => {
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
			this.altLangUid[alterLang.lang.slice(0, 2)] = alterLang.uid
		})

		// store routes for all langs
		// policy.alternate_languages.forEach((alternateLang) => {
		// 	this.altLangUid[alternateLang.lang.slice(0, 2)] = alternateLang.uid
		// })
		this.$store.dispatch('i18n/setRouteParams', {
			en: { service: this.altLangUid.en },
			ru: { service: this.altLangUid.ru },
			ua: { service: this.altLangUid.ua },
		})

		this.data = policy.data.body

		// define meta tags
		if (policy.data.meta_title)
			this.metaTags = {
				title: policy.data.meta_title,
				description: policy.data.meta_description,
				keywords: policy.data.meta_keywords,
			}
		// default untill everything is filled
		else
			switch (this.$i18n.localeProperties.prismic) {
				case 'ua-ua':
					return (this.metaTags = {
						title: 'Будівельні послуги | DANICA',
						description: '【Будівельні роботи під ключ】 Послуги в області будівництва ✅ Вигідні ціни ⚡️ Відгуки + Гарантія + Якість ☎️ Телефонуйте ▻',
						keywords: 'default keywords',
					})
				case 'ru':
					return (this.metaTags = {
						title: 'Строительные услуги | DANICA',
						description: '【Строительные работы под ключ】Услуги в области строительства ✅ Выгодные цены ⚡️ Отзывы + Гарантия + Качество ☎️ Звоните ▻',
						keywords: 'default keywords',
					})

				case '':
					return (this.metaTags = {
						title: 'Construction service | DANICA',
						description: '【Turnkey construction work】 Construction services ✅ Favorable prices ⚡️ Reviews + Warranty + Quality ☎️ Call ▻',
						keywords: 'default keywords',
					})
			}
	},
	head() {
		const datai18 = this.$nuxtI18nHead({ addSeoAttributes: true })
		let canonicalUrl = String
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
				lang: datai18.htmlAttrs.lang,
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
	computed: {
		domain() {
			return this.$store.getters.domain
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	margin-left: 240px;
	margin-top: 120px;
	padding: 0 0 40px 1rem;
	border-left: 1px solid $line;
	&::after {
		display: none;
	}
	.slice {
		.title {
			margin: 40px 0;
			text-transform: uppercase;
		}
		.rich_text {
			width: 80%;
		}
	}
}
@media (max-width: 900px) {
	.container {
		margin-left: 45px;
		margin-top: 30px;
	}
}
</style>
