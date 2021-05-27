<template>
	<section>
		<div class="name">
			<span>{{ name }}</span>
		</div>
		<div class="content">
			<h2 class="title">{{ title }}</h2>
			<template v-if="data.primary.stages_description">
				<prismic-rich-text class="rich_text" :field="data.primary.stages_description" />
			</template>
			<div class="list">
				<div v-for="(stage, i) in data.items" :key="i" class="stage">
					<h2 class="number" v-if="i < 9" >0{{ i + 1 }}<span>/</span></h2>
					<h2 class="number" v-else >{{ i + 1 }}<span>/</span></h2>
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
		description() {
			return this.data.primary.stages_description
		},
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
	.rich_text{
		padding: 0 1rem;
    display: block;
    margin-bottom: 60px;
	}
	.list {
		max-width: 1200px;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding-right: 1rem;
		.stage {
			width: 50%;
			margin-bottom: 40px;

			display: flex;

			.number {
				min-width: 120px;
				margin-right: 40px;
				text-align: right;
				font-size: 5rem;
				color: $primary;
				font-family: 'Numbers';
				span {
					display: none;
					font-weight: bold;
					font-size: inherit;
					font-weight: inherit;
					line-height: inherit;
				}
			}
			.info {
				width: calc( 100% - 120px);
				h3 {
					// word-spacing: 450px;
					line-height: 1.3;
					margin-top: 10px;
					margin-bottom: 20px;
					// text-transform: capitalize;
					&::first-letter{
						text-transform: capitalize;
					}
				}
			}
			.rich_text:not(empty){
				padding: 0 1rem;
				margin-bottom: 60px;
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
					width: 100%;
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
					.info {
						h3 {
							margin-top: 0;
							font-size: 1.4rem;
							word-spacing: initial;
						}
						p{
							padding-right: 1.5rem;
						}
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
					.info {
						h3 {
							font-size: 1.3rem;
						}
					}
				}
			}
		}
	}
}
@media (max-width: 400px) {
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
