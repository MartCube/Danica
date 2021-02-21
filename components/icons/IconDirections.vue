<template>
	<svg viewBox="0 0 24 24" :width="size" :height="size" :fill="fill">
		<path d="M21.48,10.72l-8.19-8.2a1.84,1.84,0,0,0-2.57,0L2.53,10.71a1.82,1.82,0,0,0,0,2.57l8.19,8.19a1.81,1.81,0,0,0,2.56,0l8.17-8.18A1.82,1.82,0,0,0,21.48,10.72ZM12,20.19,3.82,12,12,3.8,20.19,12Zm-3.65-9.1v3.64h1.82V12h3.64v2.28L17,11.09,13.82,7.91v2.27H9.27A.91.91,0,0,0,8.36,11.09Z" />
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
