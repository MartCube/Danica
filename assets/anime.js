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

export function modalAnim(modal) {
	anime({
		targets: modal,
		opacity: [0, 1],
		scale: [0.75, 1],
		display: 'inline',

		easing: 'easeInOutCubic',
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

export function introAnim(lettersWeAre, lettersLeadersIn, collage1, collage2, collage3) {
  const StartUpTimeline = anime.timeline({
    autoplay: true,
   
  });
  const StartUpTimeline2 = anime.timeline({
    autoplay: true,
    duration: 2500,
    easing: "easeOutExpo",
    loop: true,
    update: function (anim) {
      console.log(anim, anim.progress);
    },
    loopBegin: function (anim) {
      // loopBegan++;
      console.log( loopBegan);
    },
    loopComplete: function (anim) {
      // loopCompleted++;
			StartUpTimeline1.play()
      console.log(StartUpTimeline1);
    },
  });
  const StartUpTimeline1 = anime.timeline({
    autoplay: true,
    duration: 2500,
    easing: "easeOutExpo",
    loop: 1,
		autoplay: false,
		loopBegin: function (anim) {
			// loopBegan++;
			console.log( loopBegan);
		},
		loopComplete: function (anim) {
			// loopCompleted++;
			StartUpTimeline2.play();
			console.log(loopCompleted);
		},
  });
	let loopBegan = 0;
  let loopCompleted = 0;
  const colllageEasing = "easeOutSine";
  const collageDuration = "2500";
  const collageBorder = "10px solid white";
  let el2 = document.querySelectorAll(".second span");
  let el1 = document.querySelectorAll(".first span");

  let duration = 2500;
  let stagger = 50;

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
  ).add(
    {
      targets: lettersLeadersIn,
      opacity: [0, 1],
      translateY: ["100%", "0%"],

      easing: "easeInOutCubic",
      delay: anime.stagger(50, {from: "first"}),
      duration: 1000,
    },
    200
  );

  StartUpTimeline2
	.add({
    targets: ".bg_letter.first",
    opacity: [0, 1],
  },0)
	.add({
		targets: el1,
		delay: anime.stagger(stagger, {start: 0}),
		duration: 500,
		opacity: 1,
	},1000)
	.add(
		{
			targets: collage1,
			width: "16vw",
		},
		0
	)
	.add(
		{
			targets: collage2,
			width: "35vw",
		},
		200
	)
	.add(
		{
			targets: collage3,
			width: "30vw",
		},
		300
	)
	.add(
		{
			targets: collage3,
			duration: 500,
			width: 0,
		},
		4500
	)
	.add(
		{
			targets: collage2,
			duration: 500,
			width: 0,
		},
		4500
	)
	.add(
		{
			targets: collage1,
			duration: 500,
			width: 0,
		},
		4500
	)
	.add({
		targets: el1,
		delay: anime.stagger(stagger, {from: "last"}),
		duration: 500,
		opacity: [1, 0],
	})
	.add({
		targets: ".bg_letter.first",
		opacity: [1, 0],
		duration: 500,
	});

	StartUpTimeline1.add({
    targets: ".bg_letter.second",
    opacity: [0, 1],
  })
	.add(
		{
			targets: el2,
			delay: anime.stagger(stagger, {start: 0}),
			duration: 500,
			opacity: 1,
		},
		1000
	)
	.add(
		{
			targets: collage1,
			width: "16vw",
		},
		0
	)
	.add(
		{
			targets: collage2,
			width: "35vw",
		},
		200
	)
	.add(
		{
			targets: collage3,
			width: "30vw",
		},
		300
	)
	.add(
		{
			targets: collage3,
			duration: 500,
			width: 0,
		},
		4500
	)
	.add(
		{
			targets: collage2,
			duration: 500,
			width: 0,
		},
		4500
	)
	.add(
		{
			targets: collage1,
			duration: 500,
			width: 0,
		},
		4500
	)
	.add({
		targets: el2,
		delay: anime.stagger(stagger, {from: "last"}),
		duration: 500,
		opacity: [1, 0],
	})
	.add({
		targets: ".bg_letter.second",
      opacity: [1, 0],
      duration: 500,
    });

}
