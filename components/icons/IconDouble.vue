<template>
	<svg viewBox="0 0 24 24" :width="size" :height="size" :fill="fill" :class="{ left: left }">
		<path d="M4.17,2,1.83,4.35,9.46,12,1.83,19.65,4.17,22l10-10Zm9,0L10.83,4.35,18.46,12l-7.63,7.65L13.17,22l10-10Z" />
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
