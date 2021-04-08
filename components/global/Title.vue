<template>
	<h1 class="title">
		{{ value }}
	</h1>
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
		height: auto;
		margin: 40px 0;
		font-size: 2rem;
		padding-left: 40px;
	}
}
@media (max-width: 320px) {
	.title {
		font-size: 1.8rem;
	}
}
</style>
