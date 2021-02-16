<template>
	<div class="modal_contact">
		<div class="image">
			<ImageItem v-if="!$fetchState.pending" :src="image" alt="contact" />
		</div>
		<ValidationObserver ref="contact" class="contact" tag="form" autocomplete="off" @submit.prevent="Submit()">
			<h2 class="title">Write us</h2>
			<InputItem name="name" rules="required" @getValue="getName" />
			<InputItem name="number" rules="digits:3|required" @getValue="getNumber" />
			<InputItem name="email" rules="email|required" @getValue="getEmail" />
			<InputItem name="message" rules="required" @getValue="getMessage" />
			<ButtonItem> Submit <IconMail /> </ButtonItem>
		</ValidationObserver>
		<IconClose class="close" size="30px" @click.native="closeModal" />
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
			name: '',
			number: '',
			email: '',
			message: '',
			action: 'contact',
		},
	}),
	async fetch() {
		const data = await this.$prismic.api.getSingle('contact_form')
		this.image = data.data.image.url
	},
	methods: {
		closeModal() {
			this.$emit('closeModal')
		},
		getName(value) {
			this.form.name = value
		},
		getNumber(value) {
			this.form.number = value
		},
		getEmail(value) {
			this.form.email = value
		},
		getMessage(value) {
			this.form.message = value
		},
		async Submit() {
			const isValid = await this.$refs.contact.validate()
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
		justify-content: space-between;
		.title {
			font-size: 2rem;
			width: max-content;
			border-bottom: 2px solid $primary;
		}
		.title,
		button {
			margin: 15% 0;
		}
	}

	.close {
		position: absolute;
		top: 25px;
		right: 25px;
		fill: white;
		transition: all 0.2s linear;
		cursor: pointer;
		&:hover {
			opacity: 0.75;
		}
	}
}
</style>
