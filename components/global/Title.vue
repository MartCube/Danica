<template functional>
	<h1 class="title">
		{{ props.value }}
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
	width: max-content;
	height: 240px;
	padding-left: 256px;

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
		padding: 0;
		align-self: center;
	}
}
@media (max-width: 320px) {
	.title {
		font-size: 1.8rem;
	}
}
</style>
