<template>
	<section class="quote">
		<div class="content">
			<blockquote>{{ data.primary.quote }}</blockquote>
			<h4>{{ data.primary.name }}</h4>
			<span class="description">{{ data.primary.descrition }}</span>
		</div>
		<div class="image">
			<ImageItem :src="data.primary.image.url" :mobile="data.primary.image.mobile.url" :retina="data.primary.image.retina.url" :width="data.primary.image.dimensions.width" :height="data.primary.image.dimensions.height" :alt="data.primary.image.alt" />
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
		// white: {
		// 	type: Boolean,
		// 	default: true,
		// },
	},
	computed: {
		image() {
			return this.data
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
.quote {
	display: flex;
	padding-left: 255px;
	margin-bottom: 4rem;
	.image {
		width: 52%;
		// padding-right: 130px;
		min-height: 30rem;
		picture {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			// display: block;
		}
	}
	.content {
		width: 48%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
		padding: 2rem;
		box-sizing: border-box;
		blockquote {
			display: flex;
			flex-grow: 1;
			width: 100%;
			justify-content: center;
			align-items: center;
			font-size: 2rem;
			font-weight: 700;
			padding-right: 10%;
			text-align: end;
		}
		h4 {
			font-size: 1.5rem;
		}
		span {
			color: $grey;
		}
	}
}
// @media (min-width: 1700px) {
// 	.intro {
// 		.content {
// 			.maintitle span {
// 				font-size: 8rem;
// 				line-height: normal;
// 			}
// 			.subtitle span {
// 				font-size: 5rem;
// 				line-height: normal;
// 			}
// 		}
// 	}
// }
@media (max-width: 1300px) {
}
@media (max-width: 1100px) {
}
@media (max-width: 900px) {
	.quote {
		padding-left: 40px;
		flex-wrap: wrap;
		margin-bottom: 0;
		.image {
			width: 100%;
			order: 1;
			min-height: initial;
		}
		.content {
			width: 100%;
			order: 2;
			blockquote {
				font-size: 1.5rem;
				padding-right: 10%;
				margin-bottom: 4rem;
			}
		}
	}
}
@media (max-width: 500px) {
}
</style>
