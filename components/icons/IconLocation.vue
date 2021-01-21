<template>
	<svg viewBox="0 0 24 24" :width="size" :height="size" :fill="fill">
		<path d="M12,4a5,5,0,0,1,5,5.15c0,2.16-1.72,4.67-5,7.32C8.72,13.82,7,11.3,7,9.15A5,5,0,0,1,12,4m0-2A7,7,0,0,0,5,9.15Q5,13.83,12,19q7-5.16,7-9.85A7,7,0,0,0,12,2Zm0,5a2,2,0,1,0,2,2A2,2,0,0,0,12,7ZM5,20H19v2H5Z" />
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
