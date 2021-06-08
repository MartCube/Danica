<template>
	<div>
		<Navbar />
		<SideBar />
		<main>
			<Nuxt keep-alive />
		</main>
		<Footer />
		<ContactModal />
		<div class="fb-customerchat" page_id="1303536193006608"></div>
	</div>
</template>

<script>
export default {
	data: () => ({}),
	async mounted() {
		await this.$nextTick()
		this.$fb.enable()
		this.$gtm.init('GTM-T5X9PFF')
		// window.FB.CustomerChat.showDialog()
		// console.log(window.FB)
		;(function (d, s, id) {
			let js
			const fjs = d.getElementsByTagName(s)[0]
			if (d.getElementById(id)) {
				return
			}
			js = d.createElement(s)
			js.id = id
			js.src = 'https://connect.facebook.net/en_US/sdk.js'
			fjs.parentNode.insertBefore(js, fjs)
		})(document, 'script', 'facebook-jssdk')
		window.fbAsyncInit = function () {
			window.FB.init({
				appId: '1303536193006608',
				autoLogAppEvents: true,
				xfbml: true,
				version: 'v2.10',
			})
			window.FB.AppEvents.logPageView()
		}
	},
	methods: {},
}
</script>
