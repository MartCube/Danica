<template>
	<div class="wrapper">
		<Navbar />
		<SideBar />
		<main>
			<Nuxt keep-alive />
		</main>
		<Footer />
		<ContactModal v-show="modalContact" />
	</div>
</template>

<script>
export default {
	computed: {
		modalContact() {
			return this.$store.getters.modalContact
		},
	},
}
</script>
