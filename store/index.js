export const state = () => ({
	blogPosts: null,
	projects: null,
})

// Functions that return back data contained in the state.
export const getters = {
	blogPosts: (state) => state.blogPosts,
	projects: (state) => state.projects,
}

// Functions that directly mutate the state.
export const mutations = {
	setBlogPosts(state, value) {
		state.blogPosts = value
	},
	setProjects(state, value) {
		state.projects = value
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
}
