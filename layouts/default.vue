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
		}, 5500)
	},
}
</script>
