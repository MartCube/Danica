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

export function introAnim(lettersWeAre, lettersLeadersIn, lettersDesign, collage1, collage2, collage3) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	const colllageEasing = 'easeInOutCubic'
	const collageDuration = '1000'
	const collageBorder = '10px solid white'

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
	)
		.add(
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
		.add(
			{
				targets: collage1,
				opacity: [0, 1],
				translateX: ['-50%', '0%'],
				// scaleY: [0.75, 1],
				width: [0, '300px'],

				border: collageBorder,
				easing: colllageEasing,
				duration: collageDuration,
			},
			1400,
		)
		.add(
			{
				targets: collage2,
				opacity: [0, 1],
				translateY: ['50%', '0%'],
				height: [0, '600px'],

				border: collageBorder,
				easing: colllageEasing,
				duration: collageDuration,
			},
			1200,
		)
		.add(
			{
				targets: collage3,
				opacity: [0, 1],
				translateX: ['-50%', '0%'],
				width: [0, '400px'],

				border: collageBorder,
				easing: colllageEasing,
				duration: collageDuration,
			},
			1000,
		)
		.add(
			{
				targets: lettersDesign,
				opacity: [0, 1],
				rotateY: [-90, 0],

				delay: anime.stagger(50, { from: 'first' }),
				easing: 'easeOutExpo',
				duration: 2000,
			},
			1600,
		)
}
