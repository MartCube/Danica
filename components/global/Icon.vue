<template functional>
	<svg v-bind="data.attrs" viewBox="0 0 24 24" :width="props.size" :height="props.size" :fill="props.fill" :class="$options.methods.getStyleClasses(props)" :v-on="listeners">
		<path :d="$options.methods.getPath(props)" />
	</svg>
</template>

<script>
import icons from '~/static/icons.json'
export default {
	name: 'Icon',
	props: {
		name: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			default: '24px',
		},
		fill: {
			type: String,
			default: 'rgb(255, 196, 36)',
		},
		direction: {
			type: String,
			default: 'normal',
		},
	},
	methods: {
		getPath(props) {
			return icons[props.name]
		},
		getStyleClasses(props) {
			return [props.direction].map((val) => val && `${val}`)
		},
	},
}
</script>

<style scoped>
svg {
	transition: all 0.35s ease;
}
/* direction prop styles */
.top {
	transform: rotate(-90deg);
}
.bottom {
	transform: rotate(90deg);
}
.left {
	transform: rotate(180deg);
}
</style>
