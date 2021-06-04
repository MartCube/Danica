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
		this.$gtm.init(process.env.GTM)
	},
}
</script>
