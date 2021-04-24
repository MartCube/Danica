<template>
	<svg viewBox="0 0 24 24" :width="size" :height="size" :fill="fill">
		<path d="M21,11.39,5.23,3.26C4,2.6,2,3.24,2,4.87V21.12c0,1.47,1.82,2.35,3.23,1.62L21,14.61a1.76,1.76,0,0,0,0-3.22Z" />
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
	},
}
</script>
