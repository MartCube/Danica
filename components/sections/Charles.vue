<template>
	<section class="charles" v-observe-visibility="this.visibilityOptions">
		<div class="content">
			<div class="title">
				<h2><span>the details</span> are not the the details they make <span>the design</span>.</h2>
				<h4>- charles eames</h4>
				<ButtonItem :animated="false">Write us </ButtonItem>
			</div>
			<div class="collage">
				<ImageItem :src="data.primary.top.url" class="top" alt="charles eames" ref="charlesTop" />
				<ImageItem :src="data.primary.bottom.url" class="bottom" alt="charles eames" ref="charlesBottom"/>
			</div>
		</div>
	</section>
</template>

<script>
import { charles } from '~/assets/anime'
export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	computed: {
		visibilityOptions() {
			return {
				callback: this.visibilityChanged,
				once: true,
				intersection: {
					threshold: 1,
				},
			}
		},
	},
	methods: {
		visibilityChanged(isVisible) {
			console.log(isVisible, this.$refs.charlesTop, this.$refs.charlesBottom);
			if (isVisible) {
				charles()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	margin-left: 240px;
	display: flex;
	.title {
		max-width: 100%;
		display: flex;
		flex-direction: column;
		user-select: none;
		h2 {
			max-width: 700px;
			line-height: 4rem;
			font-size: 2rem;
			span {
				text-transform: capitalize;
				font-size: inherit;
				font-weight: inherit;
				color: $primary;
			}
		}
		h4 {
			align-self: flex-end;
			margin-right: 2rem;

			text-transform: capitalize;
			line-height: 4rem;
		}
	}
	.collage {
		width: 60%;
		min-width: 500px;
		padding-left: 10px;
		position: relative;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		overflow: hidden;
		min-height: 540px;
		.top {
			width: 500px;
			height: auto;
			opacity: 0;
			transform: translateY(-50%);
			position: absolute;
		}
		.bottom {
			width: 220px;
			height: 105px;
			position: absolute;
			left: 168px;
			bottom: 0;
			opacity: 0;
			transform: translateY(-30%);
		}
	}
}

@media (max-width: 1100px) {
	.content{
		flex-direction: column;
		align-items:center;
		.collage{
			width: 100%;
			align-items:center;
			.bottom{
				left: 50%;
				margin-left: -92px;
			}
		}
		.title{
			margin-bottom: 0;
		}
	}
}
@media (max-width: 900px) {
	section {
		.content {
			margin: 0;
			padding-top: 40px;
			align-items: flex-start;
			position: relative;
			.title {
				margin: 0;
				min-height: 500px;
				h2 {
					font-size: 1.2rem;
					line-height: 2.4rem;
				}
				h4 {
					margin: 0 0 0 10%	;
					flex:1;
					align-self: flex-start;
				}
				button {
				}
			}
			.collage {
				bottom: 0;
				width: 100%;
				min-height: 415px;
				position: absolute;
				.top {
					width: 350px;
					height: auto;
				}
				.bottom {
					width: 170px;
					height: auto;
					left: 50%;
					margin-left: -74px;
				}
			}
		}
	}
}
@media (max-width: 540px) {
	section {
		.content {
			margin: 0;
			padding-top: 40px;
			align-items: flex-start;
			position: relative;
			.title {
				margin: 0;
				min-height: 580px;
				h2 {
					font-size: 1.2rem;
					line-height: 2.4rem;
				}
				h4 {
					margin: 0 0 0 10%	;
					flex:1;
					align-self: flex-start;
				}
				button {
				}
			}
			.collage {
				bottom: 80px;
				width: 100%;
				min-width: 320px;
				min-height: 415px;
				position: absolute;
				.top {
					width: 350px;
					height: auto;
				}
				.bottom {
					width: 170px;
					height: auto;
					left: 50%;
					margin-left: -74px;
				}
			}
		}
	}
}
@media (max-width: 440px) {
	section {
		.content {
			margin: 0;
			padding-top: 40px;
			align-items: flex-start;
			position: relative;
			.title {
				margin: 0;
				min-height: 560px;
				h2 {
					font-size: 1.2rem;
					line-height: 2.4rem;
				}
				h4 {
					margin: 0 0 0 10%	;
					flex:1;
					align-self: flex-start;
				}
				button {
				}
			}
			.collage {
				bottom: 90px;
				width: 100%;
				min-height: 300px;
				position: absolute;
				align-items: flex-start;
				padding-left: 50px;
				.top {
					width: 250px;
					height: auto;
				}
				.bottom {
					width: 120px;
					height: auto;
					left: 50%;
					margin-left: -65px;
				}
			}
		}
	}
}
</style>
