<template>
	<section class="charles">
		<div class="title">
			<h2><span>the details</span> are not the the details</h2>
			<h2>they make <span>the design</span>.</h2>
			<h4>- charles eames</h4>
			<ButtonItem :animated="false">Write us </ButtonItem>
		</div>
		<div class="collage">
			<ImageItem :src="data.charles_top.url" class="top" alt="charles eames" />
			<ImageItem :src="data.charles_bottom.url" class="bottom" alt="charles eames" />
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
	},
	computed: {},
}
</script>

<style lang="scss" scoped>
.charles {
	display: flex;
	.title {
		max-width: 100%;
		display: flex;
		flex-direction: column;
		user-select: none;
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
			margin-right: 2rem;

			text-transform: capitalize;
			line-height: 4rem;
		}
	}
	.collage {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.top {
			width: 300px;
			height: 300px;
		}
		.bottom {
			width: 150px;
			height: 75px;
		}
	}
}
</style>
