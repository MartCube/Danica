<template>
	<section class="intro">
		<div class="bg">
			<ImageItem :src="image.url" :mobile="image.mobile.url" :alt="image.alt" />
		</div>
		<div class="content" :class="{ white: white }">
			<div class="maintitle">
				<span v-for="(letter, i) in title" :key="i" ref="maintitle">{{ letter }}</span>
			</div>
			<div class="subtitle">
				<span v-for="(letter, i) in subtitle" :key="i" ref="subtitle">{{ letter }}</span>
			</div>
			<ButtonItem :white="white" @click.native="openModal"> Write us </ButtonItem>
			<div class="project">
				<span ref="project"> Project - {{ image.alt }} </span>
			</div>
		</div>
	</section>
</template>

<script>
import { serviceIntroAnim } from '~/assets/anime'

export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
		white: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		title() {
			return this.$prismic.asText(this.data.primary.title).split('')
		},
		subtitle() {
			return this.$prismic.asText(this.data.primary.subtitle).split('')
		},
		image() {
			return this.data.primary.image
		},
	},
	async mounted() {
		await this.$nextTick()
		serviceIntroAnim(this.$refs.maintitle, this.$refs.subtitle, this.$refs.project)
	},
	methods: {
		openModal() {
			this.$store.dispatch('bindModalContact', true)
		},
	},
}
</script>

<style lang="scss" scoped>
.intro {
	width: 100%;
	height: 100vh;

	display: flex;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	.bg {
		position: absolute;
		top: 0;
		width: 100%;
		height: inherit;
		picture {
			z-index: 2;
		}
	}

	.content {
		width: inherit;
		height: inherit;
		padding-left: 1rem;
		margin: 0 240px;
		position: relative;

		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;

		border-left: 1px solid $black;
		color: $black;
		z-index: 5;

		.maintitle {
			width: max-content;
			display: flex;
			align-items: center;
			overflow: hidden;

			span {
				font-size: 5rem;
				font-weight: bold;
				color: inherit;
				will-change: opacity;
				will-change: transform;
				opacity: 0;
			}
		}
		.subtitle {
			width: max-content;
			display: flex;
			align-items: center;
			overflow: hidden;
			span {
				font-size: 4rem;
				font-weight: bold;
				color: inherit;
				will-change: opacity;
				will-change: transform;
				opacity: 0;
			}
		}
		button {
			margin-top: 3rem;
		}
		.project {
			overflow: hidden;

			position: absolute;
			top: 30%;
			right: 0;
			cursor: pointer;

			span {
				width: 30px;
				display: flex;
				align-items: center;
				opacity: 0; // opacity: 1
				background-color: $primary;
				padding: 15px 0;
				writing-mode: vertical-rl;
				text-orientation: mixed;
				font-weight: 500;
				color: $black;
			}
		}

		&.white {
			border-left: 1px solid $white;
			color: $white;
		}
	}
}
@media (max-width: 1100px) {
	.intro {
		flex-direction: row;

		.content {
			width: 100%;
			margin: 0;
			padding-left: 40px;
			border: initial;

			.maintitle span {
				font-size: 2rem;
			}
			.subtitle span {
				font-size: 1.8rem;
			}
			button {
				margin-top: 2rem;
			}
			.project {
				top: 60px;
			}
			&.white {
				border: initial;
			}
		}
	}
}
</style>
