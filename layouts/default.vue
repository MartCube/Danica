<template>
	<div>
		<Navbar />
		<SideBar />
		<main>
			<Nuxt keep-alive />
		</main>
		<Footer />
		<ContactModal />
		<CookieBox />
	</div>
</template>

<script>
import CookieBox from '~/components/global/CookieBox.vue'
export default {
	components: { CookieBox },
	data: () => ({}),
	async mounted() {
		await this.$nextTick()
		setTimeout(() =>{
			this.$fb.enable()
			this.$gtm.init('GTM-T5X9PFF')
			(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'https://crm.danica.ua/upload/crm/site_button/loader_1_omb21n.js');
		}, 5500)
	},
}
</script>
