import anime from 'animejs'

export function logoAnim(triangle) {
	anime({
		targets: triangle,
		opacity: [0, 1],
		scale: [0.8, 1],
		rotateX: [-90, 0],

		easing: 'easeInOutCubic',
		duration: 1000,
	})
}

export function postAnim(cards) {
	anime({
		targets: cards,
		opacity: [0, 1],
		scale: [0.8, 1],
		easing: 'cubicBezier(0.4, 0.25, 0.3, 1)',
		delay: anime.stagger(100, { from: 'first' }),
		duration: 750,
	})
}

export function nambersIncreasingAnimation(firstNumber, secondNumber, thirdNumber) {
	const html = document.querySelectorAll('.achievements .counter .number')

	const duration = 1500
	const round = 1

	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add({
		duration,
		autoplay: true,
		easing: 'easeOutExpo',
		loop: 1,
	})
		.add(
			{
				targets: html[0],
				innerHTML: [0, firstNumber],
				round,
			},
			0,
		)
		.add(
			{
				targets: html[1],
				innerHTML: [0, secondNumber],
				round,
			},
			0,
		)
		.add(
			{
				targets: html[2],
				innerHTML: [0, thirdNumber],
				round,
			},
			0,
		)
}

export function buttonAnim(button, overlay) {
	anime({
		targets: button,
		opacity: [0, 1],
		translateX: ['50%', '0%'],

		easing: 'easeInOutCubic',
		duration: 750,
		delay: 2000,
	})
	anime({
		targets: overlay,
		height: [0, '100%'],
		easing: 'easeInOutCubic',
		duration: 350,
		delay: 2000,
	})
}

export function modalAnim(modal) {
	anime({
		targets: modal,
		opacity: [0, 1],
		scale: [0.75, 1],

		easing: 'easeOutExpo',
		duration: 350,
	})
}

export function messengersAnim(items) {
	anime({
		targets: items,
		opacity: [0, 1],
		translateY: ['400%', '0%'],
		delay: anime.stagger(50, { from: 'last' }),

		easing: 'easeInOutElastic',
		duration: 2500,
	})
}

export function localleAnim(locales, show) {
	if (show) {
		anime({
			targets: locales,
			opacity: [0, 1],
			translateX: ['-50%', '0%'],

			easing: 'easeInOutCubic',
			duration: 250,
			delay: anime.stagger(50, { from: 'last' }),
		})
	} else
		anime({
			targets: locales,
			opacity: [1, 0],
			translateX: ['0%', '-50%'],

			easing: 'easeInCubic',
			duration: 150,
			delay: anime.stagger(50, { from: 'last' }),
		})
}

export function charles() {
	const duration = 2500
	const charlesTop = document.querySelector('.charles .top')
	const charlesBottom = document.querySelector('.charles .bottom')

	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add({
		duration,
		autoplay: true,
		easing: 'easeOutExpo',
		endDelay: 200,
		loop: 1,
		loopComplete(anim) {
			StartUpTimeline1.play()
		},
	})
		.add(
			{
				targets: charlesBottom,
				opacity: [0, 1],
				translateY: ['-30%', '0'],
				duration: 700,
			},
			0,
		)
		.add(
			{
				targets: charlesTop,
				easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)',
				keyframes: [{ opacity: 0, translateY: '-100%' }, { opacity: 0 }, { translateY: '20px', opacity: 1 }, { translateY: '10px', rotate: '6deg', translateX: '25px', duration: 600 }],
			},
			100,
		)

	const StartUpTimeline1 = anime
		.timeline({
			targets: charlesTop,
			duration,
			direction: 'alternate',
			autoplay: false,
			easing: 'easeOutExpo',
			loop: true,
		})
		.add({
			rotate: ['6deg', '-6deg'],
			translateX: ['25px', '-18px'],
			translateY: ['10px', '9px'],
		})
}

