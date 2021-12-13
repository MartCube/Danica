import Vue from 'vue'
import VueGtag from 'vue-gtag'

const gid = 'UA-191786223-1'

Vue.use(VueGtag, {
	config: { id: gid },
	// enabled: true,
})
