<template>
	<section>
		<div class="name">
			<span> {{ name }} </span>
		</div>
		<div class="content">
			<div class="text">
				<h2 class="title">{{ title }}</h2>
				<template v-if="data.primary.description">
					<prismic-rich-text class="rich_text" :field="data.primary.description" />
				</template>
			</div>
			<div class="image">
				<ImageItem :src="image.url" :mobile="image.mobile.url" :alt="image.alt" />
				<div class="play" @click="openModal">
					<IconPlay />
				</div>
			</div>
			<ModalVideo :video="data.primary.video" />
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
		description() {
			return this.$prismic.asText(this.data.primary.description)
		},
		image() {
			return this.data.primary.image
		},
	},
	methods: {
		openModal() {
			this.$store.dispatch('bindModalVideo', true)
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	.text {
		min-width: 500px;
		max-width: 40%;
		.rich_text {
			padding-left: 1rem;
		}
		.description {
			max-width: 500px;
			padding-left: 1rem;
		}
	}
	.image {
		margin-left: 40px;
		position: relative;
		width: 100%;
		.play {
			padding: 24px;
			background: $primary;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			cursor: pointer;

			svg {
				fill: $white;
			}
		}
	}
}

@media (max-width: 900px) {
	section {
		.content {
			flex-direction: column;
			.text {
				min-width: auto;
				margin-bottom: 40px;
				max-width: 100%;
				.title {
					margin-bottom: 40px;
				}
			}
			.image {
				margin: 0;
			}
		}
	}
}
</style>
