<template>
	<div>
		<IntroImage />
		<LatestProjects />
	</div>
</template>

<script>
export default {
	name: 'Services',
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('bindNavbarTransparent', false)
		next()
	},
	middleware: 'navbar',
}
</script>
