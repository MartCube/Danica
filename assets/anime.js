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

export function introAnim(lettersWeAre, lettersLeadersIn, collage1, collage2, collage3) {
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
      translateY: ["100%", "0%"],

      easing: "easeInOutCubic",
      delay: anime.stagger(50, {from: "first"}),
      duration: 1000,
    },
    0
  )
    .add(
      {
        targets: lettersLeadersIn,
        opacity: [0, 1],
        translateY: ["100%", "0%"],

        easing: "easeInOutCubic",
        delay: anime.stagger(50, {from: "first"}),
        duration: 1000,
      },
      200
    )
    .add(
      {
        targets: collage1,
        // opacity: [0, 1],
        width: [0, "16vw"],
        border: collageBorder,
        easing: colllageEasing,
        duration: collageDuration,
      },
      1400
    )
    .add(
      {
        targets: collage2,
        // opacity: [0, 1],
        width: [0, "37vw"],
        border: collageBorder,
        easing: colllageEasing,
        duration: collageDuration,
      },
      1200
    )
    .add(
      {
        targets: collage3,
        // opacity: [0, 1],
        width: [0, "30vw"],

        border: collageBorder,
        easing: colllageEasing,
        duration: collageDuration,
      },
      1000
    );
}
