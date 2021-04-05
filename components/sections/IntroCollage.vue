<template>
	<section class="intro">
		<div class="text">
			<div class="title">
				<span v-for="(letter, i) in lettersWeAre" :key="i" ref="lettersWeAre">{{ letter }}</span>
			</div>
			<div class="title">
				<span v-for="(letter, i) in lettersLeadersIn" :key="i" ref="lettersLeadersIn">{{ letter }}</span>
			</div>
			<TextSlider />
			<ButtonItem @click.native="openModal"> write us </ButtonItem>
		</div>

		<div class="collage">
			<img ref="collage1" class="first" :src="first_imgIX" alt="danica" @load="Animate" />
			<img ref="collage2" class="second" :src="second_imgIX" alt="danica" @load="Animate" />
			<img ref="collage3" class="third" :src="third_imgIX" alt="danica" @load="Animate" />
		</div>
	</section>
</template>

<script>
import { introAnim } from '~/assets/anime'

export default {
	props: {
		data: {
			type: Array,
			required: true,
		},
	},
	data: () => ({
		imagesLoaded: 0,
	}),
	computed: {
		lettersWeAre() {
			return 'We Are'.split('')
		},
		lettersLeadersIn() {
			return 'Leaders In'.split('')
		},
		first_imgIX() {
			return this.data[0].intro_image.url + `&fit=crop&w=300&h=300&dpr=1`
		},
		second_imgIX() {
			return this.data[1].intro_image.url + `&fit=crop&w=500&h=500&dpr=1`
		},
		third_imgIX() {
			return this.data[2].intro_image.url + `&fit=crop&w=400&h=400&dpr=1`
		},
	},
	methods: {
		openModal() {
			this.$store.dispatch('bindModalContact', true)
		},
		Animate() {
			this.imagesLoaded++
			if (this.imagesLoaded === 3) {
				introAnim(this.$refs.lettersWeAre, this.$refs.lettersLeadersIn, this.$refs.collage1, this.$refs.collage2, this.$refs.collage3)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.intro {
	margin-left: 240px;
	height: calc(100vh - 80px);

	justify-content: flex-end;
	position: relative;
	overflow: hidden;

	.text {
		width: min-content;
		padding-top: 40px;

		position: absolute;
		top: 0;
		left: 0;

		display: flex;
		flex-direction: column;

		.title {
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

		button {
			margin: 2rem 0;
		}
	}

	.collage {
		width: 800px;
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
			bottom: 50px;
			right: 150px;
		}
		.third {
			z-index: 1;
			bottom: 100px;
			right: 0;
		}
	}
}

@media (max-width: 900px) {
	.intro {
		margin: 0;
		padding-left: 40px;
		height: calc(100vh - 60px);

		.text {
			height: inherit;
			left: initial;
			.title span {
				font-size: 2rem;
			}
			button {
				margin-top: auto;
				margin-bottom: 80px;
			}
		}
		.collage {
			display: none;
		}
	}
}
</style>
