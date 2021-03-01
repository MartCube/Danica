<template>
	<button :class="{ animated: animated, white: white }">
		<slot> slot </slot>
	</button>
</template>

<script>
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
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

button {
	width: max-content;
	padding: 15px 30px;
	border: none;
	background: $primary;
	color: $black;
	cursor: pointer;
	z-index: 1;

	text-transform: capitalize;
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 1.5rem;

	display: flex;
	align-items: center;
	position: relative;

	&.animated {
		background: transparent;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;

			width: 5%;
			height: 100%;
			background-color: $primary;
			transition: all 0.2s ease;
		}
	}
	&.white {
		color: $white;
		svg {
			fill: $white;
		}
	}

	svg {
		fill: $black;
		margin-left: 15px;
		transition: all 0.2s ease;
	}

	transition: all 0.2s ease;
	&:hover {
		color: $black;
		&::after {
			width: 100%;
		}
		svg {
			opacity: 1;
			fill: $black;
		}
	}
}
</style>
