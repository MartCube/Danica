export const state = (context) => ({
	blogPosts: null,
	projects: null,

	navbarTransparent: false,
	footer: true,

	modalContact: false,
	modalVideo: false,

	domain: 'https://danica-dev.netlify.app',
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
}
