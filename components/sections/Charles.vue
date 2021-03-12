<template>
	<div class="charles">
		<div class="title">
			<h2><span>the details</span> are not the the details</h2>
			<h2>they make <span>the design</span>.</h2>
			<h4>charles eames</h4>
		</div>
		<div class="collage">
			<ImageItem :src="data.charles_top.url" class="top" alt="charles eames" />
			<ImageItem :src="data.charles_bottom.url" class="bottom" alt="charles eames" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	computed: {
		title() {
			return this.$prismic.asText(this.data.quote)
		},
	},
}
</script>

<style lang="scss" scoped>
.charles {
	margin: 80px 0;
	margin-left: 240px;

	display: flex;
	.title {
		display: flex;
		flex-direction: column;
		h2 {
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
			text-transform: capitalize;
		}
	}
	.collage {
		display: flex;
		flex-direction: column;
		.top {
			width: 300px;
		}
		.bottom {
			width: 200px;
			height: 100px;
		}
	}
}
</style>
