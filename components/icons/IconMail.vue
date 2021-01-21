<template>
	<svg viewBox="0 0 24 24" :width="size" :height="size" :fill="fill">
		<path d="M22,9.8a1.72,1.72,0,0,0-.94-1.5L12,3.64,3,8.3A1.73,1.73,0,0,0,2,9.8v8.8a1.9,1.9,0,0,0,2,1.76H20a1.9,1.9,0,0,0,2-1.76ZM12,5.68,20,9.8h0L12,14.2,4,9.8ZM4,18.6V11.86l8,4.42,8-4.39V18.6Z" />
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
