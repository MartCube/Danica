<template>
	<n-link class="text_slider" :to="link">
		<template v-if="active">
			<span v-for="(letter, i) in lettersDesign" :key="i">{{ letter }}</span>
		</template>
		<template v-else>
			<span v-for="(letter, i) in lettersArchitecture" :key="i">{{ letter }}</span>
		</template>
	</n-link>
</template>

<script>
import anime from 'animejs'

export default {
	data: () => ({
		active: true,
		link: '/services/interior-design',
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
	watch: {},
	created() {
		setTimeout(() => this.Animate(), 2000)
	},
	methods: {
		async Animate() {
			await this.$nextTick()
			console.log('animate')

			const StartUpTimeline = anime.timeline({
				autoplay: true,
			})

			const el = document.querySelectorAll('.text_slider span')
			const duration = 1000

			StartUpTimeline.add({
				targets: el,
				opacity: [0, 1],
				rotateY: [90, 0],

				delay: anime.stagger(50, { from: 'first' }),
				easing: 'easeOutExpo',
				duration,
			})
				.add({
					targets: el,
					duration: 3000,
				})
				.add({
					targets: el,
					opacity: [1, 0],
					rotateY: [0, -90],

					delay: anime.stagger(50, { from: 'last' }),
					easing: 'easeOutExpo',
					duration,
				})

			StartUpTimeline.finished.then(() => {
				console.log('finished')

				// changing the array of letters
				this.active = !this.active
				// changing the link
				if (this.active) this.link = '/services/interior-design'
				else this.link = '/services/architecture'
			})
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

	width: max-content;
	display: flex;
	align-items: center;
	z-index: 2;
	span {
		opacity: 0; // opacity: 1

		text-transform: none;
		line-height: initial;
		font-weight: 700;
		font-size: 4.5vw;
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
