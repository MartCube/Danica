<template>
	<svg viewBox="0 0 24 24" :width="size" :height="size" :fill="fill" :class="{ bottom: bottom, left: left }">
		<path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
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
		bottom: {
			type: Boolean,
			default: false,
		},
	},
}
</script>

<style lang="scss" scoped>
.bottom {
	transform: rotate(90deg);
}
.left {
	transform: rotate(180deg);
}
</style>
