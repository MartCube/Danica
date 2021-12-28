<template>
	<section class="intro">
		<h1 class="seo_title">
			{{ data.primary.seo_title }}
		</h1>
		<span data-group="one" class="bg_letter first">{{ firstWord[0] }}</span>
		<span class="bg_letter second">{{ secondWord[0] }}</span>
		<div class="text">
			<div class="title">
				<span v-for="(letter, i) in first_title" :key="i" ref="lettersWeAre" data-group="one">{{ letter }}</span>
			</div>
			<div class="title">
				<span v-for="(letter, i) in second_title" :key="i" ref="lettersLeadersIn" data-group="two">{{ letter }}</span>
			</div>
			<div class="text_slider">
				<div class="first">
					<span v-for="(letter, i) in firstWord" :key="i" data-group="one">{{ letter }}</span>
				</div>
				<div class="second">
					<span v-for="(letter, i) in secondWord" :key="i" data-group="two">{{ letter }}</span>
				</div>
			</div>
			<ButtonItem @click.native="openModal"> {{ data.primary.button }} </ButtonItem>
		</div>

		<MediaQueryProvider :queries="{ mobile: '(min-width: 900px)' }" ssr>
			<MatchMedia v-slot="{ mobile }">
				<div v-if="mobile" class="collage">
					<div data-group="one" class="first group-one">
						<img :src="data.items[0].collage_image1.url" loading="lazy" class="lazyload" alt="danica" />
					</div>
					<div data-group="one" class="second group-one">
						<img :src="data.items[0].collage_image3.url" loading="lazy" class="lazyload" alt="danica" />
					</div>
					<div data-group="one" class="third group-one">
						<img :src="data.items[0].collage_image2.url" loading="lazy" class="lazyload" alt="danica" />
					</div>
					<div data-group="two" class="first group-two">
						<img :src="data.items[1].collage_image1.url" loading="lazy" class="lazyload" alt="danica" />
					</div>
					<div data-group="two" class="second group-two">
						<img :src="data.items[1].collage_image2.url" loading="lazy" class="lazyload" alt="danica" />
					</div>
					<div data-group="two" class="third group-two">
						<img :src="data.items[1].collage_image3.url" loading="lazy" class="lazyload" alt="danica" />
					</div>
				</div>
			</MatchMedia>
		</MediaQueryProvider>
	</section>
</template>

<script>
import { MediaQueryProvider, MatchMedia } from 'vue-component-media-queries'

export default {
	components: { MediaQueryProvider, MatchMedia },
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	computed: {
		first_title() {
			return this.data.primary.first_title.split('')
		},
		second_title() {
			return this.data.primary.second_title.split('')
		},
		firstWord() {
			return this.data.items[0].collage_title.split('')
		},
		secondWord() {
			return this.data.items[1].collage_title.split('')
		},
	},
	async mounted() {
		await this.$nextTick()
	},
	methods: {
		openModal() {
			this.$store.dispatch('bindModalContact', true)
		},
	},
}
</script>

<style lang="scss" scoped>
$animation-duration: 9s;

@mixin animation($animation-name) {
	animation: $animation-name $animation-duration ease-in-out infinite;
}

