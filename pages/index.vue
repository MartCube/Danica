<template>
	<div class="container">
		<div v-for="slice in slices" :key="slice.slice_type">
			<HomeIntro v-if="slice.slice_type == 'home_intro'" :data="slice" />
			<Achievements v-else-if="slice.slice_type == 'achievements'" :data="slice" />
			<ServicesList v-else-if="slice.slice_type == 'services_list'" :data="slice" />
			<HighlightProjects v-else-if="slice.slice_type == 'highlight_projects'" :data="slice" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Index',
	async asyncData({ $prismic, i18n, store }) {
		// fetch  page
		const page = await $prismic.api.getSingle('home_index', { lang: i18n.localeProperties.prismic })
		const domain = store.getters.domain
		const altLinks = []
		// alternate languages and canonical link
		if (page.lang.slice(0, 2) === 'ua')
			altLinks.push({
				hid: 'canonical',
				rel: 'canonical',
				href: `${domain}`,
			})
		else
			altLinks.push({
				hid: 'canonical',
				rel: 'canonical',
				href: `${domain}/${page.lang.slice(0, 2)}`,
			})
		page.alternate_languages.forEach((alterLang) => {
			if (alterLang.lang.slice(0, 2) === 'ua')
				altLinks.push({
					hid: 'alternate',
					rel: 'alternate',
					href: `${domain}`,
					hreflang: alterLang.lang.slice(0, 2),
				})
			else
				altLinks.push({
					hid: 'alternate',
					rel: 'alternate',
					href: `${domain}/${alterLang.lang.slice(0, 2)}`,
					hreflang: alterLang.lang.slice(0, 2),
				})
		})
		// define data
		return {
			altLinks,
			metaTags: {
				title: page.data.meta_title,
				description: page.data.meta_description,
				keywords: page.data.meta_keywords,
			},
			slices: page.data.body,
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
}
</script>
