export default {
	// Target (https://go.nuxtjs.dev/config-target)
	target: 'static',

	// Auto import components (https://go.nuxtjs.dev/config-components)
	// components: true,
	components: ['~/components/forms', '~/components/icons', '~/components/global', '~/components/items', '~/components/local', '~/components/sections'],

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'Danica',
		meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
		link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
	},

	loading: { color: '#ffc424' },

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['~/assets/main.scss', '~/assets/colors.scss'],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [{ src: '@/plugins/vue-swiper', mode: 'client' }, { src: '@/plugins/vue-observe' }, { src: '~/plugins/vue-plyr', mode: 'client' }, { src: '@/plugins/vee-validate.js' }, { src: `~/plugins/lazysizes.client.js` }],

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// '@nuxtjs/eslint-module',
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: ['@nuxtjs/prismic', '@nuxtjs/axios', 'nuxt-i18n', '@nuxtjs/style-resources'],

	prismic: {
		endpoint: 'https://danica.cdn.prismic.io/api/v2',
		linkResolver: '@/plugins/link-resolver',
		htmlSerializer: '@/plugins/html-serializer',
		preview: false,
	},

	i18n: {
		defaultLocale: 'ua',
		lazy: true,
		langDir: 'locales/',
		locales: [
			{
				code: 'en',
				name: 'eng',
				prismic: '',
				file: 'en.js',
			},
			{
				code: 'ru',
				name: 'рус',
				prismic: 'ru',
				file: 'ru.js',
			},
			{
				code: 'ua',
				name: 'укр',
				prismic: 'ua-ua',
				file: 'ua.js',
			},
		],
	},

	axios: {
		baseURL: '/',
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
	},
}
