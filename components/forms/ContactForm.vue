<template>
	<div class="contact_form">
		<ValidationObserver v-if="!message" ref="contact" tag="form" autocomplete="off" @submit.prevent="Submit()">
			<h2 class="title">{{contactData.title}}</h2>
			<InputItem name="name" :label="contactData.name" rules="required" @getValue="getName" />
			<InputItem name="number" :label="contactData.number" rules="digits:3|required" @getValue="getNumber" />
			<InputItem name="email" :label="contactData.email" rules="email|required" @getValue="getEmail" />
			<InputItem name="message" :label="contactData.message" rules="required" @getValue="getMessage" />
			<ButtonItem white> {{ contactData.submit }} <IconMail /> </ButtonItem>
		</ValidationObserver>

		<div v-else class="message">
			<h2 class="title">{{ data.title  }}</h2>
			<p v-for="(item, key) in data.response" :key="key">{{ item.text }}</p>
			<!-- <p>{{ $t('service.form.text_responce1') }}</p> -->
			<!-- <p>{{ $t('service.form.text_responce2') }}</p> -->
			<ButtonItem white> {{ item.goback  }} </ButtonItem>
		</div>
	</div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

export default {
	components: {
		ValidationObserver,
	},
	data: () => ({
		message: false,
		loading: false,
		contactData: Object,
		form: {
			name: '',
			number: '',
			email: '',
			message: '',
			action: 'contact',
		},
	}),
	async fetch() {
		const formData = await this.$prismic.api.getSingle('contact_form')
		this.contactData = {
			title: formData.data.title,
			name: formData.data.name,
			number: formData.data.number,
			submit: formData.data.submit,
			email: formData.data.email,
			message: formData.data.message,
			response: formData.data.response,
			goback: formData.data.goback,
		}
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
				<h4>Name</h4>
				<p>${this.form.name}</p>
				<h4>Number</h4>
				<p>${this.form.number}</p>
				<h4>Email</h4>
				<p>${this.form.email}</p>
				<h4>Email</h4>
				<p>${this.form.messagee}</p>
			`

			// trigger netlify function
			try {
				await this.$axios.$post('.netlify/functions/sendmail', this.form)
			} catch (error) {
				console.log(error)
			}

			this.loading = false
			console.log('submited')

			this.message = !this.message
		},
	},
}
</script>

<style lang="scss" scoped>
.contact_form {
	width: 100%;
	height: 100%;
	display: flex;
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.title {
		width: max-content;
		border-bottom: 2px solid $primary;

		font-size: 2rem;
		color: $white;
		&::selection {
			color: $black;
		}
	}

	.message {
		width: 50%;
		padding: 0 15%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.title {
			margin-bottom: 2rem;
			font-size: 2rem;
			width: max-content;
			text-transform: capitalize;
			border-bottom: 2px solid $primary;
		}
		p {
			line-height: 1.5rem;
		}
		button {
			margin-top: 2rem;
		}
	}
}
@media (max-width: 420px) {
	.contact_form{
		.title{
			font-size: 1.5rem;
		}
	}
}
</style>
