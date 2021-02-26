<template>
	<div class="container">
		<template v-if="$fetchState.error">error</template>
		<template v-else-if="$fetchState.pending">loading</template>
		<template v-else>
			<div class="intro">
				<div class="text">
					<h4>
						<span v-for="letter in lettersWeAre" :key="letter" ref="lettersWeAre">{{ letter }}</span>
					</h4>
					<h4>
						<span v-for="letter in lettersLeadersIn" :key="letter" ref="lettersLeadersIn">{{ letter }}</span>
					</h4>
					<h4 class="textSlider">
						<span v-for="letter in lettersDesign" :key="letter" ref="lettersDesign">{{ letter }}</span>
					</h4>
				</div>

				<div class="collage">
					<img ref="collage1" class="first" :src="first_imgIX" alt="danica" @load="Animate" />
					<img ref="collage2" class="second" :src="second_imgIX" alt="danica" @load="Animate" />
					<img ref="collage3" class="third" :src="third_imgIX" alt="danica" @load="Animate" />
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { introAnim } from '~/assets/anime'

export default {
	data: () => ({
		data: Object,
		imagesLoaded: 0,
	}),
	async fetch() {
		const index = await this.$prismic.api.getSingle('index')
		this.data = {
			intro_collage: index.data.intro_collage,
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
	mounted() {
		// this.$refs.letters.innerHTML = this.$refs.letters.textContent.replace(/\S/g, "<span ref='letter'>$&</span>")
	},
	methods: {
		Animate() {
			this.imagesLoaded++
			if (this.imagesLoaded === 3) {
				console.log(this.$refs.text)
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
	padding-top: 80px;
	overflow: hidden;

	height: calc(100vh - 80px);
	display: flex;
	justify-content: space-between;

	.text {
		width: min-content;

		display: flex;
		flex-direction: column;

		h4 {
			text-transform: capitalize;
			font-weight: 400;
			font-size: 4rem;
			white-space: nowrap;

			width: max-content;
			display: flex;
			overflow: hidden;
			span {
				opacity: 0; // anime opacity: 1

				text-transform: none;
				line-height: initial;
				font-weight: 400;
				font-size: 4rem;
			}
			&.textSlider {
				margin-top: 4rem;
				cursor: pointer;
				position: relative;
				&::after {
					content: '';
					position: absolute;
					width: 0;
					height: 100%;
					left: 0;
					background: $primary;
					z-index: -1;
					transition: all 0.25s ease;
				}
				&:hover {
					&::after {
						width: 100%;
					}
				}
				span {
					font-weight: 700;
				}
			}
		}
	}
	.collage {
		width: 900px;
		position: relative;
		img {
			border: 10px solid white;
		}
		.first {
			position: absolute;
			z-index: 3;
			bottom: 0;
			left: 0;
			opacity: 0; // anime opacity: 1
		}
		.second {
			position: absolute;
			z-index: 2;
			bottom: 0;
			left: 150px;
			opacity: 0; // anime opacity: 1
		}
		.third {
			position: absolute;
			z-index: 1;
			bottom: 100px;
			right: 0;
			opacity: 0; // anime opacity: 1
		}
	}
}
</style>