.intro {
	background-color: hsl(0, 0%, 100%);
	overflow: hidden;
	padding-top: 0;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(8, 10.5vh);

	.seo_title {
		display: none;
	}

	button {
		margin-top: 2rem;
	}

	.bg_letter {
		grid-column: 1 / 4;
		grid-row: 1 / 9;
		display: grid;
		opacity: 0;
		z-index: 0;
		line-height: 1.3;
		font-size: 30rem;
		font-family: 'Home';
		font-weight: bold;
		color: hsl(0, 0%, 98%);
		filter: drop-shadow(10px 10px 10px hsl(0, 0%, 90%)) drop-shadow(0px 0px 1px hsl(0, 0%, 98%));
		&.first {
			@include animation(fadeBgLetters);
			animation-delay: 0.4s;
		}
		&.second {
			@include animation(fadeBgLetters);
			animation-delay: 4.5s;
		}
	}

	.text {
		grid-column: 2 / 6;
		grid-row: 2 / 6;
		z-index: 8;

		.title {
			width: max-content;
			align-items: center;
			span {
				opacity: 0; // opacity: 1
				min-width: 1rem;
				text-transform: none;
				line-height: 1;
				font-size: 4rem;
				line-height: 1.2;
			}
		}
	}

	.collage {
		grid-column: 4 / 9;
		grid-row: 1 / 9;
		position: relative;
		img {
			width: 100%;
			height: 100%;
			margin: 0;
			padding: 0;
			object-fit: cover;
			display: block;
			position: relative;
			transform: translateX(-5%);
			opacity: 0;
			border: 10px solid white;
		}
		div {
			overflow: hidden;
			position: absolute;
			&.group-one {
				img {
					@include animation(fadeImageCollage);
					@for $i from 1 through 3 {
						&:nth-child(#{$i}) {
							animation-delay: #{$i / 9}s;
						}
					}
				}
			}
			&.group-two {
				img {
					@include animation(fadeImageCollage);
					@for $i from 1 through 3 {
						&:nth-child(#{$i}) {
							animation-delay: #{4.3 + ($i / 9)}s;
						}
					}
				}
			}
		}
		.first {
			&.group-one {
				z-index: 7;
			}
			z-index: 3;
			height: 50%;
			bottom: 0;
			left: 0;
			width: 30%;
		}
		.second {
			&.group-one {
				z-index: 6;
			}
			z-index: 2;
			bottom: 0;
			height: 100%;
			left: 20%;
			width: 60%;
		}
		.third {
			&.group-one {
				z-index: 5;
			}
			z-index: 1;
			bottom: 10%;
			height: 70%;
			right: 0;
			width: 40%;
		}
	}

	.text_slider {
		margin-top: 2rem;
		position: relative;
		overflow: hidden;
		height: 5vw;
		z-index: 10;
		.first {
			z-index: 2;
			span {
				will-change: opacity, transform;
				@include animation(fadeTitle);
				@for $i from 1 through 15 {
					&:nth-child(#{$i}) {
						animation-delay: #{$i / 9}s;
					}
				}
			}
		}
		.second {
			z-index: 1;
			span {
				will-change: opacity, transform;
				@include animation(fadeTitle);
				@for $i from 1 through 15 {
					&:nth-child(#{$i}) {
						animation-delay: #{4.3 + ($i / 9)}s;
					}
				}
				animation-delay: 4s;
			}
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
			transform: translateX(-10px);
			text-transform: none;
			line-height: 4.5vw;
			font-weight: 700;
			font-size: 4.5vw;
			min-width: 1rem;
			position: relative;
			z-index: 4;
			display: block;
		}
	}

	// animation

	// first title that appear only once
	$counter: 1;
	$total: 15;
	.title {
		span {
			animation: fadeLetters 0.5s ease-in-out 1 forwards;
		}
		@for $i from 1 through 15 {
			span:nth-child(#{$i}) {
				animation-delay: #{$i / 9}s;
			}
		}
	}

	@keyframes fadeLetters {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes fadeImageCollage {
		0% {
			opacity: 0;
			transform: translateX(-5%);
		}
		7% {
			opacity: 1;
			transform: translateX(0);
		}
		35% {
			opacity: 1;
			transform: translateX(0);
		}
		50% {
			opacity: 0;
			transform: translateX(-5%);
		}
		100% {
			opacity: 0;
			transform: translateX(-5%);
		}
	}
	@keyframes fadeBgLetters {
		0% {
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		47% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes fadeTitle {
		0% {
			transform: translateX(-10px);
			opacity: 0;
		}
		10% {
			transform: translateX(0);
			opacity: 1;
		}
		48% {
			transform: translateX(0);
			opacity: 1;
		}
		50% {
			transform: translateX(-10px);
			opacity: 0;
		}
		100% {
			transform: translateX(-10px);
			opacity: 0;
		}
	}

	@media (max-width: 900px) {
		.collage {
			display: none;
		}
		.text {
			width: 100%;
			grid-column: 2 / 8;
			grid-row: 2 / 7;
			.title span {
				font-size: 10vw;
				line-height: 1.2;
			}
			button {
				align-self: flex-end;
				margin: 14vw 10vw;
				text-transform: initial;
			}
		}
		.text_slider span {
			font-size: 8.5vw;
			display: inline-block;
			line-height: 5rem;
		}
	}
	@media (max-width: 600px) {
		.text {
			width: 100%;
			grid-column: 3 / 10;
			grid-row: 2 /6;
			.title {
				span {
					font-size: 3rem;
				}
			}
			button {
				align-self: flex-end;
				margin: 20% 10%;
				text-transform: initial;
			}
		}
		.bg_letter {
			grid-column: 1 / 5;
			grid-row: 1 / 4;
			font-size: 25rem;
		}
	}
	@media (max-width: 400px) {
		.text {
			.title {
				span {
					font-size: 2rem;
				}
			}
		}
		.bg_letter {
			font-size: 20rem;
		}
	}
}
</style>
