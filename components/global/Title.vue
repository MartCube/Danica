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
	height: 240px;
	padding-left: 240px;

	display: flex;
	align-items: center;

	text-transform: capitalize;
	font-size: 4rem;
}
@media (max-width: 900px) {
	.title {
		height: 200px;

		padding: 0;
		font-size: 2.5rem;
		justify-content: center;
	}
}
</style>
