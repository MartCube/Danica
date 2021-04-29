<template>
	<section>
		<div class="name">
			<span>{{ name }}</span>
		</div>
		<div class="content">
			<h2 class="title">{{ title }}</h2>
			<div class="list">
				<div v-for="(stage, i) in data.items" :key="i" class="stage">
					<h2 class="number">0{{ i + 1 }}<span>/</span></h2>
					<div class="info">
						<h3>{{ $prismic.asText(stage.stage_title) }}</h3>
						<p>{{ $prismic.asText(stage.stage_description) }}</p>
					</div>
				</div>
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
	computed: {
		name() {
			return this.$prismic.asText(this.data.primary.name)
		},
		title() {
			return this.$prismic.asText(this.data.primary.title)
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	.list {
		max-width: 1200px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.stage {
			max-width: 50%;
			margin-bottom: 40px;

			display: flex;

			.number {
				min-width: 120px;
				margin-right: 40px;
				text-align: right;
				font-size: 4rem;
				color: $primary;
				span {
					display: none;
					font-size: inherit;
					font-weight: inherit;
					line-height: inherit;
				}
			}
			.info {
				h3 {
					word-spacing: 450px;
					margin-top: 10px;
					margin-bottom: 20px;
					text-transform: capitalize;
				}
			}
		}
	}
}

@media (max-width: 1050px) {
	section {
		.content {
			flex-direction: column;
			padding-right: 0;
			.list {
				width: 100%;
				.stage {
					// width: 100%;
					.number {
						min-width: 60px;
						margin-right: 20px;

						text-align: right;
						font-size: 1.5rem;
						color: $primary;
						span {
							display: initial;
						}
					}
					.info h3 {
						margin-top: 0;
					}
					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
	}
}
@media (max-width: 650px) {
	section {
		.content {
			.list {
				.stage {
					max-width: 100%;
				}
			}
		}
	}
}

@media (max-width: 360px) {
	section {
		.content {
			.list {
				.stage {
					.info {
						h3 {
							font-size: 1.2rem;
						}
						p {
							font-size: 1rem;
							line-height: 1.5rem;
						}
					}
				}
			}
		}
	}
}
</style>
