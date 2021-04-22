<template>
	<div class="text_slider">
		<div class="first">
			<span v-for="(letter, i) in lettersDesign" :key="i">{{ letter }}</span>
		</div>
		<div class="second">
			<span v-for="(letter, i) in lettersArchitecture" :key="i">{{ letter }}</span>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		active: true,
		link: '/services/interior-design',
		letters: null,
	}),
	computed: {
		lettersArchitecture() {
			return 'Architecture'.split('')
		},
		lettersDesign() {
			return 'Design'.split('')
		},
		array() {
			return [this.lettersArchitecture, this.lettersDesign]
		},
	},
	mounted() {
		this.letters = this.lettersDesign
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
.text_slider {
	margin-top: 2rem;
	// cursor: pointer;
	position: relative;
	overflow: hidden;

	width: auto;
	z-index: 10;
	height: 8rem;
	.first {
		z-index: 2;
	}
	.second {
		z-index: 1;
	}
	.first,
	.second {
		position: absolute;
		display: flex;
		overflow: hidden;
		align-items: center;
		width: fit-content;
		height: fit-content;
	
	}
	span {
		opacity: 0; // opacity: 1
		transform: translateY(-10px);
		text-transform: none;
		line-height: initial;
		font-weight: 700;
		font-size: 4.5vw;
		min-width: 1rem;
		position: relative;
		z-index: 4;
		display: block;
		will-change: opacity, transform;
	}
}

@media (min-width: 1500px) {
	.text_slider {
		span {
			display: inline-block;
			line-height: 7vw;
		}
	}
}
@media (max-width: 900px) {
	.text_slider span {
		font-size: 8.5vw;
		display: inline-block;
		line-height: 5rem;
	}
}
@media (max-width: 400px) {
	.text_slider span {
		font-size: 2rem;
	}
}
</style>
