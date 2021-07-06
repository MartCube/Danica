

setTimeout(() => {
	// import VueFbCustomerChat from 'vue-fb-customer-chat'
	// import Vue from 'vue'

		const Vue = () => import('vue')
	const VueFbCustomerChat = () => import('vue-fb-customer-chat')
	// import VueFbCustomerChat from 'vue-fb-customer-chat'
	console.log(VueFbCustomerChat, Vue);
	Vue.use(VueFbCustomerChat, {
		page_id: 1303536193006608, //  change 'null' to your Facebook Page ID,
		theme_color: '#333333', // theme color in HEX
		// locale: 'en_US', // default 'en_US'
	})
}, 3500);