export function HomeIntroAnim(lettersWeAre, lettersLeadersIn) {
	// const design = document.querySelectorAll('.intro .design')
	// const architecture = document.querySelectorAll('.intro .architecture')
	// const collage1 = design[0]
	// const collage2 = design[1]
	// const collage3 = design[2]
	// const architecture1 = architecture[0]
	// const architecture2 = architecture[1]
	// const architecture3 = architecture[2]

	const el2 = document.querySelectorAll('.second span')
	const el1 = document.querySelectorAll('.first span')

	const duration = 2500
	const stagger = 50

	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	const designAnimation = anime.timeline({
		autoplay: true,
		duration,
		easing: 'easeOutExpo',
		loop: 1,
		loopComplete(anim) {
			architectureAnimation.play()
		},
	})
	const architectureAnimation = anime.timeline({
		duration,
		easing: 'easeOutExpo',
		loop: 1,
		autoplay: false,
		loopComplete(anim) {
			designAnimation.play()
		},
	})

	StartUpTimeline.add(
		{
			targets: lettersWeAre,
			opacity: [0, 1],
			translateY: ['100%', '0%'],

			easing: 'easeInOutCubic',
			delay: anime.stagger(50, { from: 'first' }),
			duration: 1000,
		},
		0,
	).add(
		{
			targets: lettersLeadersIn,
			opacity: [0, 1],
			translateY: ['100%', '0%'],

			easing: 'easeInOutCubic',
			delay: anime.stagger(50, { from: 'first' }),
			duration: 1000,
		},
		200,
	)

	designAnimation
		.add(
			{
				targets: '.bg_letter.first',
				opacity: [0, 1],
			},
			0,
		)
		.add(
			{
				targets: el1,
				delay: anime.stagger(stagger, { start: 0 }),
				duration: 500,
				zIndex: 10,
				opacity: 1,
			},
			1000,
		)
		// .add(
		// 	{
		// 		targets: collage1,
		// 		width: '16vw',
		// 		opacity: 1,
		// 	},
		// 	0,
		// )
		// .add(
		// 	{
		// 		targets: collage2,
		// 		width: '35vw',
		// 		opacity: 1,
		// 	},
		// 	200,
		// )
		// .add(
		// 	{
		// 		targets: collage3,
		// 		width: '30vw',
		// 		opacity: 1,
		// 	},
		// 	300,
		// )
		// .add(
		// 	{
		// 		targets: collage3,
		// 		duration: 500,
		// 		width: 0,
		// 		opacity: 0,
		// 	},
		// 	4500,
		// )
		// .add(
		// 	{
		// 		targets: collage2,
		// 		duration: 500,
		// 		width: 0,
		// 		opacity: 0,
		// 	},
		// 	4500,
		// )
		// .add(
		// 	{
		// 		targets: collage1,
		// 		duration: 500,
		// 		width: 0,
		// 		opacity: 0,
		// 	},
		// 	4500,
		// )
		.add({
			targets: el1,
			delay: anime.stagger(stagger, { from: 'last' }),
			duration: 500,
			opacity: 0,
			zIndex: 0,
		})
		.add({
			targets: '.bg_letter.first',
			opacity: 0,
			duration: 500,
		})

	architectureAnimation
		.add({
			targets: '.bg_letter.second',
			opacity: [0, 1],
		})
		.add(
			{
				targets: el2,
				delay: anime.stagger(stagger, { start: 0 }),
				duration: 500,
				opacity: 1,
				zIndex: 10,
			},
			1000,
		)
		// .add(
		// 	{
		// 		targets: architecture1,
		// 		width: '16vw',
		// 		opacity: 1,
		// 	},
		// 	0,
		// )
		// .add(
		// 	{
		// 		targets: architecture2,
		// 		width: '35vw',
		// 		opacity: 1,
		// 	},
		// 	200,
		// )
		// .add(
		// 	{
		// 		targets: architecture3,
		// 		width: '30vw',
		// 		opacity: 1,
		// 	},
		// 	300,
		// )
		// .add(
		// 	{
		// 		targets: architecture3,
		// 		duration: 500,
		// 		width: 0,
		// 		opacity: 0,
		// 	},
		// 	4500,
		// )
		// .add(
		// 	{
		// 		targets: architecture2,
		// 		duration: 500,
		// 		width: 0,
		// 		opacity: 0,
		// 	},
		// 	4500,
		// )
		// .add(
		// 	{
		// 		targets: architecture1,
		// 		duration: 500,
		// 		width: 0,
		// 		opacity: 0,
		// 	},
		// 	4500,
		// )
		.add({
			targets: el2,
			delay: anime.stagger(stagger, { from: 'last' }),
			duration: 500,
			opacity: [1, 0],
			zIndex: 0,
		})
		.add({
			targets: '.bg_letter.second',
			opacity: [1, 0],
			duration: 500,
		})
}

export function serviceIntroAnim(maintitle, subtitle, project) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add(
		{
			targets: maintitle,
			opacity: [0, 1],
			translateY: ['100%', '0%'],

			easing: 'easeInOutCubic',
			delay: anime.stagger(50, { from: 'first' }),
			duration: 1000,
		},
		1000,
	)
		.add(
			{
				targets: subtitle,
				opacity: [0, 1],
				translateY: ['100%', '0%'],

				easing: 'easeInOutCubic',
				delay: anime.stagger(50, { from: 'first' }),
				duration: 1000,
			},
			1200,
		)
		.add(
			{
				targets: project,
				opacity: [0, 1],
				translateY: ['-100%', '0%'],

				easing: 'easeInOutCubic',
				duration: 1000,
			},
			1200,
		)
}
