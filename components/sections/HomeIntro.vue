<template>
	<section class="intro">
		<span class="bg_letter first">{{ designWord[0] }}</span>
		<span class="bg_letter second">{{ architectureWord[0] }}</span>
		<div class="text">
			<div class="title">
				<span v-for="(letter, i) in first_title" :key="i" ref="lettersWeAre">{{ letter }}</span>
			</div>
			<div class="title">
				<span v-for="(letter, i) in second_title" :key="i" ref="lettersLeadersIn">{{ letter }}</span>
			</div>
			<!-- eslint-disable-next-line vue/attribute-hyphenation -->
			<TextSlider :lettersDesign="designWord" :lettersArchitecture="architectureWord" />
			<ButtonItem @click.native="openModal"> {{ data.primary.button }} </ButtonItem>
		</div>

		<MediaQueryProvider :queries="{ mobile: '(min-width: 900px)' }" ssr>
			<MatchMedia v-slot="{ mobile }">
				<div v-if="mobile" class="collage">
					<div class="first design">
						<img :src="data.items[0].collage_image1.url" loading="lazy" class="lazyload" alt="danica" @load="loadImage" />
					</div>
					<div class="second design">
						<img :src="data.items[0].collage_image3.url" loading="lazy" class="lazyload" alt="danica" @load="loadImage" />
					</div>
					<div class="third design">
						<img :src="data.items[0].collage_image2.url" loading="lazy" class="lazyload" alt="danica" @load="loadImage" />
					</div>
					<div class="first architecture">
						<img :src="data.items[1].collage_image1.url" loading="lazy" class="lazyload" alt="danica" @load="loadImage" />
					</div>
					<div class="second architecture">
						<img :src="data.items[1].collage_image2.url" loading="lazy" class="lazyload" alt="danica" @load="loadImage" />
					</div>
					<div class="third architecture">
						<img :src="data.items[1].collage_image3.url" loading="lazy" class="lazyload" alt="danica" @load="loadImage" />
					</div>
				</div>
			</MatchMedia>
		</MediaQueryProvider>
	</section>
</template>

<script>
import { MediaQueryProvider, MatchMedia } from 'vue-component-media-queries'
import { HomeIntroAnim, HomeIntroMobile } from '~/assets/anime'

export default {
	components: { MediaQueryProvider, MatchMedia },
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
	async mounted() {
		await this.$nextTick()
		if (window.innerWidth < 900) HomeIntroMobile(this.$refs.lettersWeAre, this.$refs.lettersLeadersIn)
	},
	methods: {
		openModal() {
			this.$store.dispatch('bindModalContact', true)
		},
		loadImage() {
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
	background-color: hsl(0, 0%, 100%);
	overflow: hidden;
	padding-top: 0;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(8, 10vh);

	.bg_letter {
		grid-column: 1 / 4;
		grid-row: 1 / 5;
		display: grid;
		opacity: 0;
		z-index: 6;
		font-size: 30rem;
		font-family: 'Home';
		font-weight: bold;
		color: hsl(0, 0%, 98%);
		filter: drop-shadow(10px 10px 10px hsl(0, 0%, 90%)) drop-shadow(0px 0px 1px hsl(0, 0%, 98%));
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

		button {
			margin: 2rem 0;
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
		}
		div {
			overflow: hidden;
			width: 0;
			position: absolute;
			border: 10px solid white;
			opacity: 0;
		}
		.first {
			&.design {
				z-index: 4;
			}
			z-index: 3;
			height: 16vw;
			bottom: 0;
			left: 0;
		}
		.second {
			z-index: 2;
			&.design {
				z-index: 6;
			}
			bottom: 0;
			height: 90vh;
			left: 12vw;
		}
		.third {
			z-index: 1;
			&.design {
				z-index: 5;
			}
			bottom: 100px;
			height: 30vw;
			bottom: 10vh;
			left: 32vw;
		}
	}

	@media (max-width: 1220px) {
		.collage .first {
			height: 21vw;
		}
	}
	@media (max-width: 1084px) {
		.collage .second {
			left: 12vw;
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
