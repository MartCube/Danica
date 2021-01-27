<template>
	<h2 class="title">{{ value }}</h2>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>
.title {
	width: 100%;
	margin: 100px 0;
	padding-left: 240px;

	text-transform: capitalize;
	font-size: 4rem;
}
</style>
