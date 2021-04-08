<template>
	<div class="text_slider" >
		<div class="first">
			<span v-for="(letter, i) in lettersDesign" :key="i">{{ letter }}</span>
		</div>
		<div class="second">
			<span v-for="(letter, i) in lettersArchitecture" :key="i">{{ letter }}</span>
		</div>
		<!-- <template v-else> -->
			<!-- <span v-for="(letter, i) in lettersArchitecture" :key="i">{{ letter }}</span> -->
		<!-- </template> -->
	</div>
</template>

<script>
import anime from 'animejs'

export default {
	props: {},
	data: () => ({
		active: true,
		link: '/services/design',
		letters : null
	}),
	computed: {
		lettersArchitecture() {
			return 'Architecture'.split('')
		},
		lettersDesign() {
			return 'Design'.split('')
		},
	},
	mounted() {
		this.Animate()
		this.letters = this.lettersDesign
		// setTimeout(() => this.letters = , 2000)
	},
	methods: {
		 Animate() {
			let loops = 0;
			let el = document.querySelectorAll('.text_slider span');
			// await this.$nextTick()

			const StartUpTimeline = anime.timeline({
				// autoplay: true,
				easing: 'easeOutExpo',
				loop: true,
				direction: 'alternate',
				duration: 2000,
				changeComplete: (e) => {
					// this.letters = this.lettersArchitecture
				},
				update: (e) => {
					// logEl.innerHTML = JSON.stringify(battery);
					++loops
					console.log(e, loops);

				},
				// loopComplete: (e) => {
				// 	++loops
				// 	console.log(e, loops);
				// 	if(loops % 2 === 0 ){
				// 		this.letters = this.lettersArchitecture;
				// 		el = document.querySelectorAll('.text_slider span')
				// 	}
				// 	else {
				// 		this.letters = this.lettersDesign;
				// 		el = document.querySelectorAll('.text_slider span')
				// 	}
				// },
			}).add({
				targets: ".first span",
				opacity: [0, 1],
				direction: "forwards",
				delay: anime.stagger(100),
			},
			2000
			).add({
				targets: ".second span",
				opacity: [0, 1],
				direction: "forwards",
				delay: anime.stagger(100),
			},
			2000)


			StartUpTimeline.finished.then(() => {
			// 	// changing the array of letters
			// 	this.active = !this.active
			// // 	// changing the link
			// 	if (this.active) this.link = '/services/design'
			// 	else this.link = '/services/architecture'
			// 	// this.Animate()
			})
		},
		// loop(t) {
		// 	StartUpTimeline.tick(t);
		// 	customRAF = requestAnimationFrame(loop);
			
		// },
		
	},
}
</script>

<style lang="scss" scoped>
.text_slider {
	margin-top: 2rem;
	cursor: pointer;
	position: relative;
	overflow: hidden;

	width: max-content;
	.first, .second{
		position: absolute;
		display: flex;
		align-items: center;
		z-index: 2;
		min-height: 6rem;
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



@keyframes titleLetters {
	
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
