<template functional>
	<h1 :style="{ color: props.color }" class="title">
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
		color: {
			type: String,
			default: 'hsl(0, 0%, 10%)',
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
		height: initial;
		margin: 40px 0;
		margin-left: 0px;
		font-size: 2rem;
		padding: 0;
		margin-left: 60px;
		display: inline;
		width: calc(100% - 60px);
		text-align: left;
	}
}
@media (max-width: 320px) {
	.title {
		font-size: 1.8rem;
	}
}
</style>
