<template>
	<div>
		<Navbar />
		<SideBar />
		<main>
			<Nuxt keep-alive />
		</main>
		<Footer />
		<LazyContactModal />
		<CookieBox />
	</div>
</template>

<script>
import CookieBox from '~/components/global/CookieBox.vue'
export default {
	name: 'Default',
	components: { CookieBox },
	data: () => ({}),
	async mounted() {
		await this.$nextTick()
		setTimeout(() => {
			this.initGTM()
		}, 5000)
	},
	methods: {
		initGTM() {
			;(function (w, d, s, l, i) {
				w[l] = w[l] || []
				w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
				const f = d.getElementsByTagName(s)[0]
				const j = d.createElement(s)
				const dl = l !== 'dataLayer' ? '&l=' + l : ''
				j.async = true
				j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
				f.parentNode.insertBefore(j, f)
			})(window, document, 'script', 'dataLayer', 'GTM-T5X9PFF')
		},
	},
}
</script>
