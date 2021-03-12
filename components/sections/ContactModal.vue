<template>
	<div class="modal_contact">
		<div class="image">
			<ImageItem v-if="!$fetchState.pending" :src="image" alt="contact" />
		</div>
		<ContactForm />
		<IconClose class="close" size="35px" @click.native="closeModal" />
	</div>
</template>

<script>
export default {
	data: () => ({
		image: '',
	}),
	async fetch() {
		const data = await this.$prismic.api.getSingle('contact_form')
		this.image = data.data.image.url
	},
	methods: {
		closeModal() {
			this.$emit('closeModal')
		},
	},
}
</script>

<style lang="scss" scoped>
.modal_contact {
	width: 100%;
	height: 100%;
	z-index: 10;

	position: fixed;
	top: 0;
	left: 0;

	display: flex;
	background: $black;

	.image {
		width: 50%;
	}

	.contact_form {
		width: 50%;
		height: 100%;
		padding: 5% 10%;
	}

	.close {
		position: absolute;
		top: 25px;
		right: 25px;
		fill: $white;
		transition: all 0.2s ease;
		cursor: pointer;
		&:hover {
			opacity: 0.5;
		}
	}
}
</style>
