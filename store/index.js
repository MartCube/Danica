export const state = (context) => ({
	// lang: context.$i18n.localeProperties.prismic,
	blogPosts: null,
	projects: null,

	navbarTransparent: false,
	modalContact: false,
	footer: true,
})

// Functions that return back data contained in the state.
export const getters = {
	blogPosts: (state) => state.blogPosts,
	projects: (state) => state.projects,
	navbarTransparent: (state) => state.navbarTransparent,
	modalContact: (state) => state.modalContact,
	footer: (state) => state.footer,
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
	setModalContact(state, value) {
		state.modalContact = value
	},
	setFooter(state, value) {
		state.footer = value
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
	bindModalContact(context, value) {
		context.commit('setModalContact', value)
	},
	bindFooter(context, value) {
		context.commit('setFooter', value)
	},
}
