<template>
	<div class="modal_contact">
		<div class="image">
			<ImageItem :src="image" alt="contact" />
		</div>
		<ValidationObserver ref="contact" class="contact" tag="form" autocomplete="off" @submit.prevent="Submit()">
			<h2>We care about your opinion</h2>
			<InputItem name="email" rules="email" />
		</ValidationObserver>
	</div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

export default {
	components: {
		ValidationObserver,
	},
	data: () => ({
		loading: false,
		image: '',
		form: {
			email: String,
			action: 'subscribe',
		},
	}),
	async fetch() {
		const data = await this.$prismic.api.getSingle('contact_form')
		this.image = data.data.image.url
	},
	methods: {
		async Submit() {
			const isValid = await this.$refs.subscribe.validate()
			// validation
			if (!isValid) return

			this.loading = true
			console.log('loading')

			// compose email template
			this.form.emailTemplate = `
				<h4>${this.form.email} just subscribed.</h4>
			
			`

			// trigger netlify function
			try {
				await this.$axios.$post('.netlify/functions/sendmail', this.form)
			} catch (error) {
				console.log(error)
			}

			this.loading = false
			console.log('submited')
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

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
		width: 40%;
	}

	.contact {
		width: 60%;
		padding: 0 15%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}
</style>
