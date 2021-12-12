<template>
	<n-link v-if="first" :to="link" class="highlight_card first">
		<div class="image">
			<ImageItem :src="image.url" :alt="title" :width="image.dimensions.width" :height="image.dimensions.height" />
		</div>
		<div class="content">
			<div class="text">
				<h3>{{ title }}</h3>
				<!-- Slice Machine -->
				<div v-for="(slice, i) in data.data.body" :key="i" class="text_slice">
					<p v-if="slice.slice_type == 'text' && i <= 2">{{ $prismic.asText(slice.primary.text) }}</p>
				</div>
			</div>
			<div class="info">
				<div class="service">
					<h3>service</h3>
					<prismic-rich-text class="rich_text" :field="service_data.name" />
				</div>
				<div class="square">
					<h3>square</h3>
					<p>{{ service_data.square }}</p>
				</div>
				<div class="link1">
					<Icon fill="hsl(0, 0%, 10%)" name="chevron" size="32px" />
				</div>
			</div>
		</div>
	</n-link>
	<n-link v-else :to="link" class="highlight_card" :class="{ last: last }">
		<div class="image">
			<ImageItem :width="image.dimensions.width" :height="image.dimensions.height" :src="image.url" :alt="title" />
		</div>
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
	data: () => ({
		service_data: {
			name: '',
			square: '',
		},
	}),
	computed: {
		first_imgIX() {
			return `&fit=crop&w=600&h=500&dpr=1`
		},
		Thumbnail_imgIX() {
			return `&fit=crop&w=300&h=400&dpr=1`
		},
		image() {
			return this.data.data.main_image
		},
		title() {
			return this.$prismic.asText(this.data.data.title)
		},
		link() {
			return this.localePath(this.$prismic.linkResolver(this.data))
		},
	},
	created() {
		if (this.first) {
			// console.log('first')
			this.serviceData()
		}
	},
	methods: {
		serviceData() {
			const project = this.data.data.body.filter((section) => {
				if (section.slice_type === 'project_info') {
					// return section
				}
				return section
			})
			this.serviceSquare(project)
			this.serviceName(project)
		},
		serviceName(project) {
			this.service_data.name = project[0].primary.service
		},
		serviceSquare(project) {
			this.service_data.square = project[0].primary.square
		},
	},
}
</script>

<style lang="scss" scoped>
$transition: all 0.35s ease;

.highlight_card {
	width: 49.5%;
	margin-bottom: 10px;

	display: flex;
	flex-direction: column;
	position: relative;

	cursor: pointer;

	&.first {
		width: 100%;
		margin-right: 0;

		display: flex;
		flex-direction: row;

		position: relative;
		.image {
			flex-basis: 50%;
		}
		.content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			position: relative;
			flex-basis: 51%;
		}

		.info {
			width: 100%;
			padding-left: 40px;
			background: white;
			position: absolute;
			bottom: 10px;
			right: 0;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			.service {
				max-width: 50%;
			}
			.square {
				width: 30%;
			}
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
	}
	.image {
		width: 100%;
		height: 100%;
	}
	picture {
		z-index: 0;
		object-fit: cover;
		width: 100%;
		height: 100%;
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
	.text {
		overflow: hidden;
		height: 50%;
	}

	&:hover {
		.link {
			opacity: 1;
		}
	}
}

@media (max-width: 1500px) {
	.highlight_card {
		.text_slice {
			display: none;
		}
	}
}
@media (max-width: 1200px) {
	.highlight_card {
		&.first {
			.info {
				.square ,
				.service {
					h3 {
						font-size: 1.6rem;
						line-height: 1.3;
						margin-bottom: 10px;
					}
					margin-right: 20px;
				}
			}
		}
	}
}
</style>
