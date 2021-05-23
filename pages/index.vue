<template>
	<div class="container">
		<template v-if="$fetchState.error">error</template>
		<template v-else-if="!$fetchState.pending">
			<div v-for="slice in slices" :key="slice.slice_type">
				<HomeIntro v-if="slice.slice_type == 'home_intro'" :data="slice" />
				<Achievements v-else-if="slice.slice_type == 'achievements'" :data="slice" />
				<ServicesList v-else-if="slice.slice_type == 'services_list'" :data="slice" />
				<HighlightProjects v-else-if="slice.slice_type == 'highlight_projects'" :data="slice" />
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'Index',
	data: () => ({
		slices: null,
		metaTags: Object
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('home_index', { lang: this.$i18n.localeProperties.prismic })
		this.slices = fetch.data.body
	},
	async asyncData({$prismic, app}) {
		const head = await $prismic.api.getSingle('home_index', { lang: app.i18n.localeProperties.prismic})
		let metaTags = Object
		console.log(app);
		if(head.data.meta_tags[0] !== undefined){
			metaTags.title = head.data.meta_tags[0].title[0].text;
			metaTags.description = head.data.meta_tags[0].description[0].text;
		}
		else {
			switch (app.i18n.localeProperties.prismic) {

				case "ru":
					metaTags.title = "Строительные услуги | DANICA";
					metaTags.description = "【Строительные работы под ключ】Услуги в области строительства ✅ Выгодные цены ⚡️ Отзывы + Гарантия + Качество ☎️ Звоните ▻";
					
					break;
				case "":
					metaTags.title = "Construction service | DANICA";
					metaTags.description = "【Turnkey construction work】 Construction services ✅ Favorable prices ⚡️ Reviews + Warranty + Quality ☎️ Call ▻";
					
					break;
			
				case "ua-ua":
					metaTags.title = "Будівельні послуги | DANICA";
					metaTags.description = "【Будівельні роботи під ключ】 Послуги в області будівництва ✅ Вигідні ціни ⚡️ Відгуки + Гарантія + Якість ☎️ Телефонуйте ▻";
					break;
			}
		}
		return metaTags
	},
	head() {
		return {
			title: this.metaTags.title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.metaTags.description
				},
			],
		}
	}
}
</script>
