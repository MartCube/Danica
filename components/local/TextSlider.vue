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
	cursor: pointer;
	position: relative;
	overflow: hidden;

	width: auto;
	z-index: 10;
	height: 6rem;
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
		&::after {
			content: '';
			position: absolute;
			width: 0;
			height: 100%;
			left: 0;
			background: $primary;
			z-index: -1;
			transition: all 0.35s ease;
		}
		&:hover {
			&::after {
				width: 100%;
			}
		}
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
		// transition: opacity, transform 1s ease-out;
		// animation: titleLetters 1s linear infinite alternate;
	}
}

@media (min-width: 1500px) {
	.text_slider {
		span {
			// font-size: 8.5vw;
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
		font-size: 2.2rem;
	}
}
</style>
