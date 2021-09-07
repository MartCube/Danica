export const state = (context) => ({
	blogPosts: null,
	projects: null,

	navbarTransparent: false,
	footer: true,

	modalContact: false,
	modalVideo: false,

	domain: 'https://danica.ua',
	defaultLanguage: 'ru',

	page: {
		head: {},
		data: {},
		tags: {},
	},

	routes: {},
})

// Functions that return back data contained in the state.
export const getters = {
	blogPosts: (state) => state.blogPosts,
	projects: (state) => state.projects,

	navbarTransparent: (state) => state.navbarTransparent,
	footer: (state) => state.footer,

	modalContact: (state) => state.modalContact,
	modalVideo: (state) => state.modalVideo,

	domain: (state) => state.domain,
	page: (state) => state.page,
	routes: (state) => state.routes,
}

// Functions that directly mutate the state.
export const mutations = {
	setBlogPosts(state, value) {
		state.blogPosts = value
	},
	setProjects(state, value) {
		state.projects = value
	},
	setNavbarTransparent(state, value) {
		state.navbarTransparent = value
	},
	setFooter(state, value) {
		state.footer = value
	},
	setModalContact(state, value) {
		state.modalContact = value
	},
	setModalVideo(state, value) {
		state.modalVideo = value
	},
	setPage(state, value) {
		state.page = value
	},
}

