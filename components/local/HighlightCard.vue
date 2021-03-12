<template>
	<n-link v-if="first" :to="link" class="highlight_card first">
		<ImageItem :src="image + first_imgIX" :alt="title" />
		<div class="text">
			<h2>{{ title }}</h2>
			<!-- Slice Machine -->
			<div v-for="(slice, i) in data.data.body" :key="i" class="text_slice">
				<p v-if="slice.slice_type == 'text'">{{ $prismic.asText(slice.primary.text) }}</p>
			</div>
		</div>
		<div class="info">
			<div class="service">
				<h2>{{ service }}</h2>
				<p>service</p>
			</div>
			<div class="square">
				<h2>{{ square }}&#13217;</h2>
				<p>square</p>
			</div>
			<div class="link1">
				<IconChevron size="35px" />
			</div>
		</div>
	</n-link>
	<n-link v-else :to="link" class="highlight_card">
		<ImageItem :src="image + Thumbnail_imgIX" :alt="title" />
		<div class="link">
			<IconChevron size="25px" />
		</div>
		<div class="title">
			<h2>{{ title }}</h2>
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
	},
	computed: {
		first_imgIX() {
			return `&fit=crop&w=600&h=500&dpr=1`
		},
		Thumbnail_imgIX() {
			return `&fit=crop&w=400&h=500&dpr=1`
		},
		image() {
			return this.data.data.main_image.url
		},
		title() {
			return this.$prismic.asText(this.data.data.title)
		},
		service() {
			return this.$prismic.asText(this.data.data.info[0].service)
		},
		square() {
			return this.$prismic.asText(this.data.data.info[0].square)
		},
		link() {
			return this.$prismic.linkResolver(this.data)
		},
	},
}
</script>

<style lang="scss" scoped>
$transition: all 0.35s ease;

.highlight_card {
	margin-bottom: 80px;
	cursor: pointer;

	display: flex;
	flex-direction: column;
	position: relative;

	&.first {
		margin-bottom: 160px;
		width: 100%;
		display: flex;
		flex-direction: row;

		position: relative;
		.info {
			position: absolute;
			bottom: -60px;
			left: 150px;
			padding-left: 40px;
			height: 120px;
			background: white;

			display: flex;
			align-items: center;
			justify-content: center;
			.service,
			.square {
				margin-right: 40px;
				h2 {
					margin-bottom: 20px;
					text-transform: capitalize;
					border-bottom: 2px solid $primary;
				}
				p {
					text-transform: capitalize;
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
			display: flex;
			flex-direction: column;

			h2 {
				margin-bottom: 40px;
				text-transform: capitalize;
			}
			.text_slice p {
				margin-bottom: 20px;
				font-weight: 300;
				font-size: 1.2rem;
				line-height: 1.5rem;
			}
		}
		img {
			width: 600px;
			height: 500px;
		}
	}

	.title {
		position: absolute;
		top: 0;
		left: 0;
		padding: 25px;
		background: rgba(0, 0, 0, 0.5);
		background: $primary;
	}
	.link {
		z-index: 2;
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 25px;
		background: $primary;
		opacity: 0; //opacity:1
		transition: $transition;
	}

	&:hover {
		.link {
			opacity: 1;
		}
	}
}
</style>
