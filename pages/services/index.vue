<template>
	<div class="container">
		<Title value="services" />

		<div class="services">
			<n-link to="/services/design">interior design</n-link>
			<n-link to="/services/architecture">architecture</n-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Services',
}
</script>

<style lang="scss" scoped>
.services {
	margin-top: 80px;
	margin-left: 240px;
}
</style>
