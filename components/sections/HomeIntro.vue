<template>
	<section class="intro">
		<img class="bg_letter first" src="/d_letter.svg" alt="" />
		<img class="bg_letter second" src="/a_letter.svg" alt="" />
		<div class="text">
			<div class="title">
				<span v-for="(letter, i) in first_title" :key="i" ref="lettersWeAre">{{ letter }}</span>
			</div>
			<div class="title">
				<span v-for="(letter, i) in second_title" :key="i" ref="lettersLeadersIn">{{ letter }}</span>
			</div>
			<TextSlider :lettersDesign="designWord" :lettersArchitecture="architectureWord"/>
			<ButtonItem @click.native="openModal"> {{ data.primary.button }} </ButtonItem>
		</div>

		<div class="collage">
			<div class="first design">
				<img :src="data.items[0].collage_image1.url" loading="lazy" class="lazyload" alt="danica" @load="Animate" />
			</div>
			<div class="second design">
				<img :src="data.items[0].collage_image3.url" loading="lazy" class="lazyload" alt="danica" @load="Animate" />
			</div>
			<div class="third design">
				<img :src="data.items[0].collage_image2.url" loading="lazy" class="lazyload" alt="danica" @load="Animate" />
			</div>
			<div class="first architecture">
				<img :src="data.items[1].collage_image1.url" loading="lazy" class="lazyload" alt="danica" @load="Animate" />
			</div>
			<div class="second architecture">
				<img :src="data.items[1].collage_image2.url" loading="lazy" class="lazyload" alt="danica" @load="Animate" />
			</div>
			<div class="third architecture">
				<img :src="data.items[1].collage_image3.url" loading="lazy" class="lazyload" alt="danica" @load="Animate" />
			</div>
		</div>
	</section>
</template>

<script>
import { HomeIntroAnim } from '~/assets/anime'

export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		imagesLoaded: 0,
	}),
	computed: {
		first_title() {
			return this.data.primary.first_title.split('')
		},
		second_title() {
			return this.data.primary.second_title.split('')
		},
		designWord() {
			return this.data.items[0].collage_title.split('')
		},
		architectureWord() {
			return this.data.items[1].collage_title.split('')
		},
	},
	methods: {
		openModal() {
			this.$store.dispatch('bindModalContact', true)
		},
		Animate() {
			this.imagesLoaded++
			if (this.imagesLoaded === 6) {
				HomeIntroAnim(this.$refs.lettersWeAre, this.$refs.lettersLeadersIn)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.intro {
	width: 100%;
	height: calc(100vh - 120px);

	justify-content: flex-end;
	position: relative;
	// overflow: hidden;

	.bg_letter {
		position: absolute;
		left: 0;
		top: 7%;
		opacity: 0;
		width: 23vw;
		z-index: 6;

		&.second {
			width: 31vw;
			left: -5vw;
		}
	}

	.text {
		width: min-content;
		padding-top: 7vh;
		width: 40%;
		position: absolute;
		top: 0;
		left: 150px;
		display: flex;
		flex-direction: column;
		z-index: 8;

		.title {
			width: max-content;
			display: flex;
			align-items: center;
			overflow: hidden;
			span {
				opacity: 0; // opacity: 1
				min-width: 1rem;
				text-transform: none;
				line-height: initial;
				font-weight: 400;
				font-size: 4vw;
			}
		}

		button {
			margin: 2rem 0;
		}
	}

	.collage {
		width: 57vw;
		position: relative;
		img {
			width: 101%;
			height: 101%;
			margin: 0;
			padding: 0;
		}
		div {
			overflow: hidden;
			width: 0;
			position: absolute;
			border: 10px solid white;
			opacity: 0;
		}
		.first {
			z-index: 3;
			height: 16vw;
			bottom: 0;
			left: 0;
		}
		.second {
			z-index: 2;
			bottom: 0;
			height: 90vh;
			left: 8vw;
		}
		.third {
			z-index: 1;
			bottom: 100px;
			height: 30vw;
			bottom: 10vh;
			left: 27vw;
		}
	}

	@media (min-width: 1900px) {
		.text {
			padding-top: 17vh;
		}
		.bg_letter {
			width: 26vw;
			.second {
				width: 36vw;
				left: -10vw;
			}
		}
	}
	@media (max-width: 1220px) {
		.collage .first {
			height: 21vw;
		}
		.bg_letter {
			width: 25vw;
		}
	}
	@media (max-width: 1084px) {
		.collage .second {
			left: 12vw;
		}
		.bg_letter {
			width: 28vw;
		}
	}
	@media (max-width: 900px) {
		.collage {
			display: none;
		}
		.text {
			width: 100%;
			left: 0;
			padding-left: 2rem;
			.title span {
				font-size: 11vw;
			}
			button {
				align-self: flex-end;
				margin: 14vw 10vw;
				text-transform: initial;
			}
		}
		.bg_letter {
			width: 40vw;
			&.second {
				width: 60vw;
				left: -20vw;
			}
		}
	}
	@media (max-width: 600px) {
		.text {
			width: 100%;
			left: 0;
			padding-top: 20vh;
			.title {
				span {
					font-size: 3rem;
				}
			}
			.text_slider {
				margin-top: 2rem;
			}
			button {
				align-self: flex-end;
				margin: 20% 10%;
				text-transform: initial;
			}
		}
		.bg_letter {
			width: 65%;
			top: 8%;
			&.second {
				width: 90%;
				left: -30vw;
			}
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
	}
}
@media (max-width: 900px) {
	.intro {
		height: calc(100vh - 60px);
	}
}
</style>
