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
	props: {},
	data: () => ({
		active: true,
		link: '/services/design',
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
	},
	methods: {
		async Animate() {
			await this.$nextTick()

			const StartUpTimeline = anime.timeline({
				autoplay: true,
			})
			const el = document.querySelectorAll('.text_slider span')
			const duration = 1200

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
					duration,
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
				// changing the array of letters
				this.active = !this.active
				// changing the link
				if (this.active) this.link = '/services/design'
				else this.link = '/services/architecture'
				this.Animate()
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
	span {
		opacity: 0; // opacity: 1

		text-transform: none;
		line-height: initial;
		font-weight: 700;
		font-size: 4rem;
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
</style>