// Functions that call mutations on the state. They can call multiple mutations, can call other actions, and they support asynchronous operations.
export const actions = {
	bindBlogPosts(context, value) {
		context.commit('setBlogPosts', value)
	},
	bindProjects(context, value) {
		context.commit('setProjects', value)
	},
	bindNavbarTransparent(context, value) {
		context.commit('setNavbarTransparent', value)
	},
	bindFooter(context, value) {
		context.commit('setFooter', value)
	},
	bindModalContact(context, value) {
		context.commit('setModalContact', value)
	},
	bindModalVideo(context, value) {
		context.commit('setModalVideo', value)
	},

	async storeSingle({ state, commit, dispatch }, fetch) {
		const lang = await fetch.lang.slice(0, 2)
		const path = this.$router.currentRoute.fullPath

		// component page head data *****
		const head = {
			htmlAttrs: { lang },
			title: fetch.data.meta_title,
			link: [],
			meta: [],
		}

		// canonical link
		const canonical = `${state.domain}${path}`
		head.link.push({ hid: '', rel: 'canonical', href: canonical })
		head.meta.push({ hid: 'og:url', name: 'og:url', content: canonical })
		// x-default needs to be always ua
		if (lang === state.defaultLanguage) head.link.push({ hid: 'alternate', rel: 'alternate', href: canonical, hreflang: 'x-default' })

		// alternate langcanonicaluages
		fetch.alternate_languages.forEach((alterLang) => {
			// store alternative language each time new variable
			let href
			const altLang = alterLang.lang.slice(0, 2)

			// path is a sting with slashes at the beggining and end , which occur empty item in array
			// split by slash to get array
			const pathAltLang = altLang === state.defaultLanguage ? '' : altLang + '/'
			let altPath = path.slice(1, -1)
			altPath = altPath.split('/')
			const uid = alterLang.uid === undefined ? '' : `${alterLang.uid}/`

			if (altPath.length <= 3) href = `${state.domain}/${pathAltLang}${uid}`
			else href = `${state.domain}/${pathAltLang}${altPath}${uid}`

			// links & meta
			head.link.push({ hid: 'alternate', rel: 'alternate', href, hreflang: altLang })
			if (altLang === state.defaultLanguage) head.link.push({ hid: 'alternate', rel: 'alternate', href, hreflang: 'x-default' })
		})

		head.meta.push(
			...[
				{ hid: 'description', name: 'description', content: fetch.data.meta_description },
				// facebook
				{ hid: 'og:type', property: 'og:type', content: '' },
				{ hid: 'og:url', property: 'og:url', content: canonical },
				{ hid: 'og:title', property: 'og:title', content: fetch.data.meta_title },
				{ hid: 'og:description', property: 'og:description', content: fetch.data.meta_description },
				{ hid: 'og:image', property: 'og:image', content: fetch.data.meta_image === undefined ? '' : fetch.data.meta_image.url },
				// twitter
				{ hid: 'twitter:card', name: 'twitter:card', content: fetch.data.meta_image === undefined ? '' : fetch.data.meta_image.url },
			],
		)

		await commit('setPage', { head, data: fetch.data, tags: fetch.tags })
	},

	async storeByUID({ state, commit, dispatch }, { type, path, fetch }) {
		// if(fetch)
		const lang = fetch.lang.slice(0, 2)

		// for dynamic pages store routes for i18n *****
		const routes = {}

		// component page head data *****
		const head = {
			htmlAttrs: { lang },
			title: fetch.data.meta_title,
			link: [],
			meta: [],
		}

		// the current route
		routes[lang] = fetch.uid

		// check for type of path
		let pathType
		if (type === 'blog_post') pathType = 'blog/'
		else if (type === 'project_post') pathType = 'projects/'
		else pathType = ''

		// alternate languages
		let href
		fetch.alternate_languages.forEach((alterLang) => {
			// store alternative language each time new variable
			const altLang = alterLang.lang.slice(0, 2)

			// path is a sting with slashes at the beggining and end , which occur empty item in array
			// split by slash to get array
			const pathAltLang = altLang === state.defaultLanguage ? '' : `${altLang}/`
			// routes
			routes[altLang] = alterLang.uid

			// links & meta
			href = `${state.domain}/${pathAltLang}${pathType}${alterLang.uid}/`

			head.link.push({ hid: 'alternate', rel: 'alternate', href, hreflang: altLang })

			if (altLang === state.defaultLanguage) head.link.push({ hid: 'alternate', rel: 'alternate', href, hreflang: 'x-default' })
		})

		// canonical link
		const canonical = `${state.domain}${path}`
		if (lang === state.defaultLanguage) head.link.push({ hid: 'alternate', rel: 'alternate', href: canonical, hreflang: 'x-default' })
		head.link.push({ hid: 'canonical', rel: 'canonical', href: canonical })
		head.meta.push({ hid: 'og:url', name: 'og:url', content: canonical })

		await dispatch('i18n/setRouteParams', {
			en: { [type]: routes.en },
			ru: { [type]: routes.ru },
			ua: { [type]: routes.ua },
		})

		head.meta.push(
			...[
				{ hid: 'description', name: 'description', content: fetch.data.meta_description },
				// facebook
				{ hid: 'og:type', property: 'og:type', content: '' },
				{ hid: 'og:url', property: 'og:url', content: canonical },
				{ hid: 'og:title', property: 'og:title', content: fetch.data.meta_title },
				{ hid: 'og:description', property: 'og:description', content: fetch.data.meta_description },
				{ hid: 'og:image', property: 'og:image', content: fetch.data.meta_image === undefined ? '' : fetch.data.meta_image.url },
				// twitter
				{ hid: 'twitter:card', name: 'twitter:card', content: fetch.data.meta_image === undefined ? '' : fetch.data.meta_image.url },
			],
		)
		await commit('setPage', { head, data: fetch.data, tags: fetch.tags })
	},

	async storeSecondLevel({ state, commit, dispatch }, { type, parentType, parentUid, path, fetch, parent }) {
		const lang = fetch.lang.slice(0, 2)

		// for dynamic pages store routes for i18n *****
		const routesChild = {}
		const routesParent = {}

		// component page head data *****
		const head = {
			htmlAttrs: { lang },
			title: fetch.data.meta_title,
			link: [],
			meta: [],
		}

		// the current route
		routesChild[lang] = `${fetch.uid}`
		routesParent[lang] = `${parentUid}`

		// alternate languages
		let href
		fetch.alternate_languages.forEach((alterLang, i) => {
			// store alternative language each time new variable
			const altLang = alterLang.lang.slice(0, 2)

			// path is a sting with slashes at the beggining and end , which occur empty item in array
			// split by slash to get array

			if (altLang === state.defaultLanguage) {
				const currentParentUid = parent.alternate_languages.filter((el) => {
					return el.lang === alterLang.lang
				})
				routesChild[altLang] = `${alterLang.uid}`
				routesParent[altLang] = `${currentParentUid[0].uid}`
				href = `${state.domain}/${currentParentUid[0].uid}/${alterLang.uid}/`
			} else {
				const currentParentUid = parent.alternate_languages.filter((el) => {
					return el.lang === alterLang.lang
				})
				routesChild[altLang] = `${alterLang.uid}`
				routesParent[altLang] = `${currentParentUid[0].uid}`
				href = `${state.domain}/${altLang}/${currentParentUid[0].uid}/${alterLang.uid}/`
			}
			// links & meta
			if (altLang === state.defaultLanguage) head.link.push({ hid: 'alternate', rel: 'alternate', href, hreflang: 'x-default' })

			head.link.push({ hid: 'alternate', rel: 'alternate', href, hreflang: altLang })
		})

		await dispatch('i18n/setRouteParams', {
			en: { [parentType]: routesParent.en, [type]: routesChild.en },
			ru: { [parentType]: routesParent.ru, [type]: routesChild.ru },
			ua: { [parentType]: routesParent.ua, [type]: routesChild.ua },
		})

		const canonical = `${state.domain}${path}`
		if (lang === state.defaultLanguage) head.link.push({ hid: 'alternate', rel: 'alternate', href: canonical, hreflang: 'x-default' })
		head.link.push({ hid: 'canonical', rel: 'canonical', canonical })
		head.link.push({ hid: 'og:url', property: 'og:url', content: canonical })

		head.meta.push(
			...[
				{ hid: 'description', name: 'description', content: fetch.data.meta_description },
				// facebook
				{ hid: 'og:type', property: 'og:type', content: '' },
				// { hid: 'og:url', property: 'og:url', content: canonical },
				{ hid: 'og:title', property: 'og:title', content: fetch.data.meta_title },
				{ hid: 'og:description', property: 'og:description', content: fetch.data.meta_description },
				{ hid: 'og:image', property: 'og:image', content: fetch.data.meta_image === undefined ? '' : fetch.data.meta_image.url },
				// twitter
				{ hid: 'twitter:card', name: 'twitter:card', content: fetch.data.meta_image === undefined ? '' : fetch.data.meta_image.url },
			],
		)

		await commit('setPage', { head, data: fetch.data, tags: fetch.tags })
	},
}
