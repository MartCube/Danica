<template>
	<Error />
</template>

<script>
export default {
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('bindNavbarTransparent', false)
		next()
	},
	middleware: 'navbarTransparent',

	mounted() {
		this.$store.dispatch('bindNavbarTransparent', true)
	},
}
</script>
