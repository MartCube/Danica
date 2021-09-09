<template>
	<div>
		{{gtmFrame}}
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
	data: () => ({
		gtmFrame: '',
	}),
	async mounted() {
		await this.$nextTick()
		setTimeout(() => {
			// this.$fb.enable();
			this.initGTM()
			// this.$gtm.init('GTM-T5X9PFF')
			// document.addEventListener('scroll', this.initGTM)
			// document.addEventListener('mousemove', this.initGTM)
			// document.addEventListener('touchstart', this.initGTM)
		}, 5000)
	},
	methods: {
		initGTM() {
			this.gtmFrame = '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T5X9PFF" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>'
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
