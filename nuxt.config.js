import sitemap from './modules/sitemap'
import routes from './modules/router'

export default {
	// Target (https://go.nuxtjs.dev/config-target)
	target: 'static',

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: ['~/components/forms', '~/components/global', '~/components/items', '~/components/local', '~/components/sections'],

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'Danica',
		meta: [
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				charset: 'UTF-8',
			},
			{
				hid: 'robots',
				name: 'robots',
				content: 'follow',
			},
			{
				property: 'fb:app_id',
				content: '3139600679444222',
			},
			{
				hid: 'facebook-domain-verification',
				name: 'facebook-domain-verification',
				content: 'buglyrj0r27njavajrqvn70cexub5h',
			},
		],
		link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
		script: [
			{
				json: {
					'@context': 'http://schema.org',
					'@type': 'LocalBusiness',
					name: 'Danica',
					image: 'https://danica.ua/favicon.png',
					telephone: '+38(097) 359 11 11',
					address: {
						'@type': 'PostalAddress',
						streetAddress: 'Naberezhno-Rybalska St, 9, Kyiv, 04176',
						addressLocality: 'Kyiv',
					},
					priceRange: '$$',
					openingHoursSpecification: {
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: { '@type': 'DayOfWeek', name: 'пн, вт, ср ,чт, пт' },
						opens: '09:00',
						closes: '19.00',
					},
					url: 'https://danica.ua/',
					aggregateRating: {
						'@type': 'AggregateRating',
						worstRating: '4',
						ratingCount: '4',
						ratingValue: '4',
					},
				},
				type: 'application/ld+json',
			},
		],
	},

	loading: { color: '#ffc424' },

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['~/assets/main.scss', '~/assets/colors.scss'],

	// router
	router: {
		trailingSlash: true,
	},

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [{ src: '@/plugins/vue-cookie', mode: 'client' }, { src: '@/plugins/vue-observe' }, { src: `~/plugins/lazysizes.client.js` }],

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// '@nuxtjs/eslint-module',
		'@nuxtjs/sitemap',
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: ['@nuxtjs/prismic', 'nuxt-i18n', '@nuxtjs/style-resources'],

	vue: {
		config: {
			// productionTip: false,
			devtools: true,
		},
	},

	prismic: {
		endpoint: 'https://danica.cdn.prismic.io/api/v2',
		linkResolver: '@/plugins/link-resolver',
		htmlSerializer: '@/plugins/html-serializer',
		preview: false,
		apiOptions: {
			accessToken: 'MC5ZTEVkV0JVQUFDWUFYZG5W.W--_ve-_vTvvv73vv73vv73vv73vv71xcu-_vXbvv70977-9NO-_ve-_vXFV77-9Tu-_ve-_ve-_vXnvv70277-9RUY',
		},
	},

	i18n: {
		defaultLocale: 'ru',
		lazy: true,
		seo: false,
		baseUrl: 'https://danica.ua/',
		langDir: 'locales/',
		locales: [
			{
				code: 'en',
				name: 'eng',
				prismic: 'en-us',
				file: 'en.js',
				iso: 'en-US',
			},
			{
				code: 'ru',
				name: 'рус',
				prismic: 'ru',
				file: 'ru.js',
				iso: 'ru-RU',
				isCatchallLocale: true,
			},
			{
				code: 'ua',
				name: 'укр',
				prismic: 'ua-ua',
				file: 'ua.js',
				iso: 'ua-UA',
			},
		],
		detectBrowserLanguage: false,
		parsePages: false, // Disable babel parsing
		pages: {
			'projects/index': {
				en: '/projects',
				ru: '/projects',
				ua: '/projects',
			},
			'projects/_project_post': {
				en: '/projects/:project_post?',
				ru: '/projects/:project_post?',
				ua: '/projects/:project_post?',
			},
			'blog/index': {
				en: '/blog',
				ru: '/blog',
				ua: '/blog',
			},
			'aboutUs/index': {
				en: '/about-us',
				ru: '/o-nas',
				ua: '/pro-nas',
			},
			'aboutUs/_team_member': {
				en: '/about-us/:team_member?',
				ru: '/o-nas/:team_member?',
				ua: '/pro-nas/:team_member?',
			},
			'_services/index': {
				en: '/:services',
				ru: '/:services',
				ua: '/:services',
			},
			'_services/_service_second': {
				en: '/:services/:service_second?',
				ru: '/:services/:service_second?',
				ua: '/:services/:service_second?',
			},
			'blog/_blog_post': {
				en: '/blog/:blog_post?',
				ru: '/blog/:blog_post?',
				ua: '/blog/:blog_post?',
			},
			contact: {
				en: '/contact',
				ru: '/kontakt',
				ua: '/kontakt',
			},
			policy: {
				en: '/privacy-policy',
				ru: '/privacy-policy',
				ua: '/privacy-policy',
			},
		},
	},

	sitemap: {
		hostname: 'https://danica.ua/',
		// exclude: ['sitemap'],
		trailingSlash: true,
		// i18n: 'ru',
		routes() {
			return sitemap()
		},
		// subFolders: false,
	},

	styleResources: {
		scss: ['./assets/colors.scss', './assets/mixins.scss'],
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
		hotMiddleware: {
			client: {
				quiet: true,
			},
		},
		transpile: ['vee-validate/dist/rules'],
		extend(config, { isClient, loaders: { vue } }) {
			vue.transformAssetUrls.img = ['data-src', 'src']
		},
	},

	generate: {
		fallback: '404.html',
		crawler: false,
		routes() {
			return routes()
		},
	},
}
