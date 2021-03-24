<template>
	<div>
		<Navbar />
		<Nuxt keep-alive />
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
