<template>
	<div>
		<Navbar />
		<SideBar />
		<main>
			<Nuxt keep-alive />
		</main>
		<Footer />
		<ContactModal />
	</div>
</template>

<script>
export default {
	data: () => ({
		isFBReady: false,
	}),
	async mounted() {
		await this.$nextTick()
		this.$fb.enable()
		this.$gtm.init('GTM-T5X9PFF')

		// console.log(this.$FBsdk)
		console.log(window.FB)
		if (window.FB) {
			window.FB.XFBML.parse()
			window.FB.Event.subscribe('customerchat.load', (e) => {
				console.log(e)
			})
		}
	},
}
</script>
