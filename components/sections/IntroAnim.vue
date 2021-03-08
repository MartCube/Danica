<template>
	<div class="intro">
		<template v-if="!$fetchState.pending">
			<div class="text">
				<div>
					<span v-for="(letter, i) in lettersWeAre" :key="i" ref="lettersWeAre">{{ letter }}</span>
				</div>
				<div>
					<span v-for="(letter, i) in lettersLeadersIn" :key="i" ref="lettersLeadersIn">{{ letter }}</span>
				</div>
				<div class="textSlider">
					<span v-for="(letter, i) in lettersDesign" :key="i" ref="lettersDesign">{{ letter }}</span>
					<IconArrow size="50px" />
				</div>
				<ButtonItem> write us </ButtonItem>
			</div>

			<div class="collage">
				<img ref="collage1" class="first" :src="first_imgIX" alt="danica" @load="Animate" />
				<img ref="collage2" class="second" :src="second_imgIX" alt="danica" @load="Animate" />
				<img ref="collage3" class="third" :src="third_imgIX" alt="danica" @load="Animate" />
			</div>
		</template>
	</div>
</template>

<script>
import { introAnim } from '~/assets/anime'

export default {
	data: () => ({
		data: null,
		imagesLoaded: 0,
	}),
	async fetch() {
		const intro = await this.$prismic.api.getSingle('intro')
		this.data = {
			intro_collage: intro.data.intro_collage,
		}
	},
	computed: {
		lettersWeAre() {
			return 'We Are'.split('')
		},
		lettersLeadersIn() {
			return 'Leaders In'.split('')
		},
		lettersDesign() {
			return 'Design'.split('')
		},
		first_imgIX() {
			return this.data.intro_collage[0].image.url + `&fit=crop&w=300&h=300&dpr=1`
		},
		second_imgIX() {
			return this.data.intro_collage[1].image.url + `&fit=crop&w=600&h=600&dpr=1`
		},
		third_imgIX() {
			return this.data.intro_collage[2].image.url + `&fit=crop&w=400&h=400&dpr=1`
		},
	},
	methods: {
		Animate() {
			this.imagesLoaded++
			if (this.imagesLoaded === 3) {
				introAnim(this.$refs.lettersWeAre, this.$refs.lettersLeadersIn, this.$refs.lettersDesign, this.$refs.collage1, this.$refs.collage2, this.$refs.collage3)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

.intro {
	margin-left: 240px;
	overflow: hidden;

	height: calc(100vh - 80px);
	display: flex;
	justify-content: space-between;

	.text {
		width: min-content;
		padding-top: 40px;

		display: flex;
		flex-direction: column;

		& > * {
			width: max-content;
			display: flex;
			align-items: center;
			overflow: hidden;
			span {
				opacity: 0; // opacity: 1

				text-transform: none;
				line-height: initial;
				font-weight: 400;
				font-size: 4rem;
			}
		}
		.textSlider {
			margin-top: 2rem;
			cursor: pointer;
			position: relative;

			svg {
				margin: 0 1rem;
				opacity: 0;
				transition: all 0.35s ease;
				transform: translateX(-20px);
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
				svg {
					opacity: 1;
					transform: translateX(0);
				}
			}
			span {
				font-weight: 700;
			}
		}
		button {
			margin: 2rem 0;
		}
	}
	.collage {
		width: 900px;
		position: relative;
		img {
			border: 0 solid transparent; // border: 10px solid white
			opacity: 0; // opacity: 1
			position: absolute;
		}
		.first {
			z-index: 3;
			bottom: 0;
			left: 0;
		}
		.second {
			z-index: 2;
			bottom: 0;
			left: 150px;
		}
		.third {
			z-index: 1;
			bottom: 100px;
			right: 0;
		}
	}
}
</style>
