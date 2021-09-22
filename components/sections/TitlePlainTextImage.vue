<template>
	<section>
		<div class="name">
			<span> {{ name }} </span>
		</div>
		<div class="content">
			<div class="text">
				<h2 class="title">{{ title }}</h2>
				<template v-if="description">
					<prismic-rich-text class="rich_text" :field="description" />
				</template>
			</div>
			<div class="image">
				<ImageItem :width="image.dimensions.width" :height="image.dimensions.height" :src="image.url" :mobile="image.mobile.url" :retina="image.retina.url" :alt="image.alt" />
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'TitlePlainTextImage',
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	computed: {
		name() {
			return this.data.primary.name
		},
		title() {
			return this.data.primary.title1
		},
		description() {
			return this.data.primary.description
		},
		image() {
			return this.data.primary.image
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
