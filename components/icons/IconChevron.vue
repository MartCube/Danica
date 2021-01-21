<template>
	<svg viewBox="0 0 24 24" :width="size" :height="size" :fill="fill" :class="{ left: left }">
		<path d="M8.17,2,5.83,4.35,13.46,12,5.83,19.65,8.17,22l10-10Z" />
	</svg>
</template>

<script>
export default {
	props: {
		size: {
			type: String,
			default: '24px',
		},
		fill: {
			type: String,
			default: 'hsl(0, 0%, 10%)',
		},
		left: {
			type: Boolean,
			default: false,
		},
	},
}
</script>

<style lang="scss" scoped>
.left {
	transform: rotate(180deg);
}
</style>
