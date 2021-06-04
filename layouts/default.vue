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
	async mounted() {
		await this.$nextTick()
		this.$fb.enable()

		this.$gtm.init('GTM-T5X9PFF')
	},
}
</script>
