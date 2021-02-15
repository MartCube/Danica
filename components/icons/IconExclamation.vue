<template>
	<svg viewBox="0 0 24 24" :width="size" :height="size" :fill="fill">
		<path d="M22,12A10,10,0,1,1,12,2,10,10,0,0,1,22,12ZM12,14a1.86,1.86,0,1,0,1.85,1.85A1.85,1.85,0,0,0,12,14ZM10.24,7.35l.3,5.48a.48.48,0,0,0,.48.46h2a.48.48,0,0,0,.48-.46l.3-5.48a.48.48,0,0,0-.48-.51H10.72a.48.48,0,0,0-.48.51Z" />
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
