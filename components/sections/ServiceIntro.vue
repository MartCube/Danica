<template>
	<section class="intro">
		<div class="bg">
			<ImageItem :src="image.url" :mobile="image.mobile.url" :alt="image.alt" />
		</div>
		<div class="content" :class="{ white: white }">
			<h1 class="main-title">{{ title }}</h1>
			<h3 class="sub-title">{{ subtitle }}</h3>
			<ButtonItem :white="white"> Write us </ButtonItem>

			<span class="project"> Project - {{ image.alt }} </span>
		</div>
	</section>
</template>

<script>
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
			return this.$prismic.asText(this.data.primary.title)
		},
		subtitle() {
			return this.$prismic.asText(this.data.primary.subtitle)
		},
		image() {
			return this.data.primary.image
		},
	},
}
</script>

<style lang="scss" scoped>
.intro {
	margin-left: 0;
	width: 100%;
	height: 100vh;

	display: flex;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	.bg {
		position: absolute;
		top: 0;
		left: -240px;
		width: 100vw;
		height: inherit;
	}

	.content {
		width: inherit;
		height: inherit;
		padding-left: 1rem;
		margin-right: 240px;
		position: relative;

		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;

		border-left: 1px solid $black;
		border-right: 1px solid $black;
		color: $black;
		z-index: 5;

		.main-title {
			font-size: 5rem;
			color: inherit;
			text-transform: capitalize;
		}
		.sub-title {
			font-size: 4rem;
			color: inherit;
			text-transform: capitalize;
		}
		button {
			margin-top: 3rem;
		}
		.project {
			position: absolute;
			top: 30%;
			right: 0;
			background-color: $primary;
			padding: 15px 2px;

			writing-mode: vertical-rl;
			text-orientation: mixed;
			font-weight: 500;
			color: $black;
		}

		&.white {
			border-left: 1px solid $white;
			border-right: 1px solid $white;

			color: $white;
		}
	}
}
@media (max-width: 900px) {
	.intro {
		flex-direction: row;
		.bg {
			left: -10vw;
		}
		.content {
			width: 100%;
			margin: 0;
			border-right: initial;

			.main-title {
				font-size: 2.5rem;
			}
			.sub-title {
				font-size: 2rem;
			}
			.project {
				top: initial;
				bottom: 0;
			}
			&.white {
				border-right: initial;
			}
		}
	}
}

@media (max-width: 600px) {
	.intro {
		.content {
			.text {
				align-items: flex-end;
				justify-content: flex-end;
				padding-bottom: 10vh;
				padding-left: 0;
				.main-title {
					font-size: 2rem;
				}
				.sub-title {
					font-size: 1.5rem;
				}
			}
			.project-description {
				.project,
				.author {
					padding-top: 60px;
				}
			}
			button {
				margin-right: -63px;
			}
		}
	}
}
@media (max-width: 400px) {
	.intro {
		.content {
			.text {
				.main-title {
					font-size: 1.8rem;
				}
				.sub-title {
					font-size: 1.5rem;
				}
			}
		}
	}
}
</style>
