<template>
	<button>
		<slot> slot </slot>
	</button>
</template>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

button {
	width: max-content;
	padding: 10px 30px;

	border: none;
	background: transparent;
	color: white;
	cursor: pointer;

	text-transform: capitalize;
	font-weight: 700;
	font-size: 1.2rem;
	line-height: 1.2rem;

	display: flex;
	align-items: center;
	svg {
		fill: white;
		margin-left: 0.5rem;
		transition: all 0.2s ease;
	}

	position: relative;
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;

		width: 10%;
		height: 100%;
		z-index: -1;
		background-color: $primary;
		transition: all 0.2s ease;
	}

	transition: all 0.2s ease;
	&:hover {
		color: $black;
		&::after {
			width: 100%;
		}
		svg {
			fill: $black;
		}
	}
}
</style>
