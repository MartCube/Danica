<template>
	<div v-if="modalContact" ref="modal" class="modal_contact">
		<div class="image">
			<ImageItem v-if="!$fetchState.pending" :src="image" alt="contact" />
		</div>
		<ContactForm :data="form_data" />
		<div class="close" @click="closeModal">
			<Icon name="close" fill="#fafafa" size="35px" />
		</div>
	</div>
</template>

<script>
import { modalAnim } from '~/assets/anime'

export default {
	data: () => ({
		image: '',
		form_data: null,
	}),
	async fetch() {
		const fetch = await this.$prismic.api.getSingle('contact_form', { lang: this.$i18n.localeProperties.prismic })
		this.image = fetch.data.image.url
		this.form_data = fetch.data
	},
	computed: {
		modalContact() {
			return this.$store.getters.modalContact
		},
	},
	watch: {
		async modalContact() {
			await this.$nextTick()
			if (this.modalContact) {
				modalAnim(this.$refs.modal)
				this.$fetch()
			}
		},
	},
	methods: {
		closeModal() {
			this.$store.dispatch('bindModalContact', false)
		},
	},
}
</script>

<style lang="scss" scoped>
.modal_contact {
	will-change: opacity;
	will-change: transform;
	opacity: 0; // opacity: 1

	width: 100%;
	height: 100%;
	z-index: 11;

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
		transition: all 0.2s ease;
		cursor: pointer;
		&:hover {
			opacity: 0.5;
		}
	}
}
@media (max-width: 900px) {
	.modal_contact {
		.image {
			display: none;
		}
		.contact_form {
			width: 100%;
			padding: 80px 40px;
		}
	}
}
</style>
