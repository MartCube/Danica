export default {
	// Target (https://go.nuxtjs.dev/config-target)
	target: 'static',

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'Danica',
		meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
		link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
	},

	loading: { color: '#ffc424' },

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['~/assets/main.scss'],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [{ src: '@/plugins/vee-validate.js' }, { src: `~/plugins/lazysizes.client.js` }],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// '@nuxtjs/eslint-module',
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: ['@nuxtjs/prismic', '@nuxtjs/axios', 'nuxt-i18n'],

	prismic: {
		endpoint: 'https://danica.cdn.prismic.io/api/v2',
		linkResolver: '@/plugins/link-resolver',
		htmlSerializer: '@/plugins/html-serializer',
		preview: false,
	},

	i18n: {
		defaultLocale: 'en',
		lazy: true,
		langDir: 'locales/',
		locales: [
			{
				code: 'en',
				name: 'eng',
				file: 'en.js',
			},
			{
				code: 'ru',
				name: 'рус',
				file: 'ru.js',
			},
			{
				code: 'ua',
				name: 'укр',
				file: 'ua.js',
			},
		],
	},

	axios: {
		baseURL: '/',
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
			vue.transformAssetUrls.ImageItem = ['src']
		},
	},

	generate: {
		fallback: '404.html', // Netlify reads a 404.html, Nuxt will load as an SPA
	},
}
