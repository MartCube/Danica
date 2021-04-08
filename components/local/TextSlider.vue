<template>
	<div class="text_slider" >
		<div class="first">
			<span v-for="(letter, i) in lettersDesign" :key="i">{{ letter }}</span>
		</div>
		<div class="second">
			<span v-for="(letter, i) in lettersArchitecture" :key="i">{{ letter }}</span>
		</div>

	</div>
</template>

<script>
import anime, { timeline } from 'animejs'

export default {
	data: () => ({
		active: true,
		link: '/services/interior-design',
		letters: null
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
		this.Animate()
		this.letters = this.lettersDesign
	},
	methods: {
		 Animate() {
			// let el2 = document.querySelectorAll('.second span');
			// let el1 = document.querySelectorAll('.first span');

			// let duration = 2500;
			// let stagger = 50;

			// const StartUpTimeline = anime.timeline({
			// 	easing: 'easeOutExpo',
			// 	loop: true,
			// 	changeComplete: (e) => {
			// 		},
			// 	update: (e) => {
			// 		},
			// 	loopComplete: (e) => {
			// 		},
			// })
			// .add({
			// 	targets: el1,
			// 	direction: 'alternate',
			// 	delay: anime.stagger(stagger),
			// 	duration: duration,
			// 	opacity: 1,
			// })
			// .add({
			// 	targets: el1,
			// 	direction: 'alternate',
			// 	delay: anime.stagger(stagger, {from: 'last'}),
			// 	duration: duration,
			// 	opacity: 0,
			// })
			// .add({
			// 	targets: el2,
			// 	duration: duration,
			// 	delay: anime.stagger(stagger),
			// 	opacity: 1,
			// 	direction: 'alternate',
			// })
			// .add({
			// 	targets: el2,
			// 	duration: duration,
			// 	delay: anime.stagger(stagger, {from: 'last'}),
			// 	opacity: 0,
			// 	direction: 'alternate',
			// })
		},
		
	},
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
	height: 7rem;
	.first, .second{
		position: absolute;
		display: flex;
		align-items: center;
		z-index: 2;
		height: inherit;
	}
	span {
		opacity: 0; // opacity: 1
		transform: translateY(-10px);
		text-transform: none;
		line-height: initial;
		font-weight: 700;
		font-size: 4.5vw;
		min-width: 1rem;
		display: flex;
		will-change: opacity, transform;
		// transition: opacity, transform 1s ease-out;
		// animation: titleLetters 1s linear infinite alternate;
	}

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

@media (max-width: 900px) {
	.text_slider span{
		font-size: 8.5vw;
	}
}
@media (max-width: 400px) {
	.text_slider span{
		font-size: 1.8rem;
	}
}
</style>
