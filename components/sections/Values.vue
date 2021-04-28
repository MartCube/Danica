<template>
	<section>
		<div class="name">
			<span>values</span>
		</div>
		<div class="content">
			<div class="text">
				<h2 class="title">{{ title }}</h2>
				<p class="description">{{ description }}</p>
			</div>
			<div class="image">
				<ImageItem :src="image.url" :mobile="image.mobile.url" :alt="image.alt" />
				<div class="play" @click="openModal">
					<IconPlay />
				</div>
			</div>
			<ModalVideo />
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
		.description {
			max-width: 500px;
			padding-left: 1rem;
		}
	}
	.image {
		margin-left: 40px;
		position: relative;
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
