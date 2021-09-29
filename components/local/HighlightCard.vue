<template>
	<n-link v-if="first" :to="link" class="highlight_card first">
		<ImageItem :src="image + first_imgIX" :alt="title" :width="600" :height="500" />
		<div class="text">
			<h3>{{ title }}</h3>
			<!-- Slice Machine -->
			<div v-for="(slice, i) in data.data.body" :key="i" class="text_slice">
				<p v-if="slice.slice_type == 'text' && i <= 2">{{ $prismic.asText(slice.primary.text) }}</p>
			</div>
		</div>
		<div class="info">
			<div class="service">
				<h3>{{ service }}</h3>
				<p>service</p>
			</div>
			<div class="square">
				<h3>{{ square }}&#13217;</h3>
				<p>square</p>
			</div>
			<div class="link1">
				<Icon fill="hsl(0, 0%, 10%)" name="chevron" size="32px" />
			</div>
		</div>
	</n-link>
	<n-link v-else :to="link" class="highlight_card" :class="{ last: last }">
		<ImageItem :width="600" :height="500" :src="image + Thumbnail_imgIX" :alt="title" />
		<div class="link">
			<Icon fill="hsl(0, 0%, 10%)" name="chevron" size="32px" />
		</div>
		<div class="title">
			<h3>{{ title }}</h3>
		</div>
	</n-link>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
		first: {
			type: Boolean,
			default: false,
		},
		last: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		first_imgIX() {
			return `&fit=crop&w=600&h=500&dpr=1`
		},
		Thumbnail_imgIX() {
			return `&fit=crop&w=400&h=500&dpr=1`
		},
		image() {
			return this.data.data.main_image.url
		},
		title() {
			return this.$prismic.asText(this.data.data.title)
		},
		service() {
			return this.$prismic.asText(this.data.data.info[0].service)
		},
		square() {
			return this.$prismic.asText(this.data.data.info[0].square)
		},
		link() {
			return this.localePath(this.$prismic.linkResolver(this.data))
		},
	},
}
</script>

<style lang="scss" scoped>
$transition: all 0.35s ease;

.highlight_card {
	width: 35%;
	height: 500px;
	margin-bottom: 80px;
	margin-right: 5%;

	display: flex;
	flex-direction: column;
	position: relative;

	cursor: pointer;

	&.first {
		width: 100%;
		height: 560px;
		margin-right: 0;

		display: flex;
		flex-direction: row;

		position: relative;

		.info {
			width: max-content;
			height: 120px;
			padding-left: 40px;
			background: white;

			position: absolute;
			bottom: 0;
			right: 50%;
			transform: translateX(50%);

			display: flex;
			align-items: center;
			justify-content: center;
			.service,
			.square {
				margin-right: 40px;
				height: 100%;
				display: flex;
				flex-direction: column;
				h3 {
					margin-bottom: 20px;
					line-height: 60px;
					border-bottom: 2px solid $primary;
					&::first-letter {
						text-transform: uppercase;
					}
				}
				p::first-letter {
					text-transform: uppercase;
				}
			}
			.link1 {
				background: $primary;
				opacity: 1;
				width: 120px;
				height: 120px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.text {
			padding-left: 40px;
			width: 100%;
			display: flex;
			flex-direction: column;

			h3 {
				margin-bottom: 40px;
				text-transform: capitalize;
			}
			.text_slice p {
				margin-bottom: 20px;
				font-size: 1.2rem;
				line-height: 1.5rem;
				max-height: 172px;
				overflow: hidden;
			}
		}
		img {
			width: 600px;
			height: 500px;
		}
	}
	picture {
		z-index: 0;
	}
	&.last {
		width: auto;
		flex: 1;
		margin-right: 0;
		.title {
			width: 100%;
			height: 100%;
			max-width: 100%;
		}
		.link {
			opacity: 1;
		}
	}

	.title {
		position: absolute;
		top: 0;
		left: 0;
		padding: 25px;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(10px);
		color: $white;
		font-size: 1.5rem;
		h3::first-letter {
			text-transform: uppercase;
		}
	}
	.link {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 80px;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;

		z-index: 2;
		background: $primary;
		cursor: pointer;

		opacity: 0; //opacity:1
		transition: $transition;
	}
	&:nth-child(even) {
		margin-left: 150px;
	}

	&:hover {
		.link {
			opacity: 1;
		}
	}
}
// @media (min-width: 1700px) {
// 	.highlight_card{
// 		&.first .info {
// 			height: 150px;
// 			margin-bottom: -1px;
// 			.service, .square{
// 				padding-top: 10px;
// 			}
// 			.link1{
// 				width: 150px;
// 				height: inherit;
// 			}
// 		}
// 	}
// }
@media (max-width: 1200px) {
	.highlight_card {
		width: 30%;
		height: 25%;
	}
}
</style>
