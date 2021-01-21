<template>
	<svg viewBox="0 0 24 24" :width="size" :height="size" :fill="fill">
		<path d="M4.5,9.5A2.5,2.5,0,1,0,7,12,2.51,2.51,0,0,0,4.5,9.5Zm15,0A2.5,2.5,0,1,0,22,12,2.5,2.5,0,0,0,19.5,9.5ZM12,9.5A2.5,2.5,0,1,0,14.5,12,2.5,2.5,0,0,0,12,9.5Z" />
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
