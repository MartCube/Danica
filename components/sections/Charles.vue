<template>
	<section>
		<div class="content">
			<div class="title">
				<h2><span>the details</span> are not the the details they make <span>the design</span>.</h2>
				<h4>- charles eames</h4>
				<ButtonItem :animated="false">Write us </ButtonItem>
			</div>
			<div class="collage">
				<ImageItem :src="data.charles_top.url" class="top" alt="charles eames" />
				<ImageItem :src="data.charles_bottom.url" class="bottom" alt="charles eames" />
			</div>
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
.content {
	// margin-left: 240px;
	padding: 0 1rem;

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

@media (max-width: 900px) {
	section {
		.content {
			margin: 0;
			flex-direction: column-reverse;
			.title {
				margin: 0;
				h2 {
					font-size: 1.2rem;
					line-height: 2.4rem;
				}
				h4 {
					margin: 0;
				}
				button {
					align-self: flex-end;
				}
			}
			.collage {
				margin-bottom: 20px;
				.top {
					width: 200px;
					height: 200px;
				}
				.bottom {
					width: 100px;
					height: 50px;
				}
			}
		}
	}
}
</style>
