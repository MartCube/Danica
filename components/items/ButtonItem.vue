<template>
	<button :class="{ animated: animated }">
		<div ref="buttonText" class="text" :class="{ white: white }">
			<slot />
		</div>

		<div v-if="animated" ref="buttonOverlay" class="overlay"></div>
	</button>
</template>

<script>
import { buttonAnim } from '~/assets/anime'

export default {
	props: {
		animated: {
			type: Boolean,
			default: true,
		},
		white: {
			type: Boolean,
			default: false,
		},
	},
	mounted() {
		if (this.animated) buttonAnim(this.$refs.buttonText, this.$refs.buttonOverlay)
	},
}
</script>

<style lang="scss" scoped>
button {
	width: max-content;
	padding: 15px 30px;
	border: none;
	background: $primary;
	color: $black;

	cursor: pointer;
	z-index: 1;
	overflow: hidden;
	position: relative;

	.text {
		font-weight: 700;
		font-size: 1.5rem;

		transition: all 0.2s ease;
		svg {
			fill: $black;
			margin-left: 15px;

			transition: all 0.2s ease;
		}
		&.white {
			color: $white;
			svg {
				fill: $white;
			}
		}
	}

	transition: all 0.2s ease;

	&.animated {
		background: transparent;
		.text {
			opacity: 0; // opacity: 1
			display: flex;
			align-items: center;
		}
		.overlay {
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: -1;

			width: 5%;
			height: 0; // height: 100%;
			background-color: $primary;
			transition: all 0.2s ease;
		}
	}

	&:hover {
		color: $black;
		.overlay {
			width: 100%;
		}
		svg {
			opacity: 1;
			fill: $black;
		}
		.text.white {
			color: $black;
			svg {
				fill: $black;
			}
		}
	}
}

// @media (max-width: 900px) {
// 	button.animated {
// 		background: $primary;

// 		.text {
// 			opacity: 1;
// 			color: $black;
// 		}
// 		svg {
// 			fill: $black;
// 		}
// 		.overlay {
// 			width: 100%;
// 		}
// 	}
// }
@media (max-width: 360px) {
	button.text {
		font-size: 1.5rem;
	}
}
</style>
