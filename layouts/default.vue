<template>
	<div>
		<Navbar />
		<SideBar />
		<main>
			<Nuxt keep-alive />
		</main>
		<Footer />
		<LazyContactModal />
		<LazyModalVideo />
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
			// this.security()
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
			})(window, document, 'script', 'dataLayer', 'GTM-TP987N2')

		},
			// <!-- Global site tag (gtag.js) - Google Analytics -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=UA-191786223-1"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'UA-191786223-1');
// </script>
	},
}
</script>
