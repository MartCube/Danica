<template>
	<section class="intro">
		<img class="bg_letter" src="../../static/d_letter.svg" alt="">
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
			return 'We are'.split('')
		},
		lettersLeadersIn() {
			return 'leaders in'.split('')
		},
		first_imgIX() {
			return this.data[0].intro_image.url + `&fit=crop&w=300&h=300&dpr=1`
		},
		second_imgIX() {
			return this.data[1].intro_image.url + `&fit=crop&w=800&h=1000&dpr=1`
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
	width: 100%;
	height: calc(100vh - 80px);

	display: flex;
	justify-content: flex-end;

	position: relative;
	// overflow: hidden;

	.bg_letter{
		position: absolute;
    left: -240px;
    top: 9%;
		width: 23vw;
		z-index: 0;
	}

	.text {
		width: min-content;
		padding-top: 10vh;

		position: absolute;
		top: 0;
		left: -70px;

		display: flex;
		flex-direction: column;

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
				font-size: 4rem;
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
			border: 0 solid transparent; // border: 10px solid white
			// opacity: 0; // opacity: 1
			width: 0;
			position: absolute;
			object-fit: cover;
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
			// width: 500px;
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
}
</style>
